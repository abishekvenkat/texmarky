import yaml from 'js-yaml';
import type { ConversionResult } from '../../types';

export const yamlToObject = (content: string): any => {
  return yaml.load(content);
};

export const objectToYaml = (obj: any): string => {
  return yaml.dump(obj, {
    indent: 2,
    lineWidth: -1,
    noRefs: true,
    sortKeys: true
  });
};

export const convertFromYaml = (
  content: string,
  to: 'markdown' | 'latex'
): ConversionResult => {
  try {
    const obj = yamlToObject(content);
    
    // Convert to intermediate format
    const sections = Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'string') {
        return [
          { type: 'heading', depth: 1, text: key },
          { type: 'paragraph', text: value.toString() }
        ];
      }
      return [
        { type: 'heading', depth: 1, text: key },
        { type: 'paragraph', text: yaml.dump(value) }
      ];
    }).flat();

    // Convert to target format
    if (to === 'markdown') {
      return {
        result: sections.map(section => {
          if (section.type === 'heading') {
            return '#'.repeat(section.depth) + ' ' + section.text;
          }
          return section.text;
        }).join('\n\n')
      };
    }
    
    return {
      result: sections.map(section => {
        if (section.type === 'heading') {
          return `\\section{${section.text}}`;
        }
        return section.text;
      }).join('\n\n')
    };
  } catch (error) {
    return { result: '', error: error.message };
  }
};