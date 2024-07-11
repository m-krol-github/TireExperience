import { twMerge } from "tailwind-merge";

export interface EduHeroTextProps {
  title?: string;
  subtitle?: string;
  textColor?: "white" | "yellow";
  outlineTextColor?: "white" | "yellow";
  beforeTitle?: string;
  afterTitle?: string;
}

const TextWithBackgroundAsTitle = ({
  title,
  subtitle,
  textColor = "white",
  outlineTextColor = "yellow",
  beforeTitle,
  afterTitle,
}: EduHeroTextProps) => {
  const textColorClasses = {
    white: "text-white",
    yellow: "text-yellow",
  }[textColor];

  const outlineTextColorClasses = {
    white: "text-white-outline",
    yellow: "text-yellow-outline",
  }[outlineTextColor];

  return afterTitle && beforeTitle ? (
    <div className="relative text-center opacity-10 text-white w-fit m-auto">
      <span className="absolute top-[-30px] left-[25%] md:left-0 text-[30px] md:text-[2.5vw] font-semibold font-michelin italic">
        {beforeTitle}
      </span>
      <h1 className="text-[115px] md:text-[14vw] font-bold font-michelin italic leading-none">
        {title}
      </h1>
      <span className="absolute bottom-[-30px] right-[25%] md:right-0 text-[30px] md:text-[2.5vw] font-semibold font-michelin italic">
        {afterTitle}
      </span>
    </div>
  ) : (
    <div className="relative text-center p-6 text-white/80">
      <div
        className={twMerge(
          "absolute inset-0 opacity-50 text-transparent font-bold leading-none",
          outlineTextColorClasses
        )}
      >
        <div className="flex items-center justify-center flex-col">
          <div className="font-michelin italic font-black text-mobile-h1xl uppercase translate-x-40 md:translate-x-32 md:-translate-y-6">
            {title}
          </div>
          <div className="font-michelin italic font-black text-mobile-h1xl uppercase -translate-x-40 md:-translate-x-32 md:-translate-y-10">
            {title}
          </div>
        </div>
      </div>
      <div className="relative mt-10 flex items-center justify-center flex-col">
        <h1
          className={twMerge(
            "font-michelin italic font-black text-[2.625rem] leading-[1.1] md:text-h1 md:text-[3.5rem] drop-shadow-custom",
            textColorClasses
          )}
        >
          {title}
        </h1>
        <h3
          className={twMerge(
            "font-michelin italic font-black text-base leading-tight md:text-2xl mt-2 drop-shadow-custom",
            textColorClasses
          )}
        >
          {subtitle}
        </h3>
      </div>
    </div>
  );
};

export default TextWithBackgroundAsTitle;
