// app/providers.js
'use client'
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import React from 'react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: 'https://app.posthog.com', // or 'always' to create profiles for anonymous users as well
  })
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
    return (
      <PostHogProvider client={posthog}>
        <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
      </PostHogProvider>
    );
  }

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
    const auth = useAuth();
    const userInfo = useUser();
    useEffect(() => {
      if (userInfo.user) {
        posthog.identify(userInfo.user.id, {
          email: userInfo.user.emailAddresses[0]?.emailAddress,
          name: userInfo.user.fullName,
        });
      } else if (!auth.isSignedIn) {
        posthog.reset();
      }
    }, [auth, userInfo]);
    return children;
  }