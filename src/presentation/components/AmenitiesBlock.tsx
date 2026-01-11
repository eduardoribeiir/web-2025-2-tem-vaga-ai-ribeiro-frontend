interface AmenitiesBlockProps {
  amenities: string[];
  customAmenities?: string;
}

export const AmenitiesBlock = ({ amenities, customAmenities }: AmenitiesBlockProps) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-3">
    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Comodidades</h3>
    <div className="flex flex-wrap gap-2">
      {amenities.map(item => (
        <span key={item} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
          {item}
        </span>
      ))}
      {customAmenities && (
        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200">
          {customAmenities}
        </span>
      )}
    </div>
  </div>
);
