import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";
 
async function Images(){
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return(
    <div className="flex flex-wrap gap-4">
        {
          images.map((image) => (
            <div key={image.id} className="flex w-48 flex-col"> 
              <img src={image.url} />
              <div>{image.name}</div>
            </div>
          ))
        }
      </div>
  );
};

const mockUrls = [
  "https://utfs.io/f/LxqRyZPzYaceDe2baEtrgyw6FavhZo8LYUx1QnO09zBfsiH3",
  "https://utfs.io/f/LxqRyZPzYacek7PagicqTmMlXEOiCLfZc3Ajs1x6FvYdwGW9",
  "https://utfs.io/f/LxqRyZPzYaceM8m6NdUbkNmPYIGpLchSaQBE8g43U76nZVXj",
  "https://utfs.io/f/LxqRyZPzYaceiADlaNP5TFqtOD7z1A9vQ6j5aKWUIgLSb3Rr",
  "https://utfs.io/f/LxqRyZPzYaceDe2baEtrgyw6FavhZo8LYUx1QnO09zBfsiH3",
  "https://utfs.io/f/LxqRyZPzYacek7PagicqTmMlXEOiCLfZc3Ajs1x6FvYdwGW9",
  "https://utfs.io/f/LxqRyZPzYaceM8m6NdUbkNmPYIGpLchSaQBE8g43U76nZVXj",
  "https://utfs.io/f/LxqRyZPzYaceiADlaNP5TFqtOD7z1A9vQ6j5aKWUIgLSb3Rr",
  "https://utfs.io/f/LxqRyZPzYaceDe2baEtrgyw6FavhZo8LYUx1QnO09zBfsiH3",
  "https://utfs.io/f/LxqRyZPzYacek7PagicqTmMlXEOiCLfZc3Ajs1x6FvYdwGW9",
  "https://utfs.io/f/LxqRyZPzYaceM8m6NdUbkNmPYIGpLchSaQBE8g43U76nZVXj",
  "https://utfs.io/f/LxqRyZPzYaceiADlaNP5TFqtOD7z1A9vQ6j5aKWUIgLSb3Rr"
];


export default async function HomePage() {

  return (
    <main className="">

      <SignedOut>
        <div className="w-full h-full text-2xl text-center">
          Please sign in to view your gallery
        </div>
      </SignedOut>

      <SignedIn>
        <Images/>
      </SignedIn>
      
    </main>
  );
}
