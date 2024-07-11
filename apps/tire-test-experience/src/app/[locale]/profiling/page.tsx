import React from "react";

import ComponentRenderer from "@apps/tire-test-experience/components/shared/component-renderer";
import { Locales } from "@apps/tire-test-experience/i18n-config";

import { contentConfig } from "./config/content-config";

export default function Index({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locales;

  return <ComponentRenderer components={contentConfig[locale].components} />;
}
