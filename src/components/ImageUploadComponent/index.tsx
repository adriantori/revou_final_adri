import { Button } from "@mui/material";
import { useRef, useState } from "react";
import { Loading } from "../"

interface ImageUploadComponentProps {
  onImageUrlChange: (imageUrl: string | null) => void;
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({ onImageUrlChange }) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Initial loading state

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (image: string | Blob | null) => {

    if (!image) {
      console.error('No image selected for upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    setLoading(true);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=ca9a8952b2316d8ae0114df21f591cf2', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data);
        setUploadedImageUrl(data.data.url);
        onImageUrlChange(data.data.url); // Notify parent component about the new image URL
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      // Set loading to false once data is loaded or if an error occurs
      setLoading(false);
    }
  };
  if (loading) {
    // If loading is true, render the Loading component
    return <Loading />;
  }

  return (
    <div>
      {/* File input and upload button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files && e.target.files[0])}
        style={{ display: 'none' }}
      />
      <Button variant="contained" color="primary" onClick={() => fileInputRef.current?.click()}>
        Upload Gambar
      </Button>
      {uploadedImageUrl && (
        <img
          src={uploadedImageUrl}
          alt="Uploaded Disaster Image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  );
};

export default ImageUploadComponent;
