"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import NavigationButtons from "./navigation-buttons";
import QuestionSection from "./question-section";
import BackgroundImage from "../../../../../components/background-image/background-image";
import {
  ProfilingProps,
  QuestionOption,
  Question,
  QuestionId,
  redirectMappings,
  secondStepQuestionFilter,
  QuestionIds,
} from "../types/types";

const ProfilingComponent = ({
  title,
  titleStep2,
  goBackIcon,
  skipText,
  selectText,
  backgroundImage,
  backgroundImageLg,
  backgroundImageAlt,
  buttonText,
  questions,
}: ProfilingProps) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<QuestionId, QuestionOption[]>
  >({
    [QuestionIds.DrivingStyle]: [],
    [QuestionIds.Priority]: [],
  });
  const [nextButtonText, setNextButtonText] = useState<string>(buttonText);
  const router = useRouter();

  useEffect(() => {
    if (currentStep === 2) {
      setNextButtonText(t("Continue"));
    }
  }, [currentStep, t]);

  const handleNextStep = () => {
    if (currentStep === 2) {
      redirectToNextPage();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => {
      if (prev === 2) {
        setNextButtonText(buttonText);
      }

      return prev - 1;
    });
  };

  const currentQuestion: Question | undefined = questions.find(
    (q) =>
      q.id ===
      (currentStep === 1 ? QuestionIds.DrivingStyle : QuestionIds.Priority)
  );

  if (!currentQuestion) {
    return null;
  }

  const isMultipleSelection = currentStep === 1;

  const currentSelections: QuestionOption[] =
    selectedOptions[currentQuestion.id] || [];

  const progress =
    (currentStep === 1 && currentSelections.length > 0) ||
    (currentStep === 2 && currentSelections.length > 0)
      ? currentStep === 1
        ? 50
        : 100
      : currentStep === 1
      ? 0
      : 50;

  const filteredSecondStepOptions = (): QuestionOption[] => {
    const firstStepSelections = selectedOptions[QuestionIds.DrivingStyle] || [];
    let filteredOptions: QuestionOption[] = [];

    firstStepSelections.forEach((selection) => {
      const filterKeys = secondStepQuestionFilter[selection.id];

      if (filterKeys) {
        filteredOptions = filteredOptions.concat(
          questions[1].options.filter((option) =>
            filterKeys.includes(option.id)
          )
        );
      }
    });

    return filteredOptions;
  };

  const redirectToNextPage = () => {
    const selectedSecondStep = selectedOptions[QuestionIds.Priority] || [];

    if (selectedSecondStep.length > 0) {
      const firstSelection = selectedSecondStep[0].id;
      const redirectUrl =
        redirectMappings[QuestionIds.Priority][firstSelection];

      if (redirectUrl) {
        router.push(redirectUrl);
      }
    }
  };

  return (
    <div className="relative h-screen flex flex-col justify-between items-center">
      <BackgroundImage
        backgroundImage={backgroundImage}
        backgroundImageLg={backgroundImageLg}
        backgroundImageAlt={backgroundImageAlt}
      />
      <QuestionSection
        currentQuestion={currentQuestion}
        title={title}
        currentSelections={currentSelections}
        setSelectedOptions={(options: QuestionOption[]) =>
          setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [currentQuestion.id]: options,
          }))
        }
        isMultipleSelection={isMultipleSelection}
        selectText={selectText}
        filteredSecondStepOptions={filteredSecondStepOptions()}
        currentStep={currentStep}
        titleStep2={titleStep2}
      />
      <NavigationButtons
        currentStep={currentStep}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        nextButtonText={nextButtonText}
        currentSelections={currentSelections}
        skipText={skipText}
        progress={progress}
        goBackIcon={goBackIcon}
      />
    </div>
  );
};

export default ProfilingComponent;
