export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id: photoId } = await params; // Await and destructure
    console.log(photoId); // Debugging log
    return <div>{photoId}</div>;
  } catch (error) {
    console.error("Error resolving params:", error);
    return <div>Error loading photo</div>;
  }
}
