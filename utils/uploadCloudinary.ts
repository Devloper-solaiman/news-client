export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', 'travel-news');
  formData.append('cloud_name', 'dcbvputnw');

  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

  const response = await fetch(`${cloudinaryUrl}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file to Cloudinary');
  }

  const data = await response.json();

  return data.secure_url;
}
