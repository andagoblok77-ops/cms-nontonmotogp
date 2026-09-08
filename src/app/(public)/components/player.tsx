"use client";

import { useState } from "react";
import { ServerButtons } from "./server";
import PlayerNotice from "./player-notice";
import type { Prisma } from "@/generated/prisma/client";
import { Posts } from "../[...slug]/page";
import Hls from "./hls";
import Dash from "./dash";
import { Calendar, TextIcon, UserIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import AdsSection from "@/components/ads/after-hero";
import { AdsSectionProps } from "../../../../lib/ads";
import Link from "next/link";

export type PlayerSite = Prisma.SiteSettingGetPayload<{
  select: {
    playerNoticeTitle: true;
    playerNoticeDescription: true;
    telegramTitle: true;
    telegramDescription: true;
    socialLinks: true;
  };
}>;

export default function Player({
  posts,
  site,
  ads,
}: {
  posts: Posts;
  site: PlayerSite;
  ads: AdsSectionProps[];
}) {
  const [activeServer, setActiveServer] = useState(
    posts.streams[0]?.name ?? "",
  );

  const activeStream = posts.streams.find(
    (stream) => stream.name === activeServer,
  );

  const createdAt = new Date(posts.createdAt);
  return (
    <section className="mx-auto mb-5 w-full max-w-6xl px-4 py-7 ">
      <h2
        className="
    mb-1
    flex
    sm:min-h-14
    items-start
    gap-0.5
    sm:gap-1
    text-base
    font-black
    leading-tight
    tracking-tight
    sm:items-center
    sm:text-2xl
  "
      >
        <TextIcon className="w-6" />
        {posts.title}
      </h2>
      <div className="flex gap-3 items-start sm:items-center mb-2">
        <div className="flex gap-1 items-center mb-2">
          <Calendar className="w-5 h-5" />
          <time
            dateTime={createdAt.toISOString()}
            className="text-xs font-black uppercase"
          >
            {format(createdAt, "dd MMM yyyy", {
              locale: id,
            })}
          </time>
        </div>
        <div className="flex gap-1 items-center mb-2">
          <UserIcon className="w-5 h-5" />
          <span className="text-xs font-black uppercase">{posts.uploadBy}</span>
        </div>
      </div>
      <div
        className="
          overflow-hidden
          border-2 border-black
          bg-black
          shadow-[6px_6px_0px_0px_#000]
          p-0 m-0
        "
      >
        <div className="relative aspect-video w-full p-0 m-0 ">
          {/* player */}
          {activeStream ? (
            <div className="flex h-full items-center justify-center p-0 m-0">
              {activeStream.type == "hls" ? (
                <Hls
                  name={activeStream.name}
                  url={activeStream.url}
                  poster={posts.poster ?? ""}
                />
              ) : (
                <Dash
                  name={activeStream.name}
                  url={activeStream.url}
                  drmId={activeStream.drmId ?? undefined}
                  drmKey={activeStream.drmKey ?? undefined}
                  poster={posts.poster ?? ""}
                />
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-white">
              Stream tidak tersedia
            </div>
          )}
        </div>
      </div>
      {process.env.VERCEL_ENV === "production" && (
        <AdsSection ads={ads} position="article" />
      )}
      <PlayerNotice site={site} />

      <ServerButtons
        servers={posts.streams}
        activeServer={activeServer}
        onServerChange={setActiveServer}
      />
      <p className="mb-1 text-sm font-black uppercase mt-10">Category</p>
      {posts.categories.length > 0 && (
        <div className="mb-4 flex min-h-8 flex-wrap gap-2 mt-1">
          {posts.categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span
                key={category.slug}
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
      )}
    </section>
  );
}
