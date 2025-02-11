interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function StepIndicator({
  currentStep,
  totalSteps,
  labels,
}: StepIndicatorProps) {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between mb-2">
        {labels.map((label, index) => (
          <div
            key={index}
            className={`text-sm ${
              index + 1 === currentStep
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="absolute h-2 bg-muted w-full rounded-full" />
        <div
          className="absolute h-2 bg-primary rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}
