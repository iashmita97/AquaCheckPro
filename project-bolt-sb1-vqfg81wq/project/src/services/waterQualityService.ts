import { WaterQualityParameters, ClassificationResult } from '../types/waterQuality';

// Mock ML model prediction - replace with actual API call
export const classifyWaterQuality = async (
  parameters: WaterQualityParameters
): Promise<ClassificationResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simple heuristic for demo purposes - replace with actual ML model API
  const score = calculatePotabilityScore(parameters);
  const prediction = score > 0.5 ? 'Potable' : 'Not Potable';
  const confidence = Math.abs(score - 0.5) * 2;
  
  return {
    prediction,
    confidence: Math.min(confidence + 0.7, 0.99), // Ensure reasonable confidence
    parameters,
    timestamp: new Date().toISOString()
  };
};

// Simple scoring algorithm for demo - replace with actual ML model
function calculatePotabilityScore(params: WaterQualityParameters): number {
  let score = 0.5; // Start neutral
  
  // pH scoring
  if (params.ph >= 6.5 && params.ph <= 8.5) {
    score += 0.1;
  } else {
    score -= 0.15;
  }
  
  // Hardness scoring
  if (params.hardness <= 300) {
    score += 0.05;
  } else {
    score -= 0.1;
  }
  
  // Solids scoring
  if (params.solids <= 500) {
    score += 0.1;
  } else {
    score -= 0.15;
  }
  
  // Chloramines scoring
  if (params.chloramines <= 4) {
    score += 0.05;
  } else {
    score -= 0.1;
  }
  
  // Sulfate scoring
  if (params.sulfate <= 250) {
    score += 0.05;
  } else {
    score -= 0.1;
  }
  
  // Conductivity scoring
  if (params.conductivity >= 50 && params.conductivity <= 1500) {
    score += 0.05;
  } else {
    score -= 0.1;
  }
  
  // Organic carbon scoring
  if (params.organicCarbon <= 4) {
    score += 0.05;
  } else {
    score -= 0.1;
  }
  
  // Trihalomethanes scoring
  if (params.trihalomethanes <= 80) {
    score += 0.05;
  } else {
    score -= 0.1;
  }
  
  // Turbidity scoring
  if (params.turbidity <= 4) {
    score += 0.05;
  } else {
    score -= 0.1;
  }
  
  return Math.max(0, Math.min(1, score));
}