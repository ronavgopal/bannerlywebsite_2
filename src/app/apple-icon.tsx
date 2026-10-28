import { ImageResponse } from "next/og";

import { FLAG_PATH, FLAG_VIEWBOX } from "@/bannerly/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${FLAG_VIEWBOX}"><path fill="#74151C" fill-rule="evenodd" d="${FLAG_PATH}"/></svg>`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F4EEDA",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          height={110}
          src={`data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`}
          width={124}
        />
      </div>
    ),
    size,
  );
}
