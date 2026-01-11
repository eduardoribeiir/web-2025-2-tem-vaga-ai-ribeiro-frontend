interface RulesBlockProps {
  rules: string[];
  customRules?: string;
}

export const RulesBlock = ({ rules, customRules }: RulesBlockProps) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-3">
    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Regras</h3>
    <ul className="text-sm text-gray-700 space-y-1">
      {rules.map(rule => (
        <li key={rule} className="flex items-start gap-2">
          <svg className="w-4 h-4 text-[#61452a] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{rule}</span>
        </li>
      ))}
      {customRules && (
        <li className="flex items-start gap-2 pt-1 border-t border-gray-100 mt-2">
          <svg className="w-4 h-4 text-[#61452a] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{customRules}</span>
        </li>
      )}
    </ul>
  </div>
);
