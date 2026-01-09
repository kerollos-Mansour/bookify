import { ChevronRight } from "lucide-react";

interface BreadcrumbStep {
  label: string;
  status: "completed" | "active" | "upcoming";
}

interface BreadcrumbNavigationProps {
  currentStep: "departing" | "returning" | "review";
  isRoundTrip: boolean;
}

export function BreadcrumbNavigation({
  currentStep,
  isRoundTrip,
}: BreadcrumbNavigationProps) {
  const getSteps = (): BreadcrumbStep[] => {
    const steps: BreadcrumbStep[] = [
      {
        label: "Choose departing flight",
        status:
          currentStep === "departing"
            ? "active"
            : currentStep === "returning" || currentStep === "review"
            ? "completed"
            : "upcoming",
      },
    ];

    if (isRoundTrip) {
      steps.push({
        label: "Choose returning flight",
        status:
          currentStep === "returning"
            ? "active"
            : currentStep === "review"
            ? "completed"
            : "upcoming",
      });
    }

    steps.push({
      label: "Review your trip",
      status: currentStep === "review" ? "active" : "upcoming",
    });

    return steps;
  };

  const steps = getSteps();

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-center">
          <ol className="flex items-center space-x-2 sm:space-x-4">
            {steps.map((step, index) => (
              <li key={step.label} className="flex items-center">
                <div
                  className={`flex items-center ${
                    step.status === "active"
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : step.status === "completed"
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  {/* Step Number/Icon */}
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium ${
                      step.status === "active"
                        ? "border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : step.status === "completed"
                        ? "border-green-600 dark:border-green-400 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </span>

                  {/* Step Label */}
                  <span className="ml-2 text-sm sm:text-base hidden sm:inline">
                    {step.label}
                  </span>
                </div>

                {/* Separator */}
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 mx-2 sm:mx-4 text-gray-400 dark:text-gray-600" />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
