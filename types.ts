
export interface ProductCardProps {
  title: string;
  description: string;
  target: string;
  decision: string;
  sampleJson: object;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface RiskIndicatorProps {
  score: number;
  label: string;
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}
