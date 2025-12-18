interface AmenitiesBlockProps {
  amenities: string[];
}

export const AmenitiesBlock = ({ amenities }: AmenitiesBlockProps) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-3">
    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Comodidades</h3>
    <div className="flex flex-wrap gap-2">
      {amenities.map(item => (
        <span key={item} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
          {item}
        </span>
      ))}
    </div>
  </div>
);
