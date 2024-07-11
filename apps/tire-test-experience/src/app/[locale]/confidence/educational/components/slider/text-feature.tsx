import {
  Heading,
  SharedSubText,
} from "../../../../../../../components/shared-text";

type FeatureComponentProps = {
  feature: { title: string; description: string };
  arrowIcon: string | undefined;
  arrowAlt?: string;
};

const FeatureComponent = ({
  feature,
  arrowIcon,
  arrowAlt,
}: FeatureComponentProps) => {
  return (
    <>
      {arrowIcon && (
        <img
          src={arrowIcon}
          alt={arrowAlt}
          className="active-feature-icon hidden md:block"
        />
      )}
      <Heading level="h4" size="h4">
        {feature.title}
      </Heading>
      <SharedSubText>{feature.description}</SharedSubText>
    </>
  );
};

export default FeatureComponent;
