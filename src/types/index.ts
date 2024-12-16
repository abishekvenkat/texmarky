export type FormatType = 'markdown' | 'yaml' | 'latex';

export interface ConversionError {
  message: string;
  line?: number;
}

export interface ConversionResult {
  result: string;
  error?: string;
}