import { Locales } from "@apps/tire-test-experience/i18n-config";

import { contentConfig } from "./config/content-config";
import ComponentRenderer from "../../../../components/shared/component-renderer";

export default function Index({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locales;

  return (
    <ComponentRenderer
      locale={locale}
      components={contentConfig[locale].components}
    />
  );
}
