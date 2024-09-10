"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

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
