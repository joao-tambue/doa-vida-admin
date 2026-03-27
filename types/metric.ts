export type MetricVariant =
  | "hover-primary"
  | "accent-left"
  | "hover-tertiary";

export interface MetricCard {
  label: string;
  value: string;
  trendIcon: string;
  trendText: string;
  variant: MetricVariant;
}