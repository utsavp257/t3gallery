import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

const f = createUploadthing();



// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
        const user = await auth();

        if (!(user).userId) throw new UploadThingError("Unauthorized");

        // await db.insert(images).values({
        //   name: '13.png',
        //   url: 'https://utfs.io/f/LxqRyZPzYaceDe2baEtrgyw6FavhZo8LYUx1QnO09zBfsiH3',
        //   userId: '231234',
        // });
        // console.log("db workedddd")
        //  console.log( (await user).userId )
        
        return { userId: (user).userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("onUploadComplete")
        await db.insert(images).values({
          name: file.name,
          url: file.url,
          userId: metadata.userId!,
        });

        return { uploadedBy: metadata.userId };
      } catch (error) {
        console.log(error);
      }
      
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;