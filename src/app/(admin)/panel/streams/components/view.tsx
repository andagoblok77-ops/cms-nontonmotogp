import { Modal } from "@/components/modal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type StreamData = {
  id: string;
  name: string;
  type: "hls" | "dash";
  url: string;
  drmId: string | null;
  drmKey: string | null;
  directLink: string | null;
  directLinkActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type ViewProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: StreamData | null;
};

const typeLabel: Record<StreamData["type"], string> = {
  hls: "HLS",
  dash: "DASH",
};

const View = ({ open, setOpen, data }: ViewProps) => {
  if (!data) return null;

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="View Stream"
      className="w-[calc(100vw-1rem)] max-w-2xl rounded-sm sm:w-full"
    >
      <Card className="max-h-[60vh] overflow-y-scroll rounded-sm">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <CardTitle className="text-lg">
                {data.name}
              </CardTitle>
            </div>

            <Badge variant="outline">
              {typeLabel[data.type] ?? data.type}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div>
            <p className="text-sm text-muted-foreground">
              Stream Type
            </p>

            <div className="mt-1">
              <Badge variant="outline">
                {typeLabel[data.type] ?? data.type}
              </Badge>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Stream URL
            </p>

            <div className="rounded-md border bg-muted/30 p-3">
              <p className="break-all font-mono text-xs">
                {data.url || "-"}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              DRM ID
            </p>

            <div className="rounded-md border bg-muted/30 p-3">
              <p className="break-all font-mono text-xs">
                {data.drmId || "-"}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              DRM Key
            </p>

            <div className="rounded-md border bg-muted/30 p-3">
              <p className="break-all font-mono text-xs">
                {data.drmKey || "-"}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Direct Link
            </p>

            <div className="rounded-md border bg-muted/30 p-3">
              <p className="break-all font-mono text-xs">
                {data.directLink || "-"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Direct Link Status
            </p>

            <p
              className={
                data.directLinkActive
                  ? "mt-1 inline-flex rounded-full bg-green-100 px-2.5 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "mt-1 inline-flex rounded-full bg-yellow-100 px-2.5 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              }
            >
              {data.directLinkActive
                ? "Active"
                : "Non Active"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Created
            </p>

            <p className="mt-1 text-sm font-medium">
              {format(
                new Date(data.createdAt),
                "dd MMMM yyyy, HH:mm",
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Updated
            </p>

            <p className="mt-1 text-sm font-medium">
              {format(
                new Date(data.updatedAt),
                "dd MMMM yyyy, HH:mm",
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default View;