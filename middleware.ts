import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
const isPublicRoute = createRouteMatcher(["/"]);
const isDashboardRoute = createRouteMatcher(["/dashboard"]);

export default clerkMiddleware((auth, req: NextRequest) => {
  const { userId, sessionClaims } = auth();

  // Allow access to public routes (landing page) regardless of authentication status
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }

  // For signed-in users:
  if (userId) {
    // If onboarding is not complete, redirect to onboarding (unless already on onboarding page)
    if (
      !sessionClaims?.metadata?.onboardingComplete &&
      !isOnboardingRoute(req)
    ) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // If onboarding is complete and user is on onboarding page, redirect to dashboard
    if (sessionClaims?.metadata?.onboardingComplete && isOnboardingRoute(req)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // If trying to access dashboard without completing onboarding, redirect to onboarding
    if (!sessionClaims?.metadata?.onboardingComplete && isDashboardRoute(req)) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
  }

  // For all other cases, allow the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
