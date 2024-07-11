import backgroundAfterBanner from "@apps/tire-test-experience/public/images/background_after_banner.png";
import backgroundAfterBannerLg from "@apps/tire-test-experience/public/images/background_after_banner_lg.png";
import confidenceThumbnail from "@apps/tire-test-experience/public/images/map/highlight-card-confidence.png";
import efficiencyThumbnail from "@apps/tire-test-experience/public/images/map/highlight-card-efficiency.png";
import longevityThumbnail from "@apps/tire-test-experience/public/images/map/highlight-card-longevity.png";
import sportThumbnail from "@apps/tire-test-experience/public/images/map/highlight-card-sport.png";
import winterThumbnail from "@apps/tire-test-experience/public/images/map/highlight-card-winter.png";
import highlightConfidence from "@apps/tire-test-experience/public/images/map/highlight-confidence.png";
import highlightEfficiency from "@apps/tire-test-experience/public/images/map/highlight-efficiency.png";
import highlightLongevity from "@apps/tire-test-experience/public/images/map/highlight-longevity.png";
import highlightSport from "@apps/tire-test-experience/public/images/map/highlight-sport.png";
import highlightWinter from "@apps/tire-test-experience/public/images/map/highlight-winter.png";
import wholeMap from "@apps/tire-test-experience/public/images/map/map.png";

import { ContentConfig } from "../../../types/content-config";

export const contentConfig: ContentConfig = {
  "en-US": {
    components: [
      {
        type: "IntroMap",
        props: {
          title: "Tire test",
          mainImage: wholeMap,
          mainImageAlt: "Map of games",
          backgroundImage: backgroundAfterBanner,
          backgroundImageLg: backgroundAfterBannerLg,
          backgroundImageAlt: "Map",
          games: [
            {
              title: "winter game",
              slug: "winter",
              mainImage: highlightWinter,
              mainImageAlt: "Highlight winter game",
              gameThumbnail: winterThumbnail,
              gameThumbnailAlt: "Winter game thumbnail",
              bottom: "-70vw",
              left: "-20vw",
              mobileBottom: "-10%",
              mobileLeft: "-50vw",
              buttonsPosition: "center",
              coords: [522, 660, 946, 431, 1371, 657, 963, 916],
            },
            {
              title: "confidence game",
              slug: "confidence",
              mainImage: highlightConfidence,
              mainImageAlt: "Highlight confidence game",
              gameThumbnail: confidenceThumbnail,
              gameThumbnailAlt: "Confidence game thumbnail",
              bottom: "-60vw",
              left: "-50vw",
              mobileBottom: "-15%",
              mobileLeft: "-93vw",
              buttonsPosition: "center",
              coords: [961, 911, 1373, 650, 1694, 803, 1655, 1008],
            },
            {
              title: "efficiency game",
              slug: "efficiency",
              mainImage: highlightEfficiency,
              mainImageAlt: "Highlight efficiency game",
              gameThumbnail: efficiencyThumbnail,
              gameThumbnailAlt: "Efficiency game thumbnail",
              bottom: "-42vw",
              left: "-65vw",
              mobileBottom: "-10%",
              mobileLeft: "-95vw",
              buttonsPosition: "right",
              coords: [963, 913, 1653, 1006, 1409, 1178, 976, 1242],
            },
            {
              title: "longevity game",
              slug: "longevity",
              mainImage: highlightLongevity,
              mainImageAlt: "Highlight longevity game",
              gameThumbnail: longevityThumbnail,
              gameThumbnailAlt: "Longevity game thumbnail",
              bottom: "-40vw",
              left: "20vw",
              mobileBottom: "-10%",
              mobileLeft: "-10vw",
              buttonsPosition: "left",
              coords: [957, 918, 973, 1242, 581, 1191, 272, 1021],
            },
            {
              title: "sport game",
              slug: "sport",
              mainImage: highlightSport,
              mainImageAlt: "Highlight sport game",
              gameThumbnail: sportThumbnail,
              gameThumbnailAlt: "Sport game thumbnail",
              bottom: "-60vw",
              left: "7vw",
              mobileBottom: "-15%",
              mobileLeft: "-15vw",
              buttonsPosition: "center",
              coords: [954, 911, 274, 1016, 216, 826, 520, 653],
            },
          ],
        },
      },
    ],
  },
};
