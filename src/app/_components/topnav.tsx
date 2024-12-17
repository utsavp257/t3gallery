import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { Sign } from "crypto";

export function TopNav(){
  return(
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>
        Gallery
      </div>
      <div>
        <SignedOut>
           <SignInButton/>
        </SignedOut>
        <SignedIn>
            <UserButton/>        
        </SignedIn>
      </div>
    </nav>
  );
}