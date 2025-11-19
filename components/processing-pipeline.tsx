'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface ProcessingPipelineProps {
  isProcessing: boolean;
  onProcess: () => void;
}

export default function ProcessingPipeline({
  isProcessing,
  onProcess,
}: ProcessingPipelineProps) {
  const steps = [
    {
      id: 'bg-removal',
      title: 'Background Removal',
      description: 'Remove background using AI',
      icon: '🎯',
    },
    {
      id: 'enhancement',
      title: 'Image Enhancement',
      description: 'Enhance colors and clarity',
      icon: '✨',
    },
    {
      id: 'listing',
      title: 'Generate Listing',
      description: 'Create product information',
      icon: '📝',
    },
    {
      id: 'poster',
      title: 'Create Poster',
      description: 'Generate shareable product poster',
      icon: '🎨',
    },
  ];

  const getStepStatus = (stepIndex: number) => {
    if (isProcessing && stepIndex === 0) return 'processing';
    if (stepIndex === 0) return 'pending';
    return 'pending';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-300">Processing Steps</h3>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <div key={step.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  status === 'processing'
                    ? 'bg-orange-500/20 border border-orange-400'
                    : 'bg-slate-700 border border-slate-600'
                }`}>
                  {status === 'processing' ? (
                    <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />
                  ) : (
                    <span className="text-lg">{step.icon}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-12 bg-slate-700 my-1" />
                )}
              </div>

              <Card className="flex-1 p-4 border-slate-700 bg-slate-800/50">
                <h4 className="font-semibold text-white">{step.title}</h4>
                <p className="text-sm text-slate-400">{step.description}</p>
              </Card>
            </div>
          );
        })}
      </div>

      <Button
        onClick={onProcess}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 mt-6"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          'Start Processing'
        )}
      </Button>
    </div>
  );
}
