import axios, { AxiosError } from 'axios';

export class TinyTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TinyTokenError';
  }
}

export interface CompressOptions {
  apiKey?: string;
  quality?: number;
}

export class TinyToken {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async compress(text: string, options?: CompressOptions): Promise<string> {
    return compress(text, {
      apiKey: options?.apiKey || this.apiKey,
      quality: options?.quality
    });
  }
}

export async function compress(text: string, options?: CompressOptions): Promise<string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (options?.apiKey?.trim()) {
    headers['Authorization'] = `Bearer ${options.apiKey}`;
  }

  const payload: Record<string, any> = { text };
  if (options?.quality !== undefined) {
    payload.quality = options.quality;
  }

  try {
    const response = await axios.post('https://api.tinytoken.org/compress', payload, {
      headers,
      timeout: 30000
    });

    if (!response.data?.compressed_text) {
      throw new TinyTokenError('Invalid response format');
    }

    return response.data.compressed_text;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw new TinyTokenError('Invalid API key');
      } else if (error.response?.status === 400) {
        throw new TinyTokenError('Invalid request parameters');
      } else if (error.response?.status === 429) {
        throw new TinyTokenError('Rate limit exceeded');
      } else if (error.code === 'ECONNABORTED') {
        throw new TinyTokenError('Request timeout');
      } else if (error.code === 'ECONNREFUSED') {
        throw new TinyTokenError('Connection error');
      }
      throw new TinyTokenError(`API error: ${error.response?.status || error.message}`);
    }
    throw new TinyTokenError(`Request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
} 