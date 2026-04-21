import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export interface Review {
  id: number;
  type: number; // 1: Text, 2: Image, 3: Video
  customer_name: string;
  text: string | null;
  media_url: string | null;
}

interface ReviewsResponse {
  status: boolean;
  message: string;
  data: {
    data: Review[];
  };
  errors: null;
}

async function fetchReviews(): Promise<Review[]> {
  try {
    const response = await axiosInstance.get<ReviewsResponse>("/reviews");
    
    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to fetch reviews");
    }

    return response.data.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch reviews");
  }
}

export function useReviews() {
  return useQuery<Review[], Error>({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}
