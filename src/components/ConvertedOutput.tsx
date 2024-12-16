import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { FormatType } from '../types';

interface ConvertedOutputProps {
  content: string;
  format: FormatType;
}

export const ConvertedOutput: React.FC<ConvertedOutputProps> = ({ content, format }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguage = (format: FormatType) => {
    switch (format) {
      case 'markdown':
        return 'markdown';
      case 'yaml':
        return 'yaml';
      case 'latex':
        return 'latex';
      default:
        return 'text';
    }
  };

  return (
    <div className="relative bg-gray-50 rounded-lg border border-gray-200">
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={getLanguage(format)}
        style={oneLight}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.875rem'
        }}
      >
        {content || 'converted text will appear here...'}
      </SyntaxHighlighter>
    </div>
  );
};