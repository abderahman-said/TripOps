import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export interface City {
  id: number;
  name: string;
}

interface CitiesResponse {
  status: boolean;
  message: string;
  data: {
    data: City[];
  };
  errors: null;
}

async function fetchCities(): Promise<City[]> {
  try {
    const response = await axiosInstance.get<CitiesResponse>("/cities");
    
    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to fetch cities");
    }

    return response.data.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch cities");
  }
}

export function useCities() {
  return useQuery<City[], Error>({
    queryKey: ["cities"],
    queryFn: fetchCities,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });
}
