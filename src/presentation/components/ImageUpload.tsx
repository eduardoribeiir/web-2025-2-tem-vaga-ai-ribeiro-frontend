import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  images, 
  onImagesChange, 
  maxImages = 15 
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validações
    if (images.length + files.length > maxImages) {
      setError(`Você pode adicionar no máximo ${maxImages} imagens`);
      return;
    }

    // Validar tipo e tamanho
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Valida tipo
      if (!file.type.startsWith('image/')) {
        setError(`${file.name} não é uma imagem válida`);
        continue;
      }

      // Valida tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} excede o tamanho máximo de 5MB`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Upload
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      validFiles.forEach(file => {
        formData.append('files', file);
      });

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/upload/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro ao fazer upload');
      }

      const data = await response.json();
      const uploadedUrls = data.urls.map((url: string) => 
        url.startsWith('http') ? url : `http://localhost:8000${url}`
      );
      
      onImagesChange([...images, ...uploadedUrls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Input de upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagens ({images.length}/{maxImages})
        </label>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          disabled={uploading || images.length >= maxImages}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
        
        <p className="mt-1 text-xs text-gray-500">
          PNG, JPG, JPEG ou WEBP (máx. 5MB por arquivo)
        </p>
      </div>

      {/* Mensagens de erro */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Loading */}
      {uploading && (
        <div className="flex items-center gap-2 text-blue-600">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm">Enviando imagens...</span>
        </div>
      )}

      {/* Preview das imagens */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5
                  opacity-0 group-hover:opacity-100 transition-opacity
                  hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Remover imagem"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
