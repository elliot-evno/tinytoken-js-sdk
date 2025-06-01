# TinyToken SDK

Text compression API client for JavaScript/TypeScript.

## Installation

```bash
npm install tinytoken
```

## Getting Started

### 1. Get Your API Key

First, you'll need to get an API key from [TinyToken](https://tinytoken.org):

1. Visit [https://tinytoken.org](https://tinytoken.org)
2. Sign up for an account
3. Navigate to your dashboard
4. Copy your API key

### 2. Basic Usage

```javascript
import { compress, TinyToken } from 'tinytoken';

// Method 1: Using the standalone function
const result = await compress("Your text here", { 
  apiKey: "your-api-key-here" 
});
console.log(result);

// Method 2: Using the TinyToken class (recommended)
const client = new TinyToken("your-api-key-here");
const result2 = await client.compress("Your text here");
console.log(result2);
```

### 3. Environment Variables

For security, it's recommended to store your API key in environment variables:

```javascript
// Set in your environment
// TINYTOKEN_API_KEY=your-api-key-here

import { TinyToken } from 'tinytoken';

const client = new TinyToken(process.env.TINYTOKEN_API_KEY);
const result = await client.compress("Your text here");
```

## API Reference

### `TinyToken` Class

#### Constructor
```typescript
new TinyToken(apiKey: string)
```

**Parameters:**
- `apiKey` (required): Your TinyToken API key

**Throws:**
- `TinyTokenError`: If API key is missing or empty

#### Methods
- `compress(text: string, options?: CompressOptions): Promise<string>`
  - `text`: The text to compress
  - `options`: Optional configuration
    - `apiKey`: Override the instance API key
    - `quality`: Compression quality (0-1)

### Standalone Function

#### `compress(text: string, options: CompressOptions): Promise<string>`
- `text`: The text to compress
- `options`: Configuration object
  - `apiKey` (required): API key for authentication
  - `quality`: Compression quality (0-1)

**Throws:**
- `TinyTokenError`: If API key is missing or empty

## Advanced Usage

### Compression Quality

You can specify the compression quality (0-1, where 1 is maximum compression):

```javascript
const client = new TinyToken("your-api-key-here");
const result = await client.compress("Your text here", { quality: 0.8 });
```

### Error Handling

The SDK throws `TinyTokenError` for various error conditions:

```javascript
import { TinyToken, TinyTokenError } from 'tinytoken';

try {
  const client = new TinyToken("your-api-key-here");
  const result = await client.compress("Your text here");
  console.log(result);
} catch (error) {
  if (error instanceof TinyTokenError) {
    console.error('TinyToken Error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

**Common Error Types:**
- Invalid or missing API key
- Invalid request parameters
- Rate limit exceeded
- Connection errors
- Timeout errors
- Invalid response format

## Security Best Practices

1. **Never commit API keys to version control**
2. **Use environment variables** to store your API key
3. **Rotate your API keys regularly**
4. **Use different API keys for different environments** (development, staging, production)

## Examples

### Node.js with Environment Variables

```javascript
// .env file
// TINYTOKEN_API_KEY=your-api-key-here

require('dotenv').config();
const { TinyToken } = require('tinytoken');

const client = new TinyToken(process.env.TINYTOKEN_API_KEY);

async function compressText() {
  try {
    const compressed = await client.compress("This is a long text that needs compression...");
    console.log('Compressed:', compressed);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

compressText();
```

### TypeScript

```typescript
import { TinyToken, CompressOptions, TinyTokenError } from 'tinytoken';

class TextCompressor {
  private client: TinyToken;

  constructor(apiKey: string) {
    this.client = new TinyToken(apiKey);
  }

  async compressWithQuality(text: string, quality: number): Promise<string> {
    try {
      return await this.client.compress(text, { quality });
    } catch (error) {
      if (error instanceof TinyTokenError) {
        throw new Error(`Compression failed: ${error.message}`);
      }
      throw error;
    }
  }
}
```

## License

MIT 