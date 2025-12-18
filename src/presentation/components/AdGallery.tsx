import { useState } from 'react';

interface AdGalleryProps {
  images: string[];
  title: string;
}

const defaultImage =
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80';

export const AdGallery = ({ images, title }: AdGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const galleryImages = images && images.length > 0 ? images : [defaultImage];
  const mainImage = galleryImages[selectedIndex];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-4">
      <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
        <img src={mainImage} alt={title} className="w-full h-full object-cover" />
      </div>
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {galleryImages.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-20 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition ${
                selectedIndex === index ? 'border-[#61452a]' : 'border-transparent hover:border-gray-300'
              }`}
              aria-label={`Visualizar foto ${index + 1}`}
            >
              <img src={image} alt={`${title} ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
