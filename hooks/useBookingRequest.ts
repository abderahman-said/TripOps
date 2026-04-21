import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Child {
  age: number;
}

interface BookingRequestData {
  property_id: number;
  check_in: string;
  check_out: string;
  adults: number;
  children: Child[];
  transport_seats: number;
  name: string;
  phone: string;
  pickup_location: string;
  note: string;
}

async function createBookingRequest(data: BookingRequestData) {
  const response = await axiosInstance.post("/booking-requests", data);
  return response.data;
}

export function useBookingRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBookingRequest,
    onSuccess: (data) => {
      console.log('Booking request submitted successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['booking-requests'] });
    },
    onError: (error) => {
      console.error('Error submitting booking request:', error);
    },
  });
}