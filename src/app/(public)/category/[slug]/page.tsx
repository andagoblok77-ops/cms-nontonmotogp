import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategory } from "../../../../../lib/category";
import { ArticleCard } from "../../components/article-card";
import { Metadata } from "next";
import { getSiteSeo } from "../../../../../lib/site";
import { List } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const [result, site] = await Promise.all([
    getCategory(slug, 1),
    getSiteSeo(),
  ]);

  if (!result.category) {
    return {};
  }

  const categoryName = result.category.name;

  const title = `${categoryName} - ${site.siteName}`;

  const description = `Browse the latest articles in the ${categoryName} category on ${site.siteName}.`;

  const canonical = `${site.siteUrl}/category/${result.category.slug}`;

  return {
    title,

    description,

    alternates: {
      canonical,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: site.siteName,

      images: site.ogImage
        ? [
            {
              url: site.ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,

      images: site.ogImage ? [site.ogImage] : undefined,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;

  const page = Math.max(1, Number(pageParam) || 1);

  const { category, total, totalPages, currentPage } = await getCategory(
    slug,
    page,
  );

  if (!category) {
    notFound();
  }

  return (
    <main className="bg-[#FFFDF5] px-4 py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-10 border-4 border-black bg-[#4d7aff] p-6 shadow-[7px_7px_0_#000]">
          <p className="mb-2 text-sm font-black uppercase flex items-center gap-1">
            <List className="size-[1em]" />
            Category
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight sm:text-3xl">
                {category.name}
              </h1>

              <p className="mt-2 font-bold">{total} Articles</p>
            </div>

            <Link
              href="/"
              className="
                inline-flex
                w-fit
                items-center
                border-2 border-black
                bg-white
                px-3 py-0.5
                font-black
                uppercase
                shadow-[4px_4px_0_#000]
                transition-all
                hover:translate-x-1
                hover:translate-y-1
                hover:shadow-none
              "
            >
              All Articles
            </Link>
          </div>
        </div>

        {/* Articles */}
        {category.articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {category.articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-3">
                {currentPage > 1 && (
                  <Link
                    href={`/category/${category.slug}?page=${currentPage - 1}`}
                    className="
                      border-2 border-black
                      bg-white
                      px-4 py-2
                      font-black
                      uppercase
                      shadow-[4px_4pxpx_0_#000]
                      transition-all
                      hover:translate-x-1
                      hover:translate-y-1
                      hover:shadow-none
                    "
                  >
                    ← Prev
                  </Link>
                )}

                <div
                  className="
                    border-2 border-black
                    bg-[#4d7aff]
                    px-4 py-2
                    font-black
                    shadow-[4px_4px_0_#000]
                  "
                >
                  {currentPage} / {totalPages}
                </div>

                {currentPage < totalPages && (
                  <Link
                    href={`/category/${category.slug}?page=${currentPage + 1}`}
                    className="
                      border-2 border-black
                      bg-white
                      px-4 py-2
                      font-black
                      uppercase
                      shadow-[4px_4px_0_#000]
                      transition-all
                      hover:translate-x-1
                      hover:translate-y-1
                      hover:shadow-none
                    "
                  >
                    Next →
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div
            className="
              border-4 border-black
              bg-white
              p-10
              text-center
              font-black
              shadow-[7px_7px_0_#000]
            "
          >
            There are no articles in this category yet.
          </div>
        )}
      </div>
    </main>
  );
}
