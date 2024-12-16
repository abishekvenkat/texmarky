import React from 'react';
import { Upload } from 'lucide-react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange, error }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onChange(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="relative">
      <div className="absolute right-2 top-2">
        <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Upload className="w-5 h-5 text-gray-500" />
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept=".md,.yaml,.yml,.tex"
          />
        </label>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-[300px] p-4 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm whitespace-pre-wrap break-words`}
        placeholder="paste or type your content here..."
        wrap="soft"
      />
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};