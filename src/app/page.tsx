import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";
 
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

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {

  const posts = await db.query.posts.findMany();
 
  //console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>
            {post.name}
          </div>
        ))}
        {
          mockImages.map((image) => (
            <div key={image.id} className="w-48"> 
              <img src={image.url} />
            </div>
          ))
        }
      </div>
    </main>
  );
}
