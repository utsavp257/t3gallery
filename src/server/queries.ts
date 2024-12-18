import 'server-only';
import { db } from "./db";
import { auth } from '@clerk/nextjs/server';

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