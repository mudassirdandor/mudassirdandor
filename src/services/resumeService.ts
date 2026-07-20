import { apiClient } from "./apiClient";
import { ResumeRequest, ResumeResponse } from "../types/resume";
import { ApiResponse, ApiRequest } from "../types/api";
import { buildApiRequest } from "../utils/request";
import { ASSETS } from "../config/assets";

/**
 * Service governing professional credentials and resume distribution operations.
 */
export const resumeService = {
  /**
   * Records a user download event with the backend metrics collector.
   * Conforms to standard route tracking structure.
   * 
   * @returns Resolves when the analytics registration completes.
   */
  trackDownload: async (): Promise<ApiResponse<ResumeResponse>> => {
    const requestData: ResumeRequest = {
      source: "Portfolio Website",
      page: typeof window !== "undefined" ? window.location.pathname : "/",
    };

    const envelope: ApiRequest<ResumeRequest> = buildApiRequest("resume", requestData);

    // Send the structured request payload to the central router endpoint
    return await apiClient.post<ResumeResponse, ApiRequest<ResumeRequest>>("/", envelope);
  },

  /**
   * Handles the registration with the backend first, then opens the configured local asset.
   * 
   * @returns Resolves when the analytics tracking and local tab delegation succeed.
   */
  downloadResume: async (): Promise<ApiResponse<ResumeResponse>> => {
    // 1. Call trackDownload to record analytics with the backend
    const apiResponse = await resumeService.trackDownload();

    // 2. After confirmation of successful logging, open the configured resume URL
    if (typeof window !== "undefined") {
      window.open(ASSETS.RESUME_URL, "_blank", "noopener,noreferrer");
    }

    return apiResponse;
  },
};

export default resumeService;
