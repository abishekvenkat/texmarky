import { objectToMarkdown } from './markdown';
import { objectToYaml } from './yaml';
import type { ConversionResult } from '../../types';

export const latexToObject = (content: string): any => {
  const sections: any[] = [];
  const lines = content.split('\n');
  let currentSection: any = { type: 'paragraph', text: '' };
  let inEnumerate = false;
  let listItems: string[] = [];

  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('\\begin{enumerate}')) {
      inEnumerate = true;
      if (currentSection.text) sections.push(currentSection);
      currentSection = { type: 'list', ordered: true, items: [] };
    } else if (trimmedLine.startsWith('\\end{enumerate}')) {
      inEnumerate = false;
      if (listItems.length > 0) {
        currentSection.items = listItems.map(item => ({ type: 'list_item', text: item }));
        sections.push(currentSection);
        listItems = [];
        currentSection = { type: 'paragraph', text: '' };
      }
    } else if (trimmedLine.startsWith('\\item')) {
      if (inEnumerate) {
        const itemText = trimmedLine.replace(/\\item(\[\d+\.])?/, '').trim();
        listItems.push(itemText);
      }
    } else if (trimmedLine.startsWith('\\section{')) {
      if (currentSection.text) sections.push(currentSection);
      currentSection = {
        type: 'heading',
        depth: 1,
        text: trimmedLine.replace(/\\section{(.*?)}/, '$1')
      };
      sections.push(currentSection);
      currentSection = { type: 'paragraph', text: '' };
    } else if (trimmedLine.startsWith('\\subsection{')) {
      if (currentSection.text) sections.push(currentSection);
      currentSection = {
        type: 'heading',
        depth: 2,
        text: trimmedLine.replace(/\\subsection{(.*?)}/, '$1')
      };
      sections.push(currentSection);
      currentSection = { type: 'paragraph', text: '' };
    } else if (trimmedLine === '') {
      if (currentSection.text) {
        sections.push(currentSection);
        currentSection = { type: 'paragraph', text: '' };
      }
    } else if (!inEnumerate) {
      currentSection.text += (currentSection.text ? ' ' : '') + 
        trimmedLine.replace(/\\textbf{(.*?)}/g, '**$1**')
           .replace(/\\textit{(.*?)}/g, '*$1*')
           .replace(/\\emph{(.*?)}/g, '*$1*');
    }
  });

  if (currentSection.text || currentSection.items) {
    sections.push(currentSection);
  }
  return sections;
};

export const objectToLatex = (obj: any): string => {
  if (Array.isArray(obj)) {
    return obj.map(item => {
      switch (item.type) {
        case 'heading':
          const command = item.depth === 1 ? 'section' : 'subsection';
          return `\\${command}{${item.text}}\n`;
        case 'list':
          if (item.ordered) {
            return '\\begin{enumerate}\n' +
              item.items.map((listItem: any) => `\\item ${listItem.text}`).join('\n') +
              '\n\\end{enumerate}\n';
          }
          return item.text + '\n\n';
        case 'paragraph':
          return `${item.text}\n\n`;
        default:
          return '';
      }
    }).join('');
  }
  
  return Object.entries(obj)
    .map(([key, value]) => `\\section{${key}}\n${value}\n`)
    .join('\n');
};

export const convertFromLatex = (
  content: string,
  to: 'markdown' | 'yaml'
): ConversionResult => {
  try {
    const obj = latexToObject(content);
    return {
      result: to === 'markdown' ? objectToMarkdown(obj) : objectToYaml(obj)
    };
  } catch (error) {
    return { result: '', error: error.message };
  }
};