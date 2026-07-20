import { useState, useCallback } from "react";
import { ContactFormFields, ContactRequest, ContactResponse } from "../types/contact";
import { ApiError } from "../types/api";
import { contactService } from "../services/contactService";
import { formatApiError } from "../utils/error";

/**
 * High-fidelity React custom hook to manage states of the Contact Form workflow.
 * Encapsulates asynchronous execution lifecycles and error standardizations.
 */
export function useContactForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [response, setResponse] = useState<ContactResponse | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);

  /**
   * Reverts all state variables to pristine default values.
   */
  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
    setResponse(null);
    setRequestId(null);
  }, []);

  /**
   * Submits contact details, transitioning the internal hook states gracefully.
   * Handles errors through client-side formats automatically.
   * 
   * @param formFields - The user's visible form inputs.
   */
  const submit = useCallback(async (formFields: ContactFormFields): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    setResponse(null);
    setRequestId(null);

    // Automatically enrich payload with request metadata
    const requestPayload: ContactRequest = {
      ...formFields,
      source: "Portfolio Website",
      page: typeof window !== "undefined" ? window.location.pathname : "/",
    };

    try {
      const apiResponse = await contactService.submitContact(requestPayload);
      
      setResponse(apiResponse.data);
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
    response,
    requestId,
    submit,
    reset,
  };
}

export default useContactForm;
