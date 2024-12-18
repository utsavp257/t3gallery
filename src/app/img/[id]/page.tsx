
import FullPageImageView from "~/components/full-image-page";

export default async function PhotoPage({   //PAGE CODE
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    try {
      const { id: photoId } = await params; // Await and destructure
      const idAsNumber = Number(photoId);
      if(Number.isNaN(idAsNumber)) throw new Error("Invalid photo ID");

      return (
          <FullPageImageView id={idAsNumber} />
      );
    } catch (error) {
      console.error("Error resolving params:", error);
      return <div>Error loading photo</div>;
    }
  }
