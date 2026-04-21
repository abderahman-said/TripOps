import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export interface SiteSettings {
  name: string;
  logo: string;
  favicon: string;
  phone: string;
  about_us: string;
  whatsapp: string;
  contact: {
    phones: string[];
    whatsapp: string[];
    email: string | null;
  };
  social_media: {
    facebook: string;
    instagram: string;
    tiktok: string;
    x: string;
    snapchat: string;
  };
}

interface SettingsResponse {
  status: boolean;
  message: string;
  data: {
    data: SiteSettings;
  };
  errors: null;
}

async function fetchSettings(): Promise<SiteSettings> {
  try {
    const response = await axiosInstance.get<SettingsResponse>("/content/settings");
    
    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to fetch settings");
    }

    return response.data.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch settings");
  }
}

export function useSiteSettings() {
  return useQuery<SiteSettings, Error>({
    queryKey: ["site-settings"],
    queryFn: fetchSettings,
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
  });
}
