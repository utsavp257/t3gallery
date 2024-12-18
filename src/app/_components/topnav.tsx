"use client";
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { Sign } from "crypto";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export function TopNav(){

    const router = useRouter();

  return(
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>
        Gallery
      </div>
      <div className="flex flex-row">
        <SignedOut>
           <SignInButton/>
        </SignedOut>
        <SignedIn>
            <UploadButton endpoint="imageUploader"
              onClientUploadComplete={(res) => {
              console.log("Client upload complete:", res);
              router.refresh();
            }}
            />
            <UserButton/>        
        </SignedIn>
      </div>
    </nav>
  );
}