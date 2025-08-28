import { ParameterInfo } from '../types/waterQuality';

export const parameterInfo: Record<string, ParameterInfo> = {
  ph: {
    name: 'pH Level',
    unit: '',
    description: 'Measure of acidity/alkalinity of water',
    normalRange: '6.5 - 8.5',
    min: 0,
    max: 14
  },
  hardness: {
    name: 'Hardness',
    unit: 'mg/L',
    description: 'Concentration of calcium and magnesium',
    normalRange: '60 - 120 mg/L',
    min: 0,
    max: 500
  },
  solids: {
    name: 'Total Dissolved Solids',
    unit: 'ppm',
    description: 'Total amount of dissolved substances',
    normalRange: '< 500 ppm',
    min: 0,
    max: 50000
  },
  chloramines: {
    name: 'Chloramines',
    unit: 'ppm',
    description: 'Disinfectant used in water treatment',
    normalRange: '< 4 ppm',
    min: 0,
    max: 15
  },
  sulfate: {
    name: 'Sulfate',
    unit: 'mg/L',
    description: 'Naturally occurring mineral',
    normalRange: '< 250 mg/L',
    min: 0,
    max: 1000
  },
  conductivity: {
    name: 'Conductivity',
    unit: 'μS/cm',
    description: 'Ability to conduct electrical current',
    normalRange: '50 - 1500 μS/cm',
    min: 0,
    max: 10000
  },
  organicCarbon: {
    name: 'Total Organic Carbon',
    unit: 'ppm',
    description: 'Amount of carbon in organic compounds',
    normalRange: '< 4 ppm',
    min: 0,
    max: 50
  },
  trihalomethanes: {
    name: 'Trihalomethanes',
    unit: 'μg/L',
    description: 'Chemical compounds formed during chlorination',
    normalRange: '< 80 μg/L',
    min: 0,
    max: 200
  },
  turbidity: {
    name: 'Turbidity',
    unit: 'NTU',
    description: 'Measure of water clarity',
    normalRange: '< 4 NTU',
    min: 0,
    max: 10
  }
};