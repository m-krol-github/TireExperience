/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useId } from "react";

import { EduCards } from "@apps/tire-test-experience/src/app/[locale]/confidence/educational/components/edu-cards/edu-cards";
import EduHero from "@apps/tire-test-experience/src/app/[locale]/confidence/educational/components/edu-hero";
import Slider from "@apps/tire-test-experience/src/app/[locale]/confidence/educational/components/slider/slider";
import EduTutorial from "@apps/tire-test-experience/src/app/[locale]/confidence/educational/components/tutorial/tutorial";
import IntroHero from "@apps/tire-test-experience/src/app/[locale]/intro/components/intro-hero";
import IntroMap from "@apps/tire-test-experience/src/app/[locale]/menu-map/components/intro-map";
import ProfilingComponent from "@apps/tire-test-experience/src/app/[locale]/profiling/components/profiling";
import { SupportedComponents } from "@apps/tire-test-experience/src/app/types/content-config";

const ComponentRenderer = ({
  locale,
  components,
}: {
  locale?: string;
  components: SupportedComponents[] | SupportedComponents;
  uniqueKey?: string;
}) => {
  const uniqueKey = useId();

  if (Array.isArray(components)) {
    return (
      <>
        {components.map((component, index) => (
          <ComponentRenderer
            key={`${uniqueKey}-${component.type}-${index}`}
            locale={locale}
            components={component}
          />
        ))}
      </>
    );
  }

  switch (components.type) {
    case "EduHero": {
      return <EduHero {...components.props} />;
    }

    case "EduSlider": {
      return <Slider {...components.props} />;
    }

    case "EduTutorial": {
      return <EduTutorial {...components.props} />;
    }

    case "IntroHero": {
      return <IntroHero {...components.props} locale={locale} />;
    }

    case "IntroMap": {
      return <IntroMap {...components.props} locale={locale} />;
    }

    case "Profiling": {
      return <ProfilingComponent {...components.props} />;
    }

    case "EduCards": {
      return <EduCards {...components.props} />;
    }

    default: {
      // eslint-disable-next-line no-console
      console.error(
        `Component of type ${(components as any).type} is not registered.`
      );

      return null;
    }
  }
};

export default ComponentRenderer;
