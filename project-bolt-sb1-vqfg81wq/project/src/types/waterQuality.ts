export interface WaterQualityParameters {
  ph: number;
  hardness: number;
  solids: number;
  chloramines: number;
  sulfate: number;
  conductivity: number;
  organicCarbon: number;
  trihalomethanes: number;
  turbidity: number;
}

export interface ClassificationResult {
  prediction: 'Potable' | 'Not Potable';
  confidence: number;
  parameters: WaterQualityParameters;
  timestamp: string;
}

export interface ParameterInfo {
  name: string;
  unit: string;
  description: string;
  normalRange: string;
  min: number;
  max: number;
}