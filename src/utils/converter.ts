import { convertFromMarkdown } from './converters/markdown';
import { convertFromYaml } from './converters/yaml';
import { convertFromLatex } from './converters/latex';
import type { FormatType } from '../types';

export const convertFormat = (
  content: string,
  from: FormatType,
  to: FormatType
) => {
  if (from === to) return { result: content };

  switch (from) {
    case 'markdown':
      return convertFromMarkdown(content, to);
    case 'yaml':
      return convertFromYaml(content, to);
    case 'latex':
      return convertFromLatex(content, to);
    default:
      return { result: '', error: 'Unsupported format' };
  }
};