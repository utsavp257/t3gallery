import 'server-only';
import { db } from "./db";
import { auth } from '@clerk/nextjs/server';
import { images } from "./db/schema";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import analyticsServerClient from './analytics';
import { NextResponse } from 'next/server';

export async function getMyImages() {

    const user = auth();
    const userUserId = (await user).userId;
    if (!(await user).userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, {eq}) => eq(model.userId, userUserId!),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
  const user = auth();
  if (!(await user).userId) throw new Error("Unauthorized");
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");
  if (image.userId !== (await user).userId) throw new Error("Unauthorized");
  return image;
}

export async function deleteImage(id: number) {
  try {
    const user = await auth();
    
    if (!user.userId) throw new Error("Unauthorized");

    const image = await db.query.images.findFirst({
      where: and(eq(images.id, id), eq(images.userId, user.userId)),
    });
    if (!image) redirect("/");

    await db.delete(images).where(eq(images.id, id));

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "delete image",
      properties: {
        imageId: id,
      }
    });

    console.log("deleted");
    //NextResponse.redirect("http://localhost:3000/");
    redirect("/");
  } catch (error) {
    console.log(error);
  }
    
}

