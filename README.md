
### Market API – Summary Endpoint

`GET /api/market/summary`

Returns a read-only snapshot of platform-wide market statistics. No authentication required.

**Response**

```json
{
  "tokensListed": 247,
  "totalTrades": 5432,
  "totalVolume": "12400000",
  "generatedAt": "2026-03-31T12:00:00.000Z"
}
```

| Field | Type | Description |
| --- | --- | --- |
| `tokensListed` | number | Total number of tokens currently listed |
| `totalTrades` | number | Cumulative trade count across all markets |
| `totalVolume` | string | Cumulative traded volume (raw string from market service) |
| `generatedAt` | string | ISO 8601 timestamp of when the response was built |

## Changes Made

### `GET /api/market/summary` endpoint

A new read-only endpoint was added to expose a platform-wide market snapshot.

**Files changed:**

**`backend/src/controllers/market.controller.js`**
- Added `getMarketSummary` handler. It calls `tokenService.countTokens()` and `marketService.getMarketData()`, then returns the four required fields. `generatedAt` is stamped at response time with `new Date().toISOString()`. Errors are forwarded to `next(error)` consistent with the existing handlers.

**`backend/src/routes/market.routes.js`**
- Imported `getMarketSummary` from the controller.
- Registered `GET /summary` on the market router, which maps to `GET /api/market/summary` given the existing `/api/market` mount point in `index.js`.
