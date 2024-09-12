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
  id?: number ;
  email: string;
  fullName?: string;
  nationality?: string;
  nationalID?: string;
  countryFlag?: string;
}

export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  extrasPrice: number;
  observations: string;
  guestId: number;
  cabinId: number;
  cabin: { name: string; image: string };
}

export interface Settings {
  minBookingLength: number;
  maxBookingLength: number;
}

export interface Country {
  name: string;
  flag: string;
}
