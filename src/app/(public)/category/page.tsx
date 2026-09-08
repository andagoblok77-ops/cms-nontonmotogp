import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { getAllCategory } from "../../../../lib/category";
import { getSiteSeo } from "../../../../lib/site";
import { List } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSeo();

  const title = `Category - ${site.siteName}`;

  const description =
    `Browse all categories on ${site.siteName}. ` +
    `Find articles and content by category.`;

  const canonical = `${site.siteUrl}/category`;

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

export default async function CategoryPage() {
  const categories = await getAllCategory();

  if (categories.length === 0) {
    notFound();
  }

  return (
    <main className="bg-[#FFFDF5] px-4 py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <h1 className="mt-2 flex items-center gap-1 text-xl  sm:text-2xl font-black tracking-tighter ">
                          <List className="size-[1em]" />
                         Category
                        </h1>


        {categories.length > 0 ? (
          <div className="mt-4 mb-4 flex min-h-8 flex-wrap gap-2">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span
                  className="
                    border-2 border-black
                    bg-[#ff90e8]
                    px-2 py-1
                    text-xs
                    font-black
                    uppercase
                  "
                >
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
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
            There are no category yet.
          </div>
        )}
      </div>
    </main>
  );
}
