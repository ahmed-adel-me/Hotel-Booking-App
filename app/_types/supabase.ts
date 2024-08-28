// types/supabase.ts

export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export interface Guest {
  id: number;
  name: string;
  email: string;
}

export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  cabin: Cabin;
}

export interface Settings {
  // Define the fields according to your settings structure
}

export interface Country {
  name: string;
  flag: string;
}
