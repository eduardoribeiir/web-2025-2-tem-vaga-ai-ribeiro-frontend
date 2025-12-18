interface DescriptionBlockProps {
  text: string;
}

export const DescriptionBlock = ({ text }: DescriptionBlockProps) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-3">
    <h2 className="text-lg font-semibold text-gray-900">Descrição</h2>
    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{text}</p>
  </div>
);
