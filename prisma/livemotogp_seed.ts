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

const categoryData: Prisma.CategoryCreateInput[] = [
  {
    id: "15b131fa-a81b-473d-913c-edd901cc31c8",
    name: "Misano",
    slug: "misano",
    createdAt: new Date("2026-09-05 08:42:10.47"),
    updatedAt: new Date("2026-09-05 09:06:03.427"),
  },
  {
    id: "57ecd9a1-cbe0-4338-8d4d-350bae35fdd2",
    name: "Live WSBK",
    slug: "live-wsbk",
    createdAt: new Date("2026-08-23 15:04:53.661"),
    updatedAt: new Date("2026-09-05 08:40:59.739"),
  },
  {
    id: "6da7cd82-1606-46e0-ba7d-dfe30ffe9c78",
    name: "MotoGP 2026",
    slug: "motogp-2026",
    createdAt: new Date("2026-08-24 14:14:19.997"),
    updatedAt: new Date("2026-09-05 07:57:31.376"),
  },
  {
    id: "b354520c-4b2a-4e9d-92bb-0d090b1e72df",
    name: "WSBK",
    slug: "wsbk",
    createdAt: new Date("2026-09-05 08:04:48.196"),
    updatedAt: new Date("2026-09-05 08:29:16.215"),
  },
  {
    id: "c3e7626f-7d5b-4a28-9b0d-2cc33a544841",
    name: "MotoG Aragon",
    slug: "motog-aragon",
    createdAt: new Date("2026-08-23 18:03:40.977"),
    updatedAt: new Date("2026-09-05 07:58:33.89"),
  },
  {
    id: "c636f4c1-27c1-4d46-bf33-4316f2c5cefa",
    name: "Live MotoGP",
    slug: "live-motogp",
    createdAt: new Date("2026-08-23 15:04:53.661"),
    updatedAt: new Date("2026-09-05 09:06:03.427"),
  },
  {
    id: "c7318ca3-2402-4e7e-913c-c02146e7035f",
    name: "San Marino 2026",
    slug: "san-marino-2026",
    createdAt: new Date("2026-09-05 09:06:03.427"),
    updatedAt: new Date("2026-09-05 09:06:03.427"),
  },
  {
    id: "d3a7a763-788e-48b5-ad63-8fd05442e29a",
    name: "MotoGP",
    slug: "motogp",
    createdAt: new Date("2026-09-05 08:42:10.47"),
    updatedAt: new Date("2026-09-05 09:06:03.427"),
  },
];

const articleData: Prisma.ArticleCreateInput[] = [
  {
    id: "002adb82-5247-4ab5-9adb-b31f69e86cea",
    title: "Live Streaming MotoGP Misano 2026",
    slug: "live-streaming-motogp-misano-2026",
    metaDescription: "Link Live Streaming MotoGP Misano 2026",
    content: "",
    createdAt: new Date("2026-09-05 08:41:00.886"),
    updatedAt: new Date("2026-09-05 09:06:04.772"),
    poster:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOndvBzfLQYUyem_5zPXNBEjKRG_T2IV02yiUSERFN1YsGPXcDgzuDYp6X14EM6P14pRrR36H23Nm6ReJopmCF1SHPKZUx5nKxkZjU58GsP0CvXBZ8XSyBQnm5MJJWa0hxR7rGA5UED1botfZwA3IfWrGK5TGbPbAzpdnB2UuTJpccUboNFroYXv9dw7aU/s1621/Picsart_25-06-23_11-23-05-300.jpg",
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHmCHohPlGvpTszWLefZK9gh8g5oxbuUVxsBA50zV5bB9mSZHo_xTnCpxu4WxpnFe91liZeSEgC0zAIPfUHFqDJledrPAsUbrw6L-2e72lI3y0TfKKOTswyKD_NHrQjCxa4qAjTYMyEjr5cq3jOIQorzExhljYazb9yu26TxBzj8k5aiI_XLUfChDaaSM/s1774/16949.png",
    status: "publish",
    uploadBy: "ZZ",
  },
  {
    id: "093f8ce2-2b21-4105-bbcb-7f26087822e3",
    title: "Nonton Live Streaming MotoGP Aragon 2026",
    slug: "nonton-live-streaming-motogp-aragon-2026",
    metaDescription: "Link Nonton Live Streaming MotoGP Aragon 2026",
    content: "",
    createdAt: new Date("2026-08-24 14:14:20.655"),
    updatedAt: new Date("2026-09-05 07:57:32.711"),
    poster:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOndvBzfLQYUyem_5zPXNBEjKRG_T2IV02yiUSERFN1YsGPXcDgzuDYp6X14EM6P14pRrR36H23Nm6ReJopmCF1SHPKZUx5nKxkZjU58GsP0CvXBZ8XSyBQnm5MJJWa0hxR7rGA5UED1botfZwA3IfWrGK5TGbPbAzpdnB2UuTJpccUboNFroYXv9dw7aU/s1621/Picsart_25-06-23_11-23-05-300.jpg",
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHmCHohPlGvpTszWLefZK9gh8g5oxbuUVxsBA50zV5bB9mSZHo_xTnCpxu4WxpnFe91liZeSEgC0zAIPfUHFqDJledrPAsUbrw6L-2e72lI3y0TfKKOTswyKD_NHrQjCxa4qAjTYMyEjr5cq3jOIQorzExhljYazb9yu26TxBzj8k5aiI_XLUfChDaaSM/s1774/16949.png",
    status: "publish",
    uploadBy: "Z",
  },
  {
    id: "8956ed85-5863-4335-9156-ce4070a53074",
    title: "Live Streaming MotoGP Aragon 2026",
    slug: "live-streaming-motogp-aragon-2026",
    metaDescription: "Link Nonton Live Streaming MotoGP Aragon 2026",
    content: "",
    createdAt: new Date("2026-08-23 18:03:42.181"),
    updatedAt: new Date("2026-09-05 07:58:35.197"),
    poster:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOndvBzfLQYUyem_5zPXNBEjKRG_T2IV02yiUSERFN1YsGPXcDgzuDYp6X14EM6P14pRrR36H23Nm6ReJopmCF1SHPKZUx5nKxkZjU58GsP0CvXBZ8XSyBQnm5MJJWa0hxR7rGA5UED1botfZwA3IfWrGK5TGbPbAzpdnB2UuTJpccUboNFroYXv9dw7aU/s1621/Picsart_25-06-23_11-23-05-300.jpg",
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHmCHohPlGvpTszWLefZK9gh8g5oxbuUVxsBA50zV5bB9mSZHo_xTnCpxu4WxpnFe91liZeSEgC0zAIPfUHFqDJledrPAsUbrw6L-2e72lI3y0TfKKOTswyKD_NHrQjCxa4qAjTYMyEjr5cq3jOIQorzExhljYazb9yu26TxBzj8k5aiI_XLUfChDaaSM/s1774/16949.png",
    status: "publish",
    uploadBy: "X",
  },
  {
    id: "bb759d88-4392-4a92-86a0-e6333e584878",
    title: "Live Streaming MotoGP 2026",
    slug: "live-streaming-motogp-2026",
    metaDescription: "Link Nonton Live Streaming MotoGP 2026",
    content: "",
    createdAt: new Date("2026-08-24 13:35:47.961"),
    updatedAt: new Date("2026-09-05 07:57:53.136"),
    poster:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOndvBzfLQYUyem_5zPXNBEjKRG_T2IV02yiUSERFN1YsGPXcDgzuDYp6X14EM6P14pRrR36H23Nm6ReJopmCF1SHPKZUx5nKxkZjU58GsP0CvXBZ8XSyBQnm5MJJWa0hxR7rGA5UED1botfZwA3IfWrGK5TGbPbAzpdnB2UuTJpccUboNFroYXv9dw7aU/s1621/Picsart_25-06-23_11-23-05-300.jpg",
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHmCHohPlGvpTszWLefZK9gh8g5oxbuUVxsBA50zV5bB9mSZHo_xTnCpxu4WxpnFe91liZeSEgC0zAIPfUHFqDJledrPAsUbrw6L-2e72lI3y0TfKKOTswyKD_NHrQjCxa4qAjTYMyEjr5cq3jOIQorzExhljYazb9yu26TxBzj8k5aiI_XLUfChDaaSM/s1774/16949.png",
    status: "publish",
    uploadBy: "X",
  },
  {
    id: "c3e94e2e-2287-4fde-891e-b98d49266934",
    title: "Live Streaming MotoGP",
    slug: "live-streaming-motogp",
    metaDescription: "Link Nonton Live Streaming MotoGP",
    content: "<h1>LIVE STREAMING AD</div>",
    createdAt: new Date("2026-08-23 15:04:53.661"),
    updatedAt: new Date("2026-09-05 07:58:52.248"),
    poster:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOndvBzfLQYUyem_5zPXNBEjKRG_T2IV02yiUSERFN1YsGPXcDgzuDYp6X14EM6P14pRrR36H23Nm6ReJopmCF1SHPKZUx5nKxkZjU58GsP0CvXBZ8XSyBQnm5MJJWa0hxR7rGA5UED1botfZwA3IfWrGK5TGbPbAzpdnB2UuTJpccUboNFroYXv9dw7aU/s1621/Picsart_25-06-23_11-23-05-300.jpg",
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHmCHohPlGvpTszWLefZK9gh8g5oxbuUVxsBA50zV5bB9mSZHo_xTnCpxu4WxpnFe91liZeSEgC0zAIPfUHFqDJledrPAsUbrw6L-2e72lI3y0TfKKOTswyKD_NHrQjCxa4qAjTYMyEjr5cq3jOIQorzExhljYazb9yu26TxBzj8k5aiI_XLUfChDaaSM/s1774/16949.png",
    status: "publish",
    uploadBy: "X",
  },
  {
    id: "c4f27f42-8b01-4fa8-bb72-e6dce53b5320",
    title: "Nonton Live Streaming WSBK 2026",
    slug: "nonton-live-streaming-wsbk-2026",
    metaDescription: "Link Nonton Live Streaming WSBK 2026",
    content: "",
    createdAt: new Date("2026-08-24 14:21:39.507"),
    updatedAt: new Date("2026-09-05 08:07:40.741"),
    poster:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOndvBzfLQYUyem_5zPXNBEjKRG_T2IV02yiUSERFN1YsGPXcDgzuDYp6X14EM6P14pRrR36H23Nm6ReJopmCF1SHPKZUx5nKxkZjU58GsP0CvXBZ8XSyBQnm5MJJWa0hxR7rGA5UED1botfZwA3IfWrGK5TGbPbAzpdnB2UuTJpccUboNFroYXv9dw7aU/s1621/Picsart_25-06-23_11-23-05-300.jpg",
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHmCHohPlGvpTszWLefZK9gh8g5oxbuUVxsBA50zV5bB9mSZHo_xTnCpxu4WxpnFe91liZeSEgC0zAIPfUHFqDJledrPAsUbrw6L-2e72lI3y0TfKKOTswyKD_NHrQjCxa4qAjTYMyEjr5cq3jOIQorzExhljYazb9yu26TxBzj8k5aiI_XLUfChDaaSM/s1774/16949.png",
    status: "publish",
    uploadBy: "X",
  },
  {
    id: "cd6d476c-1924-4c31-ad14-5c6382e4831f",
    title: "Live Streaming WSBK",
    slug: "live-streaming-wsbk",
    metaDescription: "Link Live Streaming WSBK 2026",
    content: "",
    createdAt: new Date("2026-09-05 08:04:49.341"),
    updatedAt: new Date("2026-09-05 08:29:17.552"),
    poster:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOndvBzfLQYUyem_5zPXNBEjKRG_T2IV02yiUSERFN1YsGPXcDgzuDYp6X14EM6P14pRrR36H23Nm6ReJopmCF1SHPKZUx5nKxkZjU58GsP0CvXBZ8XSyBQnm5MJJWa0hxR7rGA5UED1botfZwA3IfWrGK5TGbPbAzpdnB2UuTJpccUboNFroYXv9dw7aU/s1621/Picsart_25-06-23_11-23-05-300.jpg",
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHmCHohPlGvpTszWLefZK9gh8g5oxbuUVxsBA50zV5bB9mSZHo_xTnCpxu4WxpnFe91liZeSEgC0zAIPfUHFqDJledrPAsUbrw6L-2e72lI3y0TfKKOTswyKD_NHrQjCxa4qAjTYMyEjr5cq3jOIQorzExhljYazb9yu26TxBzj8k5aiI_XLUfChDaaSM/s1774/16949.png",
    status: "publish",
    uploadBy: "Z",
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
    create: {
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
  },
};

async function main() {
  try {
    /*
     * Site Setting
     */
    await prisma.siteSetting.deleteMany();
    await prisma.siteSetting.create({
      data: siteSettingData,
    });

    /*
     * Streams
     */
    for (const stream of streamData) {
      const existing = await prisma.stream.findFirst({
        where: { name: stream.name },
      });

      if (existing) {
        await prisma.stream.update({
          where: { id: existing.id },
          data: stream,
        });
      } else {
        await prisma.stream.create({
          data: stream,
        });
      }
    }

    /*
     * Categories
     *
     * Data dipindahkan langsung dari categories_rows.json.
     */
    for (const category of categoryData) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {
          name: category.name,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        },
        create: category,
      });
    }

    /*
     * Articles
     *
     * Data dipindahkan langsung dari articles_rows.json.
     * Tidak ada data relasi kategori/stream di JSON, jadi tidak
     * menambahkan relasi yang tidak tersedia di sumber.
     */
    for (const article of articleData) {
      await prisma.article.upsert({
        where: { slug: article.slug },
        update: {
          title: article.title,
          metaDescription: article.metaDescription,
          content: article.content,
          poster: article.poster,
          thumbnail: article.thumbnail,
          status: article.status,
          uploadBy: article.uploadBy,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
        },
        create: article,
      });
    }

    /*
     * Ad Widgets
     */
    for (const adWidget of adWidgetData) {
      const existing = await prisma.adWidget.findFirst({
        where: { name: adWidget.name },
      });

      if (existing) {
        await prisma.adWidget.update({
          where: { id: existing.id },
          data: adWidget,
        });
      } else {
        await prisma.adWidget.create({
          data: adWidget,
        });
      }
    }

    /*
     * Pages
     */
    for (const page of pageData) {
      await prisma.page.upsert({
        where: { slug: page.slug },
        update: {
          title: page.title,
          content: page.content,
        },
        create: page,
      });
    }

    console.log("====================================");
    console.log("Seed completed successfully.");
    console.log(`Categories : ${categoryData.length}`);
    console.log(`Articles   : ${articleData.length}`);
    console.log(`Streams    : ${streamData.length}`);
    console.log("====================================");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
