import { useQuery } from "@tanstack/react-query";
import { Property, PropertyResponse } from "@/types/properties";
import { axiosInstance } from "@/lib/axios";

async function fetchProperty(id: string | number): Promise<Property> {
  try {
    const response = await axiosInstance.get<PropertyResponse>(`/properties/${id}`);
    
    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to fetch property");
    }

    return response.data.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch property");
  }
}

export function useProperty(id: string | number) {
  return useQuery<Property, Error>({
    queryKey: ["property", id],
    queryFn: () => fetchProperty(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
