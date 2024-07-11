import Image from "next/image";

import { CardProps, QuestionOption } from "../types/types";

interface CardPropsWithStep extends CardProps {
  currentStep: number;
  index: number;
}

const Card = ({
  options,
  selectedOptions,
  setSelectedOptions,
  isMultipleSelection,
  currentStep,
  index,
}: CardPropsWithStep) => {
  const handleSelect = (option: QuestionOption) => {
    if (isMultipleSelection) {
      const updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
    } else {
      setSelectedOptions([option]);
    }
  };

  return (
    <div className="flex flex-row md:gap-3 space-x-4 md:space-x-0 justify-center md:justify-start">
      {options.map((option) => {
        return (
          <button
            key={option.id}
            className={`relative flex flex-col items-center cursor-pointer rounded-lg p-6 border transition-all ${
              selectedOptions.includes(option)
                ? "bg-[#145CAE] border-yellow text-yellow"
                : "bg-transparent border-white text-white"
            } w-[185px] h-[300px] md:w-[220px]`}
            onClick={() => handleSelect(option)}
            aria-pressed={selectedOptions.includes(option)}
          >
            {currentStep === 2 && (
              <>
                <div
                  className={`absolute border ${
                    selectedOptions.includes(option)
                      ? "border-yellow text-yellow"
                      : "border-white text-white"
                  } top-0 left-0 font-michelin px-5 py-3 text-xs rounded-br-2xl rounded-tl-3xl border-l-0 border-t-0`}
                >
                  {index + 1}
                </div>
                <div
                  className={`absolute border ${
                    selectedOptions.includes(option)
                      ? "border-yellow text-yellow"
                      : "border-white text-white"
                  } bottom-0 right-0 font-michelin px-5 py-3 text-xs rounded-br-2xl rounded-tl-3xl border-r-0 border-b-0`}
                >
                  {index + 1}
                </div>
              </>
            )}
            <div className="flex flex-col items-center space-y-4 justify-center h-full">
              <div className={`shrink-0 text-sm`}>
                <Image
                  src={
                    selectedOptions.includes(option)
                      ? option.icon_active
                      : option.icon
                  }
                  alt={option.label}
                  height={80}
                  width={80}
                />
              </div>
              <p
                className={`font-bold text-lg leading-6 text-center ${
                  selectedOptions.includes(option)
                    ? "text-yellow"
                    : "text-white"
                }`}
              >
                {option.label}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Card;
