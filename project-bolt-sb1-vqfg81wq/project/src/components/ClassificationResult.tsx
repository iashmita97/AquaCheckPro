import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Shield, AlertOctagon } from 'lucide-react';
import { ClassificationResult as ClassificationResultType } from '../types/waterQuality';

interface ClassificationResultProps {
  result: ClassificationResultType | null;
  loading: boolean;
}

const ClassificationResult: React.FC<ClassificationResultProps> = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border border-slate-200">
        <div className="relative mx-auto mb-6 w-16 h-16">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent absolute top-0"></div>
        </div>
        <p className="text-slate-600 font-medium text-lg">Analyzing water quality...</p>
        <p className="text-slate-400 text-sm mt-2">Please wait while our AI processes the data</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border-2 border-dashed border-slate-300">
        <AlertTriangle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-600 font-medium text-lg">Ready for Analysis</p>
        <p className="text-slate-500 text-sm mt-2">Enter water quality parameters to get classification results</p>
      </div>
    );
  }

  const isPotable = result.prediction === 'Potable';
  
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 ${
      isPotable ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50' : 'border-red-200 bg-gradient-to-br from-red-50 to-orange-50'
    }`}>
      <div className="text-center mb-6">
        {isPotable ? (
          <div className="relative mx-auto mb-4 w-20 h-20">
            <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse opacity-20"></div>
            <Shield className="w-20 h-20 text-emerald-600 relative z-10" />
            <CheckCircle className="w-8 h-8 text-emerald-700 absolute bottom-0 right-0 bg-white rounded-full" />
          </div>
        ) : (
          <div className="relative mx-auto mb-4 w-20 h-20">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-20"></div>
            <AlertOctagon className="w-20 h-20 text-red-600 relative z-10" />
            <XCircle className="w-8 h-8 text-red-700 absolute bottom-0 right-0 bg-white rounded-full" />
          </div>
        )}
        
        <h3 className={`text-3xl font-bold mb-3 ${
          isPotable ? 'text-emerald-800' : 'text-red-800'
        }`}>
          Water is {result.prediction}
        </h3>
        
        <div className={`inline-flex items-center px-6 py-3 rounded-full text-base font-semibold shadow-lg ${
          isPotable 
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          Confidence: {(result.confidence * 100).toFixed(1)}%
        </div>
      </div>

      <div className={`p-6 rounded-xl border ${
        isPotable ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
      }`}>
        <p className={`text-base font-medium ${
          isPotable ? 'text-emerald-800' : 'text-red-800'
        }`}>
          {isPotable 
            ? '✓ This water sample meets potability standards and is safe for consumption.'
            : '⚠ This water sample does not meet potability standards. Treatment is recommended before consumption.'
          }
        </p>
      </div>

      <div className="mt-6 text-sm text-slate-500 text-center font-medium">
        Analysis completed at {new Date(result.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default ClassificationResult;