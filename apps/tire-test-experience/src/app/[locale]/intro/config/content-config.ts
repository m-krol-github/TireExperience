import backgroundAfterBanner from "@apps/tire-test-experience/public/images/background_after_banner.png";
import backgroundAfterBannerLg from "@apps/tire-test-experience/public/images/background_after_banner_lg.png";

import { ContentConfig } from "../../../types/content-config";

export const contentConfig: ContentConfig = {
  "en-US": {
    components: [
      {
        type: "IntroHero",
        props: {
          title: "TEST",
          subtitle: "Michelin presents",
          backgroundImage: backgroundAfterBanner,
          backgroundImageLg: backgroundAfterBannerLg,
          backgroundImageAlt: "Background after banner",
          buttonText: "Enter",
          beforeTitle: "the",
          afterTitle: "experience",
        },
      },
    ],
  },
};
