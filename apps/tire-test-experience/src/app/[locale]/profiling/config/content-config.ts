import backgroundAfterBanner from "@apps/tire-test-experience/public/images/background_after_banner.png";
import backgroundAfterBannerLg from "@apps/tire-test-experience/public/images/background_after_banner_lg.png";
import adventureIcon from "@apps/tire-test-experience/public/images/profiling/Adventure.svg";
import adventureIcon_active from "@apps/tire-test-experience/public/images/profiling/Adventure_active.svg";
import arrowIcon from "@apps/tire-test-experience/public/images/profiling/Arrow.svg";
import cityIcon from "@apps/tire-test-experience/public/images/profiling/City.svg";
import cityIcon_active from "@apps/tire-test-experience/public/images/profiling/City_active.svg";
import comfortIcon from "@apps/tire-test-experience/public/images/profiling/Comfort.svg";
import comfortIcon_active from "@apps/tire-test-experience/public/images/profiling/Comfort_active.svg";
import familyIcon from "@apps/tire-test-experience/public/images/profiling/Family.svg";
import familyIcon_active from "@apps/tire-test-experience/public/images/profiling/Family_active.svg";
import powerIcon from "@apps/tire-test-experience/public/images/profiling/Power.svg";
import powerIcon_active from "@apps/tire-test-experience/public/images/profiling/Power_active.svg";
import raceIcon from "@apps/tire-test-experience/public/images/profiling/Race.svg";
import raceIcon_active from "@apps/tire-test-experience/public/images/profiling/Race_active.svg";
import snowIcon from "@apps/tire-test-experience/public/images/profiling/Snow.svg";
import snowIcon_active from "@apps/tire-test-experience/public/images/profiling/Snow_active.svg";

import { ContentConfig } from "../../../types/content-config";
import { OptionIds, QuestionIds } from "../types/types";

export const contentConfig: ContentConfig = {
  "en-US": {
    components: [
      {
        type: "Profiling",
        props: {
          title: "TUTORIAL",
          titleStep2: "TELL US ABOUT YOURSELF",
          backgroundImage: backgroundAfterBanner.src,
          backgroundImageLg: backgroundAfterBannerLg.src,
          backgroundImageAlt: "Background after banner",
          buttonText: "STEP 2",
          selectText: "You can select both",
          skipText: "Skip profiling",
          goBackIcon: arrowIcon.src,
          questions: [
            {
              id: QuestionIds.DrivingStyle,
              questionTopPart: "WHAT IS YOUR",
              questionBottomPart: "DRIVING STYLE?",
              options: [
                {
                  id: OptionIds.ComfortSafety,
                  label: "Comfort & Safety",
                  icon: comfortIcon.src,
                  icon_active: comfortIcon_active.src,
                },
                {
                  id: OptionIds.PrecisionPower,
                  label: "Precision & Power",
                  icon: powerIcon.src,
                  icon_active: powerIcon_active.src,
                },
              ],
            },
            {
              id: QuestionIds.Priority,
              questionTopPart: "WHAT IS YOUR",
              questionBottomPart: "NUMBER 1 PRIORITY?",
              options: [
                {
                  id: OptionIds.RacePerformingStreet,
                  label: "Race Performing Street",
                  icon: raceIcon.src,
                  icon_active: raceIcon_active.src,
                },
                {
                  id: OptionIds.SmartCityRide,
                  label: "Smart City Ride",
                  icon: cityIcon.src,
                  icon_active: cityIcon_active.src,
                },
                {
                  id: OptionIds.FamilyRideInTheCity,
                  label: "Family Ride in the City",
                  icon: familyIcon.src,
                  icon_active: familyIcon_active.src,
                },
                {
                  id: OptionIds.AdventureRoadTrip,
                  label: "Adventure Road Trip",
                  icon: adventureIcon.src,
                  icon_active: adventureIcon_active.src,
                },
                {
                  id: OptionIds.SnowSeasonTour,
                  label: "Snow Season Tour",
                  icon: snowIcon.src,
                  icon_active: snowIcon_active.src,
                },
              ],
            },
          ],
        },
      },
    ],
  },
};
