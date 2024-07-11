import Link from "next/link";

import { MapLabelProps } from "../types/types";

const MapLabel = ({ title, left, top, href }: MapLabelProps) => {
  return (
    <Link
      href={href}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        transform: "translate(-50%, -50%)",
      }}
      className="absolute z-60 bg-yellow font-michelin italic font-bold rounded-[20px] text-[1vw] py-1 px-4"
    >
      {title}
    </Link>
  );
};

export default MapLabel;
