import { useState, useCallback } from "react";
import { ApiError } from "../types/api";
import { resumeService } from "../services/resumeService";
import { formatApiError } from "../utils/error";

/**
 * High-fidelity React custom hook to manage states of the Resume Download workflow.
 * Encapsulates asynchronous execution lifecycles and error standardizations.
 */
export function useResumeDownload() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  /**
   * Reverts all state variables to pristine default values.
   */
  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
    setRequestId(null);
  }, []);

  /**
   * Triggers the resume download flow, logging event metadata and initiating download.
   */
  const download = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    setRequestId(null);

    try {
      const apiResponse = await resumeService.downloadResume();
      
      setRequestId(apiResponse.requestId || null);
      setIsSuccess(true);
    } catch (caughtError) {
      const standardizedError = formatApiError(caughtError);
      
      setError(standardizedError);
      setRequestId(standardizedError.requestId || null);
      setIsSuccess(false);
      
      // Re-throw standardized error so invoking components can register local exceptions if desired
      throw standardizedError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    isSuccess,
    requestId,
    download,
    reset,
  };
}

export default useResumeDownload;
