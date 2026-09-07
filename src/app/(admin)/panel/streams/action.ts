"use server";

import { StreamType } from "@/generated/prisma/client";
import prisma from "../../../../../lib/prisma";
import { revalidatePath, updateTag } from "next/cache";

export const saveStream = async (data: FormData, id?: string | null) => {
  try {
    const name = data.get("name") as string;
    const type = data.get("type") as StreamType;
    const url = data.get("url") as string;
    const drmId = (data.get("drmId") as string) || null;
    const drmKey = (data.get("drmKey") as string) || null;
    const directLink = (data.get("directLink") as string) || null;
    const directLinkActive = data.get("directLinkActive") === "true";

    let affectedSlugs: string[] = [];

    if (id) {
      const existingStream = await prisma.stream.findUniqueOrThrow({
        where: { id },
        select: {
          articles: {
            select: {
              slug: true,
            },
          },
        },
      });

      affectedSlugs = existingStream.articles.map((article) => article.slug);
      const stream = await prisma.stream.update({
        where: { id },
        data: {
          name,
          type,
          url,
          drmId,
          drmKey,
          directLink,
          directLinkActive,
        },
      });

      affectedSlugs.forEach((slug) => {
        updateTag(`article:${slug}`);
      });

      revalidatePath("/[...slug]", "page");

      return {
        success: true,
        data: stream,
        message: "The stream was successfully updated.",
      };
    }

    const stream = await prisma.stream.create({
      data: {
        name,
        type,
        url,
        drmId,
        drmKey,
        directLink,
        directLinkActive,
      },
    });

    revalidatePath("/[...slug]", "page");

    return {
      success: true,
      data: stream,
      message: "The stream was successfully created.",
    };
  } catch (error) {
    console.error(error);

    throw new Error("Failed to save stream");
  }
};

export const deleteStream = async (id: string) => {
  try {
    const stream = await prisma.stream.findUniqueOrThrow({
      where: { id },
      select: {
        articles: {
          select: {
            slug: true,
          },
        },
      },
    });

    await prisma.stream.delete({
      where: { id },
    });

    stream.articles.forEach((article) => {
      updateTag(`article:${article.slug}`);
    });

    revalidatePath("/[...slug]", "page");

    return {
      success: true,
      message: "Success to delete stream",
    };
  } catch (error) {
    console.error(error);

    throw new Error("Failed to delete stream");
  }
};

export const deleteAllStream = async (ids: string[]) => {
  try {
    if (ids.length === 0) {
      throw new Error("No streams selected");
    }

    const streams = await prisma.stream.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        articles: {
          select: {
            slug: true,
          },
        },
      },
    });

    if (streams.length === 0) {
      throw new Error("Failed to get streams");
    }

    await prisma.stream.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const slugs = new Set(
      streams.flatMap((stream) =>
        stream.articles.map((article) => article.slug),
      ),
    );

    slugs.forEach((slug) => {
      updateTag(`article:${slug}`);
    });

    revalidatePath("/[...slug]", "page");

    return {
      success: true,
      message: `Success to delete ${streams.length} streams`,
    };
  } catch (error) {
    console.error(error);

    throw new Error("Failed to delete streams");
  }
};
