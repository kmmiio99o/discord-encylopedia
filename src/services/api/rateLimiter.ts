class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests = 10;
  private windowMs = 60000;

  setLimit(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async acquire(key: string): Promise<void> {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    
    const validTimestamps = timestamps.filter(t => now - t < this.windowMs);
    
    if (validTimestamps.length >= this.maxRequests) {
      const oldest = validTimestamps[0];
      const waitTime = this.windowMs - (now - oldest);
      if (waitTime > 0) {
        await new Promise(r => setTimeout(r, waitTime));
      }
      return this.acquire(key);
    }
    
    validTimestamps.push(now);
    this.requests.set(key, validTimestamps);
  }

  clear() {
    this.requests.clear();
  }
}

export const rateLimiter = new RateLimiter();
