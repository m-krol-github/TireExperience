import backgroundAfterBanner from "@apps/tire-test-experience/public/images/background_after_banner.png";
import backgroundAfterBannerLg from "@apps/tire-test-experience/public/images/background_after_banner_lg.png";
import close_icon from "@apps/tire-test-experience/public/images/educational/tutorial/close_icon.svg";
import placeholderImg from "@apps/tire-test-experience/public/images/educational/tutorial/placeholderVideo.png";
import play_icon from "@apps/tire-test-experience/public/images/educational/tutorial/play_icon.svg";
import arrow_right from "@apps/tire-test-experience/public/images/educational/tutorial/right_arrow_icon.svg";
import feature_1_Unselected from "@apps/tire-test-experience/public/images/intro/slider/01_Unselected.svg";
import feature_2_Unselected from "@apps/tire-test-experience/public/images/intro/slider/02_Unselected.svg";
import feature_3_Unselected from "@apps/tire-test-experience/public/images/intro/slider/03_Unselected.svg";
import arrow_down from "@apps/tire-test-experience/public/images/intro/slider/arrow_down.png";
import tireBanner from "@apps/tire-test-experience/public/images/tire_banner.png";
import tireBannerMobile from "@apps/tire-test-experience/public/images/tire_banner_mobile.png";
import buttonSvg from "@apps/tire-test-experience/public/svg/button.svg";
import cargoSvg from "@apps/tire-test-experience/public/svg/cargo.svg";
import hornSvg from "@apps/tire-test-experience/public/svg/horn.svg";
import obstaclesSvg from "@apps/tire-test-experience/public/svg/obstacles.svg";
import passingSvg from "@apps/tire-test-experience/public/svg/passing.svg";
import speedSvg from "@apps/tire-test-experience/public/svg/speed.svg";
import windowsSvg from "@apps/tire-test-experience/public/svg/windows.svg";
import { ContentConfig } from "@apps/tire-test-experience/src/app/types/content-config";

export const contentConfig: ContentConfig = {
  "en-US": {
    components: [
      {
        type: "EduHero",
        props: {
          title: "CONFIDENCE",
          subtitle: "CROSSCLIMATE",
          paragraphText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          backgroundImage: backgroundAfterBanner,
          backgroundImageLg: backgroundAfterBannerLg,
          buttonImage: buttonSvg,
          mainImage: tireBanner,
          mainImageMobile: tireBannerMobile,
          backgroundImageAlt: "Background after banner",
          buttonImageAlt: "Scroll button",
          mainImageAlt: "Tire banner",
        },
      },
      {
        type: "EduSlider",
        props: {
          slides: [
            {
              title: "WET GRIP YOU CAN COUNT ON",
              subtitle: "V-SHAPED SCULPTURE",
              videoSrc:
                "https://virtualtour.gruppoa2a.it/assets/Rotore-Desk.e7be6533.webm",
              videoSafariSrc:
                "https://virtualtour.gruppoa2a.it/assets/Rotore-Desk.e7be6533.webm",
              featureImages: [
                { src: feature_1_Unselected.src, alt: "Feature Image 1" },
                { src: feature_2_Unselected.src, alt: "Feature Image 2" },
                { src: feature_3_Unselected.src, alt: "Feature Image 3" },
              ],
              mainText:
                "Offering increased resistance to hydroplaning and balanced handling even in snow, ice and wet conditions, a V-Shape Sculpture tread design on the center contact point of the tire skillfully expels water, channeling it safely away, for driver confidence.",
              subText:
                "*Reducing the risk of hydroplaning, a V-Shape Sculpture tread design expels water away from the tire, keeping you in control of the drive, in rain and snow",
              features: [
                { title: "Feature 1", description: "Lorem ipsum..." },
                { title: "Feature 2", description: "Lorem ipsum..." },
                { title: "Feature 3", description: "Lorem ipsum..." },
              ],
              featuresArrowIcon: arrow_down.src,
              featuresArrowIconAlt: "Arrow down",
              slideIndex: 0,
            },
            {
              title: "ADVANCED ALL-WEATHER HANDLING",
              subtitle: "Thermal Adaptive Tread Compound​",
              videoSrc:
                "https://virtualtour.gruppoa2a.it/assets/Rotore-Desk.e7be6533.webm",
              videoSafariSrc:
                "https://virtualtour.gruppoa2a.it/assets/Rotore-Desk.e7be6533.webm",
              featureImages: [],
              circleAroundFeatureIcon: "",
              mainText:
                "Delivering better grip in dry, wet or snowy weather, a new generation Thermal Adaptive Tread Compound helps the tire seamlessly adapt to changing road temperatures.",
              subText:
                "*Adapting to ever-changing road temperatures, the Thermal Adaptive Tread Compound keeps you safe whatever the weather",
              features: [],
              featuresArrowIcon: "",
              featuresArrowIconAlt: "",
              slideIndex: 1,
            },
            {
              title: "A quieter driving experience",
              subtitle: "Piano Acoustic Tuning​",
              videoSrc:
                "https://virtualtour.gruppoa2a.it/assets/Rotore-Desk.e7be6533.webm",
              videoSafariSrc:
                "https://virtualtour.gruppoa2a.it/assets/Rotore-Desk.e7be6533.webm",
              featureImages: [],
              circleAroundFeatureIcon: "",
              mainText:
                "Tire tread noise is minimized on both new and worn tires due to unique Piano Acoustic Tuning technology and computer modeling simulation, which helps expertly design the block sizes and specific tire angle placement, delivering a near silent ride for your ultimate driving pleasure. ",
              readMore:
                "MICHELIN® Acoustic Technology significantly reduces interior noise MICHELIN® Acoustic Technology effectively reduces vibrations caused by the road resulting in a significant reduction of interior noise by approximately 20%*. A custom designed polyurethane foam solution muffles noise resonance which allows the drivers and passengers to benefit fully from hands-free communication devices while lessening driver fatigue on long drives. MAT even dampens interior noise when driving on changing road conditions.",
              subText:
                "*Minimizing tread noise, Piano Acoustic Tuning delivers a near silent driving experience, even when the tire is worn",
              features: [],
              featuresArrowIcon: "",
              featuresArrowIconAlt: "",
              slideIndex: 2,
            },
          ],
        },
      },
      {
        type: "EduCards",
        props: {
          title: "CONFIDENCE",
          subtitle: "EDUCATIONAL SECTION",
          headingColor: "yellow",
          modalA11yProps: {
            closeButtonA11yLabel: "Close 55",
            closeImgAlt: "Close Icon33",
          },
          cards: [
            {
              title: "SPEED",
              icon: speedSvg,
              isModal: true,
              description:
                "Keep an eye out for obstacles or debris being blown on to the road. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis justo ut odio tempus posuere. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque euismod consectetur enim ac semper. ",
            },
            {
              title: "WINDOWS",
              icon: windowsSvg,
              isModal: true,
              description:
                "Keep an eye out for obstacles or debris being blown on to the road. Keep an eye out for obstacles or debris being blown on to the road.",
            },
            {
              title: "OBSTACLES",
              icon: obstaclesSvg,
              description:
                "Keep an eye out for obstacles or debris being blown on to the road. Keep an eye out for obstacles or debris being blown on to the road.",
            },
            {
              title: "HORN",
              icon: hornSvg,
              description:
                "Keep an eye out for obstacles or debris being blown on to the road. Keep an eye out for obstacles or debris being blown on to the road.",
            },
            {
              title: "CARGO",
              icon: cargoSvg,
              description:
                "Keep an eye out for obstacles or debris being blown on to the road. Keep an eye out for obstacles or debris being blown on to the road.",
            },
            {
              title: "PASSING",
              icon: passingSvg,
              description:
                "Keep an eye out for obstacles or debris being blown on to the road. Keep an eye out for obstacles or debris being blown on to the road.",
            },
          ],
        },
      },
      {
        type: "EduTutorial",
        props: {
          title: `How to drive safer in
           extreme conditions:`,
          subtitle: "TUTORIAL",
          playIcon: play_icon.src,
          arrowIcon: arrow_right.src,
          closeIcon: close_icon.src,
          videos: [
            {
              id: "1",
              src: "https://virtualtour.gruppoa2a.it/assets/Rotore-Desk.e7be6533.webm",
              placeholderImgSrc: placeholderImg.src,
              placeholderImgAlt: "Placeholder Image",
              customText: "HIGH SPEED",
            },
            {
              id: "2",
              src: "https://virtualtour.gruppoa2a.it/assets/Rotore-Desk.e7be6533.webm",
              placeholderImgSrc: placeholderImg.src,
              placeholderImgAlt: "Placeholder Image",
              customText: "WINDING ROADS",
            },
            {
              id: "3",
              src: "https://virtualtour.gruppoa2a.it/assets/Rotore-Desk.e7be6533.webm",
              placeholderImgSrc: placeholderImg.src,
              placeholderImgAlt: "Placeholder Image",
              customText: "WET ROAD",
            },
            {
              id: "4",
              src: "https://virtualtour.gruppoa2a.it/assets/Rotore-Desk.e7be6533.webm",
              placeholderImgSrc: placeholderImg.src,
              placeholderImgAlt: "Placeholder Image",
              customText: "DRY ROAD",
            },
            {
              id: "5",
              src: "https://virtualtour.gruppoa2a.it/assets/Rotore-Desk.e7be6533.webm",
              placeholderImgSrc: placeholderImg.src,
              placeholderImgAlt: "Placeholder Image",
              customText: "HIGH SPEED",
            },
            {
              id: "6",
              src: "https://virtualtour.gruppoa2a.it/assets/Rotore-Desk.e7be6533.webm",
              placeholderImgSrc: placeholderImg.src,
              placeholderImgAlt: "Placeholder Image",
              customText: "WET ROAD",
            },
          ],
        },
      },
    ],
  },
};
