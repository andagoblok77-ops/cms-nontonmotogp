import { Metadata } from "next";
import prisma from "../../../../../lib/prisma";
import Table from "./components/table";
import type { Prisma } from "@/generated/prisma/client";

export const metadata: Metadata = {
  title: "Streams",
};

export type Streams = Prisma.StreamGetPayload<{
  include: {
    articles: true;
  };
}>;

type PageProps = {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
  }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const page = Math.max(Number(params.page) || 1, 1);
  const pageSize = Math.max(Number(params.pageSize) || 10, 1);
  const search = params.search?.trim() || "";

  const where: Prisma.StreamWhereInput = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            url: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const [streams, total] = await Promise.all([
    prisma.stream.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        articles: true,
      },
    }),

    prisma.stream.count({
      where,
    }),
  ]);

  const pageCount = Math.ceil(total / pageSize);

  return (
    <Table
      datas={streams}
      page={page}
      pageSize={pageSize}
      pageCount={pageCount}
      total={total}
      search={search}
    />
  );
};

export default Page;
