export type NavigationItem = {
  readonly title: string;
  readonly href?: string;
  readonly icon?: JSX.Element;
  children?: NavigationItem[];
};
