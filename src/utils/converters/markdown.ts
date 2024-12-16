import { marked } from 'marked';
import { yamlToObject, objectToYaml } from './yaml';
import { objectToLatex } from './latex';
import type { ConversionResult } from '../../types';

export const markdownToObject = (content: string): any => {
  return marked.lexer(content);
};

export const objectToMarkdown = (obj: any): string => {
  if (Array.isArray(obj)) {
    return marked.parser(obj);
  }
  // Handle plain objects
  return Object.entries(obj)
    .map(([key, value]) => `# ${key}\n\n${value}`)
    .join('\n\n');
};

export const convertFromMarkdown = (
  content: string,
  to: 'yaml' | 'latex'
): ConversionResult => {
  try {
    const tokens = markdownToObject(content);
    
    // Handle numbered lists for LaTeX conversion
    if (to === 'latex') {
      const processedTokens = tokens.map(token => {
        if (token.type === 'list' && token.ordered) {
          return {
            type: 'paragraph',
            text: token.items.map((item, index) => 
              `\\item[${index + 1}.] ${item.text}`
            ).join('\n')
          };
        }
        return token;
      });
      return { result: objectToLatex(processedTokens) };
    }
    
    return { result: objectToYaml(tokens) };
  } catch (error) {
    return { result: '', error: error.message };
  }
};