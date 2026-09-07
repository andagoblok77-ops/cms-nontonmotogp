import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const siteName = "LIVEMOTOGP";

const streamData: Prisma.StreamCreateInput[] = [
  {
    name: "Server 1",
    type: "hls",
    url: "https://cdn.strea.ru/index_src/index.m3u8",
  },
  {
    name: "Server 2",
    type: "dash",
    url: "https://qp-pldt-live-grp-13-prod.akamaized.net/out/u/dr_spotv2hd.mpd",
    drmId: "7eea72d6075245a99ee3255603d58853",
    drmKey: "6848ef60575579bf4d415db1032153ed",
  },
  {
    name: "Server 3",
    type: "hls",
    url: "https://s1.strea.ru/index.m3u8",
  },
  {
    name: "Server 4",
    type: "hls",
    url: "https://s2.strea.ru/index.m3u8",
  },
];

const articleData = [
  {
    title: "Live Streaming MotoGP",
    slug: "live-streaming-motogp",
    content: "",
    streamNames: ["Server 1", "Server 2"],
    categories: [
      {
        name: "Live MotoGP",
        slug: "live-motogp",
      },
      {
        name: "Live WSBK",
        slug: "live-wsbk",
      },
    ],
  },
];

const adWidgetData: Prisma.AdWidgetCreateInput[] = [
  {
    name: "ADS HEADER",
    htmlCode:
      '<style> div[data-widget-id="1967942"] { min-height: 300px; } </style><div data-type="_mgwidget" data-widget-id="1967942"></div>',
    scriptCode:
      '<script>(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");</script>',
    position: "head",
    order: 0,
    isActive: true,
    height: 200,
    maxWidth: "full",
    mobileOnly: false,
    showClose: false,
  },
  {
    name: "ADS BODY",
    htmlCode:
      '<style> div[data-widget-id="1978335"] { min-height: 300px; } </style><div data-type="_mgwidget" data-widget-id="1978335"></div>',
    scriptCode:
      '<script>(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");</script>',
    position: "body",
    order: 0,
    isActive: true,
    height: 200,
    maxWidth: "full",
    mobileOnly: false,
    showClose: false,
  },
];

const pageData: Prisma.PageCreateInput[] = [
  {
    slug: "about",
    title: "About",
    content: `
      <h2>Tentang LIVEMOTOGP</h2>
      <p>
        LIVEMOTOGP adalah situs nonton live streaming MotoGP.
      </p>
    `,
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    content: `
      <h2>Privacy Policy</h2>

      <p>
        Privasi pengunjung merupakan hal yang penting bagi LIVEMOTOGP.
        Kebijakan Privasi ini menjelaskan bagaimana informasi dapat
        dikumpulkan, digunakan, dan dilindungi ketika Anda mengakses
        situs LIVEMOTOGP.
      </p>

      <h3>Informasi yang Dikumpulkan</h3>

      <p>
        LIVEMOTOGP dapat mengumpulkan informasi tertentu secara otomatis,
        seperti alamat IP, jenis perangkat, browser, halaman yang dikunjungi,
        serta informasi teknis lainnya yang diperlukan untuk meningkatkan
        keamanan dan pengalaman pengguna.
      </p>

      <h3>Penggunaan Informasi</h3>

      <p>
        Informasi yang dikumpulkan dapat digunakan untuk mengoperasikan,
        memelihara, dan meningkatkan layanan, menganalisis penggunaan situs,
        serta menjaga keamanan situs dari aktivitas yang tidak sah.
      </p>

      <h3>Cookies</h3>

      <p>
        LIVEMOTOGP dapat menggunakan cookies atau teknologi serupa untuk
        menyimpan preferensi pengguna, memahami penggunaan situs, dan
        meningkatkan pengalaman pengunjung.
      </p>

      <h3>Layanan Pihak Ketiga</h3>

      <p>
        Situs ini dapat menggunakan layanan pihak ketiga seperti layanan
        analitik, iklan, atau layanan eksternal lainnya. Pihak ketiga
        tersebut dapat memiliki kebijakan privasi mereka sendiri.
      </p>

      <h3>Keamanan</h3>

      <p>
        Kami berusaha menerapkan langkah-langkah yang wajar untuk melindungi
        informasi yang tersedia pada situs. Namun, tidak ada metode
        transmisi atau penyimpanan data melalui internet yang dapat
        dijamin sepenuhnya aman.
      </p>

      <h3>Perubahan Kebijakan Privasi</h3>

      <p>
        LIVEMOTOGP dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu.
        Setiap perubahan akan diterapkan pada halaman ini.
      </p>

      <h3>Hubungi Kami</h3>

      <p>
        Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini,
        silakan menghubungi LIVEMOTOGP melalui kontak yang tersedia di situs.
      </p>
    `,
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    content: `
      <h2>Disclaimer</h2>

      <p>
        Informasi yang tersedia di LIVEMOTOGP disediakan untuk tujuan
        informasi dan hiburan.
      </p>

      <p>
        Kami berusaha menjaga informasi yang tersedia tetap akurat,
        namun tidak menjamin seluruh informasi selalu lengkap atau bebas
        dari kesalahan.
      </p>
    `,
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    content: `
      <h2>Terms & Conditions</h2>

      <p>
        Dengan mengakses dan menggunakan LIVEMOTOGP, Anda menyetujui
        ketentuan yang berlaku di situs ini.
      </p>

      <p>
        Pengguna bertanggung jawab atas penggunaan informasi dan layanan
        yang tersedia di situs.
      </p>
    `,
  },
];

const siteSettingData: Prisma.SiteSettingCreateInput = {
  siteName,
  title: `${siteName}`,
  description: `${siteName} adalah situs untuk nonton live streaming MotoGP 2026 terbaru dengan link siaran langsung MotoGP, Moto2, Moto3, dan WSBK 2026 kualitas HD. Saksikan race MotoGP, sprint race MotoGP, warm up, FP, practice, Q1, hingga Q2 MotoGP secara online dengan update terbaru setiap seri balapan.`,
  siteUrl: "https://www.livemotogp.com",
  logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHmCHohPlGvpTszWLefZK9gh8g5oxbuUVxsBA50zV5bB9mSZHo_xTnCpxu4WxpnFe91liZeSEgC0zAIPfUHFqDJledrPAsUbrw6L-2e72lI3y0TfKKOTswyKD_NHrQjCxa4qAjTYMyEjr5cq3jOIQorzExhljYazb9yu26TxBzj8k5aiI_XLUfChDaaSM/s1774/16949.png",
  favicon:
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHmCHohPlGvpTszWLefZK9gh8g5oxbuUVxsBA50zV5bB9mSZHo_xTnCpxu4WxpnFe91liZeSEgC0zAIPfUHFqDJledrPAsUbrw6L-2e72lI3y0TfKKOTswyKD_NHrQjCxa4qAjTYMyEjr5cq3jOIQorzExhljYazb9yu26TxBzj8k5aiI_XLUfChDaaSM/s1774/16949.png",
  ogImage:
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHmCHohPlGvpTszWLefZK9gh8g5oxbuUVxsBA50zV5bB9mSZHo_xTnCpxu4WxpnFe91liZeSEgC0zAIPfUHFqDJledrPAsUbrw6L-2e72lI3y0TfKKOTswyKD_NHrQjCxa4qAjTYMyEjr5cq3jOIQorzExhljYazb9yu26TxBzj8k5aiI_XLUfChDaaSM/s1774/16949.png",
  metaTitle: `${siteName} - Live Streaming MotoGP 2026`,
  metaDescription: `${siteName} adalah situs untuk nonton live streaming MotoGP 2026 terbaru dengan link siaran langsung MotoGP, Moto2, Moto3, dan WSBK 2026 kualitas HD. Saksikan race MotoGP, sprint race MotoGP, warm up, FP, practice, Q1, hingga Q2 MotoGP secara online dengan update terbaru setiap seri balapan.`,
  playerNoticeDescription:
    "Coba gunakan Google Chrome untuk pengalaman menonton yang lebih optimal. Jika video masih tidak dapat diputar atau mengalami error, silakan bergabung ke Telegram untuk mendapatkan bantuan dan link alternatif.",
  playerNoticeTitle: "Player Bermasalah?",
  telegramDescription: "Link channel telegram",
  telegramTitle: "Gabung Telegram",
  googleAnalyticsId: "G-G3KNCQ8N7G",
  googleSiteVerification: "xVjUOmyMEh47V9G9RsUsjdBI1_TsLi8zG1qkIXS--kU",
  socialLinks: {
    create: [
      {
        name: "LIVEMOTOGP X",
        platform: "twitter",
        url: "https://x.com/nontonmotogp",
      },
      {
        name: "LIVEMOTOGP Telegram",
        platform: "telegram",
        url: "https://t.me/+qMM92ZK59mVmYzg1",
      },
      {
        name: "LIVEMOTOGP Facebook",
        platform: "facebook",
        url: "https://www.facebook.com/livemotogpnet",
      },
      {
        name: "LIVEMOTOGP YouTube",
        platform: "youtube",
        url: "https://youtube.com/@livemotogpnet",
      },
      {
        name: "LIVEMOTOGP TikTok",
        platform: "tiktok",
        url: "https://t.me/+qMM92ZK59mVmYzg1",
      },
    ],
  },

  navbarItems: {
    create: [
      {
        name: "Home",
        url: "/",
        order: 0,
      },
      {
        name: "Live MotoGP",
        url: "/2026/08/23/live-streaming-motogp",
        order: 1,
      },
      {
        name: "Link Back Up",
        url: "https://www.zvstreams.com/p/live-streaming-motogp.html",
        order: 2,
      },
      {
        name: "Telegram",
        url: "https://t.me/+qMM92ZK59mVmYzg1",
        order: 3,
      },
    ],
  },

  footerItems: {
    create: [
      {
        name: "About",
        url: "/about",
        order: 0,
      },
      {
        name: "Privacy Policy",
        url: "/privacy",
        order: 1,
      },
      {
        name: "Disclaimer",
        url: "/disclaimer",
        order: 2,
      },
      {
        name: "Contact",
        url: "https://t.me/+qMM92ZK59mVmYzg1",
        order: 3,
      },
      {
        name: "Terms & Conditions",
        url: "/terms",
        order: 4,
      },
    ],
  },

  adLinks: {
    create: [
      {
        name: "Mgid",
        url: "https://jsc.mgid.com/site/986312.js",
        order: 1,
        position: "head",
        isActive: true,
      },
      {
        name: "Adsterra social bar",
        url: "https://birchalibis.com/8e/9d/37/8e9d37d13bce33fd36e49421cfd5bc7b.js",
        order: 2,
        position: "body",
        isActive: false,
      },
      {
        name: "Adsterra",
        url: "https://birchalibis.com/01/40/c7/0140c7f2b4b2a1bb3e8b3837c856198a.js",
        order: 0,
        position: "head",
        isActive: true,
      },
    ],
  },

  hero: {
    create: [
      {
        badge: "LIVE STREAMING",
        title: "LIVE",
        subtitle: "MOTOGP",
        year: "2026",
        description:
          "LIVEMOTOGP adalah situs untuk nonton live streaming MotoGP 2026 terbaru dengan link siaran langsung MotoGP, Moto2, Moto3, dan WSBK 2026 kualitas HD.",
        primaryButtonText: "TONTON SEKARANG",
        primaryButtonUrl: "/2026/08/23/live-streaming-motogp",
        secondaryButtonText: "Telegram",
        secondaryButtonUrl: "https://t.me/+qMM92ZK59mVmYzg1",
      },
    ],
  },
};

export async function main() {
  try {
    /*
     * Site Setting
     */
    await prisma.siteSetting.create({
      data: siteSettingData,
    });

    /*
     * Streams
     *
     * Stream dibuat terlebih dahulu karena
     * Stream sekarang berdiri sendiri.
     */
    const streams = await Promise.all(
      streamData.map((stream) =>
        prisma.stream.create({
          data: stream,
        }),
      ),
    );

    /*
     * Articles
     *
     * Artikel kemudian menghubungkan stream
     * yang sudah dibuat.
     */
    for (const article of articleData) {
      const streamRecords = streams.filter((stream) =>
        article.streamNames.includes(stream.name),
      );

      await prisma.article.create({
        data: {
          title: article.title,
          slug: article.slug,
          content: article.content,

          streams: {
            connect: streamRecords.map((stream) => ({
              id: stream.id,
            })),
          },

          categories: {
            connectOrCreate: article.categories.map((category) => ({
              where: {
                slug: category.slug,
              },
              create: {
                name: category.name,
                slug: category.slug,
              },
            })),
          },
        },
      });
    }

    /*
     * Pages
     */
    for (const page of pageData) {
      await prisma.page.create({
        data: page,
      });
    }

    console.log("Seed completed successfully.");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
