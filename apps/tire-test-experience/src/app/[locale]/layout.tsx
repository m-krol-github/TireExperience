import "./../styles/global.css";

import { Noto_Sans } from "next/font/google";

import { michelin, openSans, plusJakartaSans } from "../styles/fonts";

const noto_sans = Noto_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html
      lang={params.lang}
      className={`${michelin.variable} ${openSans.variable} ${plusJakartaSans.variable} ${noto_sans.className}`}
    >
      <body>{children}</body>
    </html>
  );
}
