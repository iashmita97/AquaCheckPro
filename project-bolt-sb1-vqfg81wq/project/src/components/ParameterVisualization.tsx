import React from 'react';
import { WaterQualityParameters } from '../types/waterQuality';
import { parameterInfo } from '../data/parameterInfo';

interface ParameterVisualizationProps {
  parameters: WaterQualityParameters;
}

const ParameterVisualization: React.FC<ParameterVisualizationProps> = ({ parameters }) => {
  const getParameterStatus = (key: string, value: number) => {
    const info = parameterInfo[key];
    if (!info) return 'unknown';
    
    // Simple heuristic based on typical safe ranges
    switch (key) {
      case 'ph':
        return value >= 6.5 && value <= 8.5 ? 'good' : 'warning';
      case 'hardness':
        return value <= 300 ? 'good' : 'warning';
      case 'solids':
        return value <= 500 ? 'good' : 'warning';
      case 'chloramines':
        return value <= 4 ? 'good' : 'warning';
      case 'sulfate':
        return value <= 250 ? 'good' : 'warning';
      case 'conductivity':
        return value >= 50 && value <= 1500 ? 'good' : 'warning';
      case 'organicCarbon':
        return value <= 4 ? 'good' : 'warning';
      case 'trihalomethanes':
        return value <= 80 ? 'good' : 'warning';
      case 'turbidity':
        return value <= 4 ? 'good' : 'warning';
      default:
        return 'unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-700';
      case 'warning':
        return 'text-yellow-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Parameter Analysis</h3>
      
      <div className="space-y-4">
        {Object.entries(parameters).map(([key, value]) => {
          const info = parameterInfo[key];
          const status = getParameterStatus(key, value);
          
          if (!info) return null;
          
          return (
            <div key={key} className="flex items-center justify-between p-4 bg-slate-50/80 rounded-xl border border-slate-100 hover:bg-slate-100/80 transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-700">{info.name}</span>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}></div>
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  Normal: {info.normalRange}
                </div>
              </div>
              
              <div className="text-right">
                <div className={`font-bold text-lg ${getStatusTextColor(status)}`}>
                  {value.toFixed(2)} {info.unit}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 flex items-center space-x-6 text-sm font-medium">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-slate-600">Within normal range</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-slate-600">Outside normal range</span>
        </div>
      </div>
    </div>
  );
};

export default ParameterVisualization;