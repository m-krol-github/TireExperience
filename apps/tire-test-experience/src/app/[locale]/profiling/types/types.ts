export type ComponentProps<Type extends string, Props> = {
  type: Type;
  props: Props;
};
export const redirectMappings: Record<
  QuestionId,
  Partial<Record<OptionId, string>>
> = {
  priority: {
    race_performing_street: "/sport",
    smart_city_ride: "/efficiency",
    family_ride_in_the_city: "/confidence",
    adventure_road_trip: "/durability",
    snow_season_tour: "/winter",
  },
  driving_style: {},
};

export interface QuestionSectionProps {
  currentQuestion: {
    questionTopPart: string;
    questionBottomPart: string;
    options: QuestionOption[];
  };
  currentSelections: QuestionOption[];
  setSelectedOptions: (options: QuestionOption[]) => void;
  isMultipleSelection: boolean;
  selectText: string;
  filteredSecondStepOptions: QuestionOption[];
  currentStep: number;
  title: string;
  titleStep2: string;
}

export type NavigationButtonsProps = {
  currentStep: number;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  nextButtonText: string;
  currentSelections: any[];
  skipText: string;
  progress: number;
  goBackIcon: string;
};
export type CardProps = {
  options: QuestionOption[];
  selectedOptions: QuestionOption[];
  setSelectedOptions: (options: QuestionOption[]) => void;
  isMultipleSelection?: boolean;
};

export const OptionIds = {
  ComfortSafety: "comfort_safety",
  PrecisionPower: "precision_power",
  RacePerformingStreet: "race_performing_street",
  SmartCityRide: "smart_city_ride",
  FamilyRideInTheCity: "family_ride_in_the_city",
  AdventureRoadTrip: "adventure_road_trip",
  SnowSeasonTour: "snow_season_tour",
} as const;

export const QuestionIds = {
  DrivingStyle: "driving_style",
  Priority: "priority",
} as const;

export type OptionId = (typeof OptionIds)[keyof typeof OptionIds];
export type QuestionId = (typeof QuestionIds)[keyof typeof QuestionIds];
export const secondStepQuestionFilter: Record<OptionId, OptionId[]> = {
  [OptionIds.ComfortSafety]: [
    OptionIds.FamilyRideInTheCity,
    OptionIds.AdventureRoadTrip,
    OptionIds.SnowSeasonTour,
  ],
  [OptionIds.PrecisionPower]: [
    OptionIds.RacePerformingStreet,
    OptionIds.SmartCityRide,
  ],
  [OptionIds.RacePerformingStreet]: [],
  [OptionIds.SmartCityRide]: [],
  [OptionIds.FamilyRideInTheCity]: [],
  [OptionIds.AdventureRoadTrip]: [],
  [OptionIds.SnowSeasonTour]: [],
};

export interface QuestionOption {
  id: OptionId;
  label: string;
  icon: string;
  icon_active: string;
}

export interface Question {
  id: QuestionId;
  questionTopPart: string;
  questionBottomPart: string;
  options: QuestionOption[];
}

export interface ProfilingProps {
  title: string;
  titleStep2: string;
  backgroundImage: string;
  backgroundImageLg: string;
  backgroundImageAlt: string;
  buttonText: string;
  selectText: string;
  skipText: string;
  goBackIcon: string;
  questions: Question[];
}

export type ProfilingComponent = ComponentProps<"Profiling", ProfilingProps>;
