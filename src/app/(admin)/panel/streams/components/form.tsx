"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { saveStream } from "../action";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters."),

  type: z.enum(["hls", "dash"]),

  url: z
    .string()
    .min(1, "URL is required")
    .url("Please enter a valid URL."),

  drmId: z.string().optional(),

  drmKey: z.string().optional(),

  directLink: z.string().optional(),

  directLinkActive: z.boolean(),
});

type FormStreamProps = {
  setOpen: (open: boolean) => void;
  type: "edit" | "add";
  open: boolean;
  stream: {
    id: string;
    name: string;
    type: "hls" | "dash";
    url: string;
    drmId: string | null;
    drmKey: string | null;
    directLink: string | null;
    directLinkActive: boolean;
  } | null;
};

const FormStream = ({
  open,
  setOpen,
  stream,
  type,
}: FormStreamProps) => {
  const router = useRouter();

  const defaultValues = {
    name: "",
    type: "hls" as const,
    url: "",
    drmId: "",
    drmKey: "",
    directLink: "",
    directLinkActive: false,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("url", data.url);
      formData.append("drmId", data.drmId ?? "");
      formData.append("drmKey", data.drmKey ?? "");
      formData.append("directLink", data.directLink ?? "");
      formData.append(
        "directLinkActive",
        String(data.directLinkActive),
      );

      const { message } = await saveStream(
        formData,
        type === "edit" ? stream?.id : null,
      );

      setOpen(false);
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

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
      return;
    }

    if (type === "add") {
      form.reset(defaultValues);
      return;
    }

    if (type === "edit" && stream) {
      form.reset({
        name: stream.name ?? "",
        type: stream.type ?? "hls",
        url: stream.url ?? "",
        drmId: stream.drmId ?? "",
        drmKey: stream.drmKey ?? "",
        directLink: stream.directLink ?? "",
        directLinkActive: stream.directLinkActive ?? false,
      });
    }
  }, [open, type, stream, form]);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      className="w-[calc(100vw-1rem)] max-w-2xl rounded-sm sm:w-full"
      title={type === "edit" ? "Edit Stream" : "Add Stream"}
      description=""
      footer={
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Button
            type="submit"
            form="stream-form"
            className="order-1 sm:order-3"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Saving..."
              : "Save Stream"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="order-3 sm:order-1"
          >
            Close
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={() => form.reset()}
            className="order-2 sm:order-2"
          >
            Reset
          </Button>
        </div>
      }
    >
      <form
        id="stream-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-h-[60vh] overflow-y-auto"
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="stream-form-name">
                  Name
                </FieldLabel>

                <Input
                  {...field}
                  id="stream-form-name"
                  placeholder="Main Stream"
                  className="rounded-sm"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Type</FieldLabel>

                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    className="rounded-sm"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Pilih type" />
                  </SelectTrigger>

                  <SelectContent className="rounded-sm">
                    <SelectItem value="hls" className="rounded-sm">
                      HLS
                    </SelectItem>

                    <SelectItem value="dash" className="rounded-sm">
                      DASH
                    </SelectItem>
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="stream-form-url">
                  Stream URL
                </FieldLabel>

                <Input
                  {...field}
                  id="stream-form-url"
                  type="url"
                  placeholder="https://example.com/stream.m3u8"
                  className="rounded-sm"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="drmId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="stream-form-drm-id">
                  DRM ID
                </FieldLabel>

                <Input
                  {...field}
                  id="stream-form-drm-id"
                  placeholder="DRM ID"
                  className="rounded-sm"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="drmKey"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="stream-form-drm-key">
                  DRM KEY
                </FieldLabel>

                <Input
                  {...field}
                  id="stream-form-drm-key"
                  placeholder="DRM KEY"
                  className="rounded-sm"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="directLink"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="stream-form-direct-link">
                  Direct Link
                </FieldLabel>

                <Input
                  {...field}
                  id="stream-form-direct-link"
                  placeholder="https://example.com/video"
                  className="rounded-sm"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="directLinkActive"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Status Direct Link</FieldLabel>

                <Select
                  value={field.value ? "true" : "false"}
                  onValueChange={(value) =>
                    field.onChange(value === "true")
                  }
                >
                  <SelectTrigger
                    className="rounded-sm"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue>
                      {field.value ? "Active" : "Non Active"}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent className="rounded-sm">
                    <SelectItem
                      value="true"
                      className="rounded-sm"
                    >
                      Active
                    </SelectItem>

                    <SelectItem
                      value="false"
                      className="rounded-sm"
                    >
                      Non Active
                    </SelectItem>
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </Modal>
  );
};

export default FormStream;