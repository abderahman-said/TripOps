import { useQuery } from "@tanstack/react-query";
import { Property, PropertiesResponse } from "@/types/properties";
import { axiosInstance } from "@/lib/axios";

interface FetchPropertiesParams {
  city_id?: number | string;
}

async function fetchProperties(params?: FetchPropertiesParams): Promise<Property[]> {
  // Filter out null values
  const filteredParams = Object.fromEntries(
    Object.entries(params || {}).filter(([_, v]) => v != null)
  );
  try {
    const response = await axiosInstance.get<PropertiesResponse>("/properties", { params });
    
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

export function useProperties(params?: FetchPropertiesParams) {
  return useQuery<Property[], Error>({
    queryKey: ["properties", params],
    queryFn: () => fetchProperties(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
