export interface PropertyType {
  value: number;
  label: string;
}

export interface City {
  id: number;
  name: string;
}

export interface Property {
  id: number;
  name: string;
  in_type: string;
  type: PropertyType;
  stars: number;
  city: City;
  address: string;
  map_url: string | null;
  check_in: string;
  check_out: string;
  meal_plans: { id: number; name: string }[];
  child_policy: string;
  description: string;
  map: {
    lat: number | null;
    lng: number | null;
    embed_url: string | null;
  };
  cover: string | null;
  gallery: string[];
}

export interface PropertiesResponse {
  status: boolean;
  message: string;
  data: {
    data: Property[];
  };
  errors: null;
}

export interface PropertyResponse {
  status: boolean;
  message: string;
  data: {
    data: Property;
  };
  errors: null;
}
