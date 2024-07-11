import { Locales } from "@apps/tire-test-experience/i18n-config";

import { EduCardsComponent } from "./../[locale]/confidence/educational/components/edu-cards/edu-cards";
import {
  EduHeroComponent,
  SliderComponent,
  TutorialComponent,
} from "../[locale]/confidence/educational/types/types";
import { IntroHeroComponent } from "../[locale]/intro/types/types";
import { IntroMapComponent } from "../[locale]/menu-map/types/types";
import { ProfilingComponent } from "../[locale]/profiling/types/types";

export type SupportedComponents =
  | EduHeroComponent
  | SliderComponent
  | IntroHeroComponent
  | ProfilingComponent
  | IntroMapComponent
  | TutorialComponent
  | EduCardsComponent;

export type ContentConfig = {
  [locale in Locales]: {
    components: SupportedComponents[];
  };
};

export type ComponentProps<T, P> = {
  type: T;
  props: P;
};
