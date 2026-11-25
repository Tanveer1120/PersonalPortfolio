import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { step: 1, title: 'Personal Information', desc: 'Contact & intro' },
  { step: 2, title: 'Education', desc: 'Degrees & institutions' },
  { step: 3, title: 'Skills & Projects', desc: 'Tech stack & works' },
  { step: 4, title: 'Experience & Final Details', desc: 'Roles & certifications' },
];

export default function StepIndicator({ currentStep, onStepClick, maxStepVisited }) {
  return (
    <div className="w-full bg-white border-b border-borderLight py-4 px-4 sm:px-6 mb-8">
      <div className="max-w-4xl mx-auto">
        {/* Mobile View */}
        <div className="sm:hidden flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            Step {currentStep} of 4
          </span>
          <span className="text-xs font-bold text-navy-900">
            {STEPS[currentStep - 1].title}
          </span>
        </div>
        <div className="sm:hidden w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-accent h-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Desktop View */}
        <div className="hidden sm:grid grid-cols-4 gap-4">
          {STEPS.map((s) => {
            const isCompleted = s.step < currentStep;
            const isCurrent = s.step === currentStep;
            const canClick = s.step <= maxStepVisited;

            return (
              <button
                key={s.step}
                type="button"
                disabled={!canClick}
                onClick={() => canClick && onStepClick(s.step)}
                className={`text-left group transition-all flex items-center gap-3 p-2 rounded-lg ${
                  isCurrent
                    ? 'bg-blue-50/70 border border-blue-200'
                    : canClick
                    ? 'hover:bg-slate-50 cursor-pointer'
                    : 'cursor-not-allowed opacity-60'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-navy-900 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.step}
                </div>
                <div className="min-w-0">
                  <div
                    className={`text-xs font-bold truncate ${
                      isCurrent ? 'text-navy-900' : 'text-textMain'
                    }`}
                  >
                    {s.title}
                  </div>
                  <div className="text-[11px] text-textSecondary truncate">
                    {s.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
