/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.svg" {
  const component: React.FC<React.SVGProps<SVGSVGElement>>;

  export default component;
}
