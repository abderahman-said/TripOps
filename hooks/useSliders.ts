import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export interface Slider {
  id: number;
  title: string | null;
  subtitle: string | null;
  link_url: string | null;
  button_label: string | null;
  image_url: string;
}

interface SlidersResponse {
  status: boolean;
  message: string;
  data: {
    data: Slider[];
  };
  errors: null;
}

async function fetchSliders(): Promise<Slider[]> {
  try {
    const response = await axiosInstance.get<SlidersResponse>("/sliders");

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to fetch sliders");
    }

    return response.data.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch sliders");
  }
}

export function useSliders() {
  return useQuery<Slider[], Error>({
    queryKey: ["sliders"],
    queryFn: fetchSliders,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });
}
