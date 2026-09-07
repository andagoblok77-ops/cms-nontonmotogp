"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Streams, getColumns } from "./columns";
import { useState } from "react";
import FormStream from "./form";
import View from "./view";
import Delete from "./delete";
import {
  deleteAllStream,
  deleteStream,
} from "../action";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { RowSelectionState } from "@tanstack/react-table";

type TableProps = {
  datas: Streams[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  search: string;
};

export default function Table({
  datas,
  page,
  pageSize,
  pageCount,
  total,
  search,
}: TableProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] =
    useState<boolean>(false);
  const [openModalView, setOpenModalView] =
    useState<boolean>(false);

  const [data, setData] = useState<Streams | null>(null);

  const [type, setType] = useState<"add" | "edit">("add");

  const [typeDelete, setTypeDelete] =
    useState<"single" | "many">("single");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>({});

  const router = useRouter();

  const handleDelete = async (streamId: string) => {
    try {
      const { message } = await deleteStream(streamId);

      setOpenModalDelete(false);
      setData(null);

      router.refresh();

      toast.add({
        type: "success",
        description: message,
      });
    } catch (error) {
      toast.add({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        priority: "high",
      });
    }
  };

  const handleDeleteMany = async (ids: string[]) => {
    try {
      const { message } = await deleteAllStream(ids);

      setOpenModalDelete(false);
      setData(null);

      setSelectedIds([]);
      setRowSelection({});

      router.refresh();

      toast.add({
        type: "success",
        description: message,
      });
    } catch (error) {
      toast.add({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        priority: "high",
      });
    }
  };

  const columns = getColumns({
    setType,
    onEdit: setOpen,
    onView: setOpenModalView,
    onDelete: setOpenModalDelete,
    setData,
    setTypeDelete,
    setSelectedIds,
    setRowSelection,
  });

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Streams
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your streaming sources.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button
            variant="destructive"
            disabled={selectedIds.length === 0}
            onClick={() => {
              setOpenModalDelete(true);
              setTypeDelete("many");
              setData(null);
            }}
            className="w-full rounded-sm sm:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete All Streams
            {selectedIds.length > 0 &&
              ` (${selectedIds.length})`}
          </Button>

          <Button
            onClick={() => {
              setData(null);
              setType("add");
              setOpen(true);
            }}
            className="w-full rounded-sm sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Stream
          </Button>
        </div>
      </div>

      <DataTable<Streams>
        data={datas}
        columns={columns}
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        total={total}
        searchKey={search}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        searchPlaceholder="Search streams..."
      />

      <FormStream
        open={open}
        setOpen={setOpen}
        stream={data}
        type={type}
      />

      <View
        open={openModalView}
        setOpen={setOpenModalView}
        data={data}
      />

      <Delete
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        title={data?.name}
        id={data?.id}
        onDelete={handleDelete}
        type={typeDelete}
        onDeleteMany={handleDeleteMany}
        ids={selectedIds}
        setRowSelection={setRowSelection}
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
}