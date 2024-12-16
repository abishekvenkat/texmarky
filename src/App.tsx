import { useState, useEffect } from 'react';
import { Github, FileCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { FormatSelector } from './components/FormatSelector';
import { Editor } from './components/Editor';
import { ConvertedOutput } from './components/ConvertedOutput';
import { convertFormat } from './utils/converter';
import type { FormatType } from './types';

function App() {
  const [sourceFormat, setSourceFormat] = useState<FormatType>('markdown');
  const [targetFormat, setTargetFormat] = useState<FormatType>('yaml');
  const [sourceContent, setSourceContent] = useState('');
  const [convertedContent, setConvertedContent] = useState('');
  const [error, setError] = useState<string>();

  useEffect(() => {
    const { result, error } = convertFormat(sourceContent, sourceFormat, targetFormat);
    setConvertedContent(result);
    setError(error);
  }, [sourceContent, sourceFormat, targetFormat]);

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8 max-w-4xl"
      >
        <header className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 mb-2"
          >
            <FileCode className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">texmarky</h1>
          </motion.div>
          <p className="text-gray-600">convert between latex, markdown, and yaml formats</p>
        </header>

        <div className="grid gap-6">
          <div className="flex justify-between items-center">
            <FormatSelector
              value={sourceFormat}
              onChange={setSourceFormat}
              label="from:"
            />
            <FormatSelector
              value={targetFormat}
              onChange={setTargetFormat}
              label="to:"
            />
          </div>

          <div className="grid gap-4">
            <Editor
              value={sourceContent}
              onChange={setSourceContent}
              error={error}
            />

            <ConvertedOutput
              content={convertedContent}
              format={targetFormat}
            />
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p className="mb-4">no data is stored with us. all processing happens on your browser.</p>
          <a
            href="https://github.com/abishekvenkat/texmarky"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>view on github</span>
          </a>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;