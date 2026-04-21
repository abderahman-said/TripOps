import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

interface FeaturedProperty {
  id: number;
  name: string;
  type: {
    value: number;
    label: string;
  };
  city: {
    id: number;
    name: string;
  };
  cover: string;
}

interface FeaturedPropertiesResponse {
  status: boolean;
  message: string;
  data: {
    data: FeaturedProperty[];
  };
  errors: null;
}

interface FetchFeaturedParams {
  limit?: number | string;
  city_id?: number | string;
  type?: number | string;
}

async function fetchFeaturedProperties(params?: FetchFeaturedParams): Promise<FeaturedProperty[]> {
  try {
    const response = await axiosInstance.get<FeaturedPropertiesResponse>("/properties/featured", { params });
    
    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to fetch properties");
    }

    return response.data.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch properties");
  }
}

export function useFeaturedProperties(params?: FetchFeaturedParams) {
  return useQuery<FeaturedProperty[], Error>({
    queryKey: ["featured-properties", params],
    queryFn: () => fetchFeaturedProperties(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
