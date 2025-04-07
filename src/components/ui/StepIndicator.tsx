interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center">
            <div 
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${step.number === currentStep 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-200 text-gray-600'}
              `}
            >
              {step.number}
            </div>
            <span className={`
              ml-2 text-sm
              ${step.number === currentStep ? 'text-gray-900' : 'text-gray-500'}
            `}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="mx-4 h-[1px] w-16 bg-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
}