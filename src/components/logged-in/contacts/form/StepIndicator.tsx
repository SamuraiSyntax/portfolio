interface StepIndicatorProps {
  steps: { id: number; title: string }[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function StepIndicator({
  steps,
  currentStep,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step) => (
        <button
          key={step.id}
          onClick={() => onStepClick(step.id)}
          className={`flex flex-col items-center group ${
            currentStep >= step.id ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors ${
              currentStep >= step.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            {step.id}
          </div>
          <span className="text-xs font-medium">{step.title}</span>
          {step.id < steps.length && (
            <div
              className={`h-0.5 w-[100px] mt-4 ${
                currentStep > step.id ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </button>
      ))}
    </div>
  );
}
