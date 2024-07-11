import Image from "next/image";

import ProgressBar from "./progress-bar";
import CustomLink from "../../../../../components/custom-link/custom-link";
import StepButton from "../../../../../components/step-button/step-button";
import { NavigationButtonsProps } from "../types/types";

const NavigationButtons = ({
  currentStep,
  handlePrevStep,
  handleNextStep,
  nextButtonText,
  currentSelections,
  skipText,
  progress,
  goBackIcon,
}: NavigationButtonsProps) => (
  <div className="relative z-10 w-full flex flex-col items-center">
    <div className="w-full flex justify-between items-center px-[1.25rem] py-[1.5rem] relative">
      {currentStep > 1 ? (
        <button
          className="font-openSans text-[1rem] text-blue-500 border border-white rounded-full w-14 h-14 flex items-center justify-center"
          onClick={handlePrevStep}
        >
          <Image src={goBackIcon} alt="Go Back Icon" width={14} height={14} />
        </button>
      ) : (
        <div className="w-14 h-14" />
      )}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <StepButton
          onClick={handleNextStep}
          text={nextButtonText}
          disabled={currentSelections.length === 0}
        />
      </div>
      <div className="hidden md:block">
        <CustomLink
          text={skipText}
          href="/intro"
          className="font-michelin text-white text-mobile-h6 md:text-h6 underline uppercase font-semibold"
        />
      </div>
    </div>
    <div className="block md:hidden mt-4">
      <CustomLink
        text={skipText}
        href="/intro"
        className="font-michelin text-white text-mobile-h6 md:text-h6 underline uppercase font-semibold"
      />
    </div>
    <div className="w-full px-[1.25rem] py-[1.5rem]">
      <ProgressBar progress={progress} />
    </div>
  </div>
);

export default NavigationButtons;
