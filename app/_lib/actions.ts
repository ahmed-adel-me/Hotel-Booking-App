"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBooking, getBookings, getCabin } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID")?.toString();
  if (!nationalID) {
    throw new Error("National ID is required");
  }

  const nationalIDPattern = /^[a-zA-Z0-9]{6,12}$/;
  if (!nationalIDPattern.test(nationalID)) {
    throw new Error(
      "National ID must be alphanumeric and between 6 and 12 characters"
    );
  }

  const nationalityValue = formData.get("nationality")?.toString() || "";
  const [nationality, countryFlag] = nationalityValue.split("%");

  const updateData = { nationalID, nationality, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this Booking");
  }
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData: FormData) {
  const bookingId = formData.get("bookingId")?.toString();
  if (!bookingId) throw new Error("bookingId doesn't exist");
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(+bookingId)) {
    throw new Error("You are not allowed to delete this Booking");
  }

  const reservation = await getBooking(bookingId);
  const cabin = await getCabin(reservation?.cabinId);
  if (!cabin || !reservation) throw new Error("reservation doesn't exist");
  const numGuests = +formData.get("numGuests")?.toString()!;
  const cabinPrice = (cabin.regularPrice - cabin?.discount) * numGuests;
  const totalPrice = cabinPrice + reservation?.extrasPrice;

  const updateData = {
    numGuests,
    cabinPrice,
    totalPrice,
    observations: formData.get("observations")?.toString().slice(0, 1000),
  };
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations", "layout");
  redirect("/account/reservations");
}

// export async function updateBooking(
//   id: number,
//   updatedFields: Partial<Booking>
// ): Promise<Booking> {
//   const { data, error } = await supabase
//     .from("bookings")
//     .update(updatedFields)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be updated");
//   }
//   return data;
// }
