import { apiClient } from "./apiClient";
import { ContactRequest, ContactResponse } from "../types/contact";
import { ApiResponse, ApiRequest } from "../types/api";
import { buildApiRequest } from "../utils/request";

/**
 * Enterprise service handling form submissions and communications with the contact system.
 */
export const contactService = {
  /**
   * Encapsulates and submits a contact message to the backend dispatcher system.
   * 
   * @param requestData - User's name, email, subject, and message.
   * @returns Resolves to a structured ApiResponse containing the ContactResponse details.
   */
  submitContact: async (requestData: ContactRequest): Promise<ApiResponse<ContactResponse>> => {
    // Build standard payload conforming to the spec: { route: "contact", data: { ... } }
    const envelope: ApiRequest<ContactRequest> = buildApiRequest("contact", requestData);

    // Send the structured request payload to the central router endpoint
    return apiClient.post<ContactResponse, ApiRequest<ContactRequest>>("/", envelope);
  },
};
export default contactService;
