// Simple in-memory rate limiter
// Note: In production with multiple serverless instances, consider using Redis
// For Vercel serverless, this provides basic protection within a single instance

interface RateLimitEntry {
  timestamp: number
  count: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Configuration
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000 // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 1 // 1 request per email per window

// Clean up old entries periodically
function cleanupOldEntries() {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now - entry.timestamp > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(key)
    }
  }
}

export function checkRateLimit(email: string): { allowed: boolean; retryAfter?: number } {
  // Clean up old entries
  cleanupOldEntries()

  const key = email.toLowerCase()
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry) {
    // First request - allow and record
    rateLimitMap.set(key, { timestamp: now, count: 1 })
    return { allowed: true }
  }

  const timeSinceLastRequest = now - entry.timestamp

  if (timeSinceLastRequest > RATE_LIMIT_WINDOW_MS) {
    // Window expired - reset
    rateLimitMap.set(key, { timestamp: now, count: 1 })
    return { allowed: true }
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - timeSinceLastRequest) / 1000)
    return { allowed: false, retryAfter }
  }

  // Within window but under limit
  entry.count++
  entry.timestamp = now
  return { allowed: true }
}

export function getRateLimitMessage(retryAfter: number): string {
  const minutes = Math.ceil(retryAfter / 60)
  if (minutes <= 1) {
    return 'Please wait a moment before submitting again.'
  }
  return `Please wait ${minutes} minutes before submitting again.`
}