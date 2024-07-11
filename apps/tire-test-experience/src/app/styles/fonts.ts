import localFont from "next/font/local";

export const michelin = localFont({
  src: [
    {
      path: "../fonts/michelin/Michelin-Black.otf",
      weight: "900",
      style: "bold",
    },
    {
      path: "../fonts/michelin/Michelin-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/michelin/Michelin-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/michelin/Michelin-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/michelin/Michelin-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-michelin",
});

export const openSans = localFont({
  src: [
    {
      path: "../fonts/open-sans/static/OpenSans/OpenSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/open-sans/static/OpenSans/OpenSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/open-sans/static/OpenSans/OpenSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-open-sans",
});

export const plusJakartaSans = localFont({
  src: [
    {
      path: "../fonts/plus-jakarta-sans/static/PlusJakartaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/plus-jakarta-sans/static/PlusJakartaSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/plus-jakarta-sans/static/PlusJakartaSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-plus-jakarta-sans",
});
