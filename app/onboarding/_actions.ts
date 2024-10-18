"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  try {
    console.log(formData);
    const res = await clerkClient().users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        nickname: formData.get("nickname"),
        gender: formData.get("gender"),
        state: formData.get("state"),
      },
    });
    return { message: res.publicMetadata };
  } catch (error) {
    console.error(error); 
    return { error: "There was an error updating the user metadata." };
  }
};
