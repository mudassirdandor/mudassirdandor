import { ApiRequest } from "../types/api";

/**
 * Constructs a standardized API request envelope mapping a route code and raw data structure.
 * 
 * @param route - The route identifier required by the backend dispatcher.
 * @param data - The request-specific payload parameters.
 * @returns A structured ApiRequest object.
 */
export function buildApiRequest<T>(route: string, data: T): ApiRequest<T> {
  return {
    route,
    data,
  };
}
