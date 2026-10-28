import { ImageResponse } from "next/og";

import { FLAG_PATH, STACKED_VIEWBOX, WORDMARK_PATH } from "@/bannerly/logo";
import { site } from "@/bannerly/config";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function logoDataUrl() {
  const w = Number(STACKED_VIEWBOX.split(" ").at(2));
  const flagWidth = 252;
  const wordWidth = 672;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${STACKED_VIEWBOX}"><g fill="#74151C" fill-rule="evenodd"><path transform="translate(${(w - flagWidth) / 2} 0)" d="${FLAG_PATH}"/><path transform="translate(${(w - wordWidth) / 2} 250)" d="${WORDMARK_PATH}"/></g></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          background: "#F4EEDA",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" height={340} src={logoDataUrl()} width={560} />
        <div style={{ fontSize: 40, color: "#564D3E", letterSpacing: -1 }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
