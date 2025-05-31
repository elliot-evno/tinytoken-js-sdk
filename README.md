# TinyToken SDK

Text compression API client.

## Install

```bash
npm install tinytoken-sdk
```

## Usage

```javascript
import { compress, TinyToken } from 'tinytoken-sdk';

// Compress text
const result = await compress("Your text here");
console.log(result);

// Or use the class
const client = new TinyToken();
const result2 = await client.compress("Your text here");
console.log(result2);
```

## API Reference

### `TinyToken` Class

#### Constructor
```typescript
new TinyToken(apiKey?: string)
```

#### Methods
- `compress(text: string, options?: CompressOptions): Promise<string>`
  - `text`: The text to compress
  - `options`: Optional configuration
    - `apiKey`: Override the instance API key
    - `quality`: Compression quality (0-1)

### Standalone Function

#### `compress(text: string, options?: CompressOptions): Promise<string>`
- `text`: The text to compress
- `options`: Optional configuration
  - `apiKey`: API key for authentication
  - `quality`: Compression quality (0-1)

## Error Handling

The SDK throws `TinyTokenError` for various error conditions:
- Invalid API key
- Invalid request parameters
- Rate limit exceeded
- Connection errors
- Timeout errors
- Invalid response format

## License

MIT 