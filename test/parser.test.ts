import { describe, it, expect } from 'vitest';
import { parseDST, parsePES } from '../pages/DSTUpload';

describe('Embroidery Parsers', () => {
  it('should parse PES header and return foundational metadata', () => {
    // Create a fake PES header buffer
    const buffer = new ArrayBuffer(16);
    const view = new Uint8Array(buffer);
    const header = '#PES0001';
    for (let i = 0; i < header.length; i++) {
      view[i] = header.charCodeAt(i);
    }
    
    const info = parsePES(buffer);
    
    expect(info.label).toBe('PES Design (Preview Unsupported)');
    expect(info.stitchCount).toBe(0);
    expect(info.widthMm).toBe(100);
  });

  it('should throw error on invalid PES file', () => {
    const buffer = new ArrayBuffer(16);
    const view = new Uint8Array(buffer);
    const header = 'INVALID_';
    for (let i = 0; i < header.length; i++) {
      view[i] = header.charCodeAt(i);
    }
    
    expect(() => parsePES(buffer)).toThrowError('Invalid PES file');
  });

  it('should safely return empty DST info for empty or tiny buffer', () => {
    const buffer = new ArrayBuffer(0);
    const info = parseDST(buffer);
    expect(info.stitchCount).toBe(0);
  });
});
