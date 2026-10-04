import "react";

declare module "react" {
  // Lets `style={{ "--sidebar-width": "18rem" }}` type-check without a cast.
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- merging into React's interface requires `interface`
  interface CSSProperties {
    [customProperty: `--${string}`]: string | number | undefined;
  }
}
