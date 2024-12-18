import { getImage } from "~/server/queries";

export default async function PhotoModal({   //MODAL CODE
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    try {
      const { id: photoId } = await params; // Await and destructure
      const idAsNumber = Number(photoId);
      if(Number.isNaN(idAsNumber)) throw new Error("Invalid photo ID");

      const image = await getImage(idAsNumber);
      return (
        <div>
          <img src={image.url} className="w-96" />
        </div>
      );
    } catch (error) {
      console.error("Error resolving params:", error);
      return <div>Error loading photo</div>;
    }
  }
