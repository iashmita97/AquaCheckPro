import React from 'react';
import { Info } from 'lucide-react';
import { ParameterInfo } from '../types/waterQuality';

interface ParameterInputProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  info: ParameterInfo;
  error?: string;
}

const ParameterInput: React.FC<ParameterInputProps> = ({
  id,
  value,
  onChange,
  info,
  error
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {info.name}
        </label>
        <div className="group relative">
          <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-cyan-600 transition-colors" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-xl border border-slate-600">
            <div className="font-medium">{info.description}</div>
            <div className="text-slate-300">Normal: {info.normalRange}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <input
          type="number"
          id={id}
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={info.min}
          max={info.max}
          step="0.01"
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
            error ? 'border-red-400 bg-red-50/80' : 'border-slate-300 hover:border-slate-400'
          }`}
          placeholder={`Enter ${info.name.toLowerCase()}`}
        />
        {info.unit && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm font-medium">
            {info.unit}
          </span>
        )}
      </div>
      
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      
      <div className="text-xs text-slate-500 font-medium">
        Normal range: {info.normalRange}
      </div>
    </div>
  );
};

export default ParameterInput;