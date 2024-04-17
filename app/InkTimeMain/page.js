"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignInWithGitHub = async () => {
    await gitHubSignIn();
  };

  const handleSignOut = async () => {
    await firebaseSignOut();
  };

  useEffect(() => {
    if (user) {
      console.log("User is authenticated:", user);
    } else {
      console.log("User is not authenticated");
    }
  }, [user]);

  if (user) {
    return (
      <div>
        <h1>Welcome {user.displayName}</h1>
        <Link href="/InkTimeMain/SchedulingPage">
          Book Appointments
        </Link>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleSignInWithGitHub}>Login with GitHub</button>
    </div>
  );
}

export default Page;
