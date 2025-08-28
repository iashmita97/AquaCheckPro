import React, { useState } from 'react';
import Header from './components/Header';
import ParameterInput from './components/ParameterInput';
import ClassificationResult from './components/ClassificationResult';
import ParameterVisualization from './components/ParameterVisualization';
import { WaterQualityParameters, ClassificationResult as Result } from './types/waterQuality';
import { parameterInfo } from './data/parameterInfo';
import { classifyWaterQuality } from './services/waterQualityService';
import { Beaker, BarChart3, Sparkles, RefreshCw } from 'lucide-react';

function App() {
  const [parameters, setParameters] = useState<WaterQualityParameters>({
    ph: 7.0,
    hardness: 200,
    solids: 300,
    chloramines: 2.0,
    sulfate: 150,
    conductivity: 400,
    organicCarbon: 3.0,
    trihalomethanes: 50,
    turbidity: 2.0
  });

  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateParameter = (key: keyof WaterQualityParameters, value: number) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Clear error for this field
    if (errors[key]) {
      setErrors(prev => ({
        ...prev,
        [key]: ''
      }));
    }
  };

  const validateParameters = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(parameters).forEach(([key, value]) => {
      const info = parameterInfo[key];
      if (info) {
        if (value < info.min || value > info.max) {
          newErrors[key] = `Value must be between ${info.min} and ${info.max}`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClassify = async () => {
    if (!validateParameters()) {
      return;
    }
    
    setLoading(true);
    try {
      const classification = await classifyWaterQuality(parameters);
      setResult(classification);
    } catch (error) {
      console.error('Classification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setParameters({
      ph: 7.0,
      hardness: 200,
      solids: 300,
      chloramines: 2.0,
      sulfate: 150,
      conductivity: 400,
      organicCarbon: 3.0,
      trihalomethanes: 50,
      turbidity: 2.0
    });
    setResult(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>
      
      <Header />
      
      <main className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-200">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
                  <Beaker className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Water Quality Parameters</h2>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(parameterInfo).map(([key, info]) => (
                  <ParameterInput
                    key={key}
                    id={key}
                    value={parameters[key as keyof WaterQualityParameters]}
                    onChange={(value) => updateParameter(key as keyof WaterQualityParameters, value)}
                    info={info}
                    error={errors[key]}
                  />
                ))}
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={handleClassify}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span className="text-lg">Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Beaker className="w-5 h-5" />
                      <span className="text-lg">Classify Water Quality</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={resetForm}
                  className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
            
            {/* Parameter Visualization */}
            <div className="lg:hidden">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Parameter Analysis</h2>
              </div>
              <ParameterVisualization parameters={parameters} />
            </div>
          </div>
          
          {/* Results Section */}
          <div className="space-y-6">
            <ClassificationResult result={result} loading={loading} />
            
            {/* Parameter Visualization - Desktop */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Parameter Analysis</h2>
              </div>
              <ParameterVisualization parameters={parameters} />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-16 text-center text-slate-600 relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-200">
            <p className="text-base font-medium">
              This tool uses machine learning to classify water potability based on key quality parameters.
              <br />
              <span className="text-sm text-slate-500 font-normal">
                For production use, integrate with your trained ML model API endpoint.
              </span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;