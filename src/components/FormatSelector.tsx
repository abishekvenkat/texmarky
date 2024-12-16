import React from 'react';
import { FileDown, FileUp } from 'lucide-react';
import type { FormatType } from '../types';

interface FormatSelectorProps {
  value: FormatType;
  onChange: (format: FormatType) => void;
  label: string;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  value,
  onChange,
  label,
}) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as FormatType)}
        className="px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="markdown">markdown</option>
        <option value="yaml">yaml</option>
        <option value="latex">latex</option>
      </select>
    </div>
  );
};