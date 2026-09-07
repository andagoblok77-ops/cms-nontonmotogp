import type { Prisma } from "@/generated/prisma/client";
import prisma from "../../../../../lib/prisma";
import { Metadata } from "next";
import Table from "../streams/components/components/table";
export const metadata: Metadata = {
  title: "Widgets",
};

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

  const where: Prisma.AdWidgetsWhereInput = search
    ? {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }
    : {};

  const [adWidgets, total] = await Promise.all([
    prisma.adWidgets.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.adWidgets.count({ where }),
  ]);
  const pageCount = Math.ceil(total / pageSize);
  return (
    <Table
      datas={adWidgets}
      page={page}
      pageSize={pageSize}
      pageCount={pageCount}
      total={total}
      search={search}
    />
  );
};

export default Page;
