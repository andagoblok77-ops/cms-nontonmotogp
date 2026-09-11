"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

interface Props {
  name: string;
  url: string;
  poster?: string;
  drmKey?: string;
  drmId?: string;
}

interface ClapprPlayer {
  play?: () => void;
  pause?: () => void;
  stop?: () => void;
  destroy?: () => void;
}

interface ClapprAPI {
  Player: new (options: ClapprOptions) => ClapprPlayer;
}

interface ClapprOptions {
  parent: HTMLDivElement;
  source: string;
  width: string;
  height: string;
  autoPlay: boolean;
  mute: boolean;
  poster?: string;
  watermark: string;
  position: string;
  plugins: unknown[];
  levelSelectorConfig?: LevelSelectorConfig;
  shakaConfiguration?: ShakaConfiguration;
}

interface LevelSelectorConfig {
  title: string;
  labelCallback: (playbackLevel: PlaybackLevel, customLabel: string) => string;
}

interface PlaybackLevel {
  level: {
    height: number;
  };
}

interface ShakaConfiguration {
  drm: {
    clearKeys: Record<string, string>;
  };
}

interface WindowWithPlayers extends Window {
  Clappr?: ClapprAPI;
  DashShakaPlayback?: unknown;
  LevelSelector?: unknown;
  ClapprLevelSelectorPlugin?: unknown;
  shaka?: unknown;
}

export default function Dash({ name, url, drmId, drmKey, poster }: Props) {
  const playerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<ClapprPlayer | null>(null);

  const [playerReady, setPlayerReady] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  useEffect(() => {
    if (!playerRef.current) return;

    let cancelled = false;

    setPlayerReady(false);
    setShowPlayButton(true);

    const loadScriptOnce = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(
          `script[src="${src}"]`,
        ) as HTMLScriptElement | null;

        if (existing?.dataset.loaded === "true") {
          resolve();
          return;
        }

        if (existing) {
          const handleLoad = () => {
            existing.dataset.loaded = "true";
            resolve();
          };

          const handleError = () => {
            reject(new Error(`Gagal memuat script: ${src}`));
          };

          existing.addEventListener("load", handleLoad, {
            once: true,
          });

          existing.addEventListener("error", handleError, {
            once: true,
          });

          return;
        }

        const script = document.createElement("script");

        script.src = src;
        script.async = false;

        script.onload = () => {
          script.dataset.loaded = "true";
          resolve();
        };

        script.onerror = () => {
          reject(new Error(`Gagal memuat script: ${src}`));
        };

        document.head.appendChild(script);
      });

    const destroyPlayer = () => {
      if (instanceRef.current) {
        try {
          instanceRef.current.stop?.();
          instanceRef.current.destroy?.();
        } catch (error) {
          console.warn("Gagal menghentikan player:", error);
        }

        instanceRef.current = null;
      }

      if (playerRef.current) {
        playerRef.current.innerHTML = "";
      }

      setPlayerReady(false);
    };

    const init = async () => {
      try {
        destroyPlayer();

        await loadScriptOnce(
          "https://cdn.jsdelivr.net/npm/clappr@0.3.13/dist/clappr.min.js",
        );

        await loadScriptOnce(
          "https://cdn.jsdelivr.net/npm/shaka-player@3.3.7/dist/shaka-player.compiled.js",
        );

        await loadScriptOnce(
          "https://cdn.jsdelivr.net/npm/dash-shaka-playback@3.7.1/dist/dash-shaka-playback.js",
        );

        await loadScriptOnce(
          "https://cdn.jsdelivr.net/npm/clappr-level-selector-plugin@0.2.1/dist/level-selector.min.js",
        );

        await new Promise((resolve) => setTimeout(resolve, 100));

        if (cancelled || !playerRef.current) {
          return;
        }

        const win = window as WindowWithPlayers;

        const Clappr = win.Clappr;
        const DashShakaPlayback = win.DashShakaPlayback;

        const LevelSelector =
          win.LevelSelector ?? win.ClapprLevelSelectorPlugin;

        const Shaka = win.shaka;

        if (!Clappr?.Player) {
          console.error("Clappr.Player tidak ditemukan.");
          return;
        }

        if (!Shaka) {
          console.error("Shaka Player tidak ditemukan.");
          return;
        }

        if (!DashShakaPlayback) {
          console.error("DashShakaPlayback tidak ditemukan.");
          return;
        }

        if (!LevelSelector) {
          console.error("Level Selector tidak ditemukan.");
          return;
        }

        const cleanDrmId = drmId?.trim();
        const cleanDrmKey = drmKey?.trim();

        const shakaConfiguration =
          cleanDrmId && cleanDrmKey
            ? {
                drm: {
                  clearKeys: {
                    [cleanDrmId]: cleanDrmKey,
                  },
                },
              }
            : undefined;

        const player = new Clappr.Player({
          parent: playerRef.current,

          source: url,

          width: "100%",
          height: "100%",

          autoPlay: false,
          mute: false,

          ...(poster ? { poster } : {}),

          watermark: poster ?? "",
          position: "top-right",

          plugins: [DashShakaPlayback, LevelSelector],

          levelSelectorConfig: {
            title: "Quality",

            labelCallback: (playbackLevel, customLabel) => {
              const height = playbackLevel.level.height;

              return `${customLabel}${height}p`;
            },
          },

          ...(shakaConfiguration
            ? {
                shakaConfiguration,
              }
            : {}),
        });

        if (cancelled) {
          try {
            player.stop?.();
            player.destroy?.();
          } catch {}

          return;
        }

        instanceRef.current = player;

        setPlayerReady(true);

        console.log("DASH 9: player ready");
      } catch (error) {
        console.error("❌ Gagal menginisialisasi DASH Player:", error);
      }
    };

    init();

    return () => {
      cancelled = true;
      destroyPlayer();
    };
  }, [url, drmId, drmKey, poster]);

  const handlePlay = () => {
    const player = instanceRef.current;

    if (!player) {
      console.warn("Player belum siap.");
      return;
    }

    setShowPlayButton(false);

    player.play?.();
  };

  return (
    <div className="w-full ">
      {name && <h2 className=" text-lg font-semibold">{name}</h2>}

      <div className="relative w-full aspect-video overflow-hidden rounded-none bg-black mb-7">
        <div ref={playerRef} className="absolute inset-0 h-full w-full" />

        {playerReady && showPlayButton && (
          <button
            type="button"
            onClick={handlePlay}
            className="
                    absolute
                    left-1/2
                    top-1/2
                    z-50
                    flex
                    h-20
                    w-20
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center

                    border-4
                    border-black

                    bg-[#ff90e8]
                    text-black

                    shadow-[7px_7px_0px_0px_#000]

                    transition-all
                    duration-100

                    hover:translate-x-[calc(-50%+2px)]
                    hover:translate-y-[calc(-50%+2px)]
                    hover:shadow-[5px_5px_0px_0px_#000]

                    active:translate-x-[calc(-50%+7px)]
                    active:translate-y-[calc(-50%+7px)]
                    active:shadow-none
                  "
            aria-label="PLAY"
          >
            <Play className="ml-1 h-7 w-7 fill-current" />
          </button>
        )}
      </div>
    </div>
  );
}
