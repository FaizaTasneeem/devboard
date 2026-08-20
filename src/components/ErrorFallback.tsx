import { useRouteError } from "react-router-dom";
import type { FallbackProps } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

export function ErrorFallback({ error: propError, resetErrorBoundary: propReset }: Partial<FallbackProps> = {}) {
    const routeError = useRouteError();
    const { reset } = useQueryErrorResetBoundary();

    const error = propError ?? routeError;
    const resetErrorBoundary = propReset ?? (() => {
        reset();
        window.location.reload();
    });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] text-white p-6 text-center">
            <h2 className="text-xl font-bold text-red-400 mb-2">Something went wrong — retry</h2>
            <p className="text-gray-400 text-sm mb-4">
                {error instanceof Error
                    ? error.message
                    : typeof error === "object" && error !== null && "data" in error
                        ? String((error as { data?: unknown }).data)
                        : typeof error === "object" && error !== null && "statusText" in error
                            ? String((error as { statusText?: unknown }).statusText)
                            : String(error ?? "An unexpected error occurred")}
            </p>
            <button
                onClick={resetErrorBoundary}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium cursor-pointer"
            >
                Retry
            </button>
        </div>
    );
}

