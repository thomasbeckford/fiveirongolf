import localFont from "next/font/local";

export const rawson = localFont({
  src: [
    {
      path: "./RawsonAltLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./RawsonAltRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./RawsonAltSemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./RawsonAltBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./RawsonAltBlack.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-rawson",
  display: "swap",
});
