# Requests Table & Logs Feature

## Overview
This feature implements a requests table page with clickable rows that navigate to detailed logs pages, matching the design reference in `~/Documents/design/`.

## Pages Created

### 1. Requests Table Page
**Path:** `/requests`  
**File:** `src/app/requests/page.tsx`

Features:
- Live Request Timeline table showing API requests
- Columns: Status, Endpoint, Method, Duration, Timestamp
- Color-coded status indicators (green for 2xx, orange for 4xx, red for 5xx)
- Method chips with different colors
- Search functionality (UI only, filter logic to be implemented)
- Filter button (UI only)
- Recent Critical Errors section
- Response Time Trends section
- Click any row to navigate to detailed logs

### 2. Request Detail/Logs Page
**Path:** `/requests/[id]`  
**File:** `src/app/requests/[id]/page.tsx`

Features:
- Three tabs: Request, Response, Logs
- Request tab shows:
  - Request headers (JSON formatted)
  - Request body (if present)
- Response tab shows:
  - Response headers (JSON formatted)
  - Response body (JSON formatted)
- Logs tab shows:
  - Application logs with levels (info, warn, error)
  - Color-coded log levels
  - Timestamps for each log entry
- Request metadata displayed at top:
  - HTTP method
  - Endpoint
  - Status code with color indicator
  - Duration
  - Timestamp
- Back button to return to requests table

## Navigation

A new "Requests" link has been added to the navigation bar in:
- Desktop navigation (top navbar)
- Mobile drawer menu

## Dummy Data

All pages use comprehensive dummy data:

### Requests Table
5 sample requests with varying:
- Methods (GET, POST, DELETE)
- Status codes (200, 401, 500)
- Endpoints
- Durations
- Timestamps

### Request Details
Each request ID (1-5) has:
- Request headers
- Request body (for POST/DELETE)
- Response headers
- Response body (success or error)
- Application logs (3-5 log entries per request)

## Design Match

The implementation matches the design reference:
- **screen.png**: Live Request Timeline table with critical errors section
- **screen2.png**: Overall dashboard layout and styling

## Next Steps (Future Implementation)

1. **API Integration**:
   - Replace dummy data with real API calls
   - Implement search filtering logic
   - Add filter dropdown functionality

2. **Real-time Updates**:
   - Add WebSocket connection for live request updates
   - Auto-refresh table data

3. **Pagination**:
   - Add table pagination
   - Implement load more functionality

4. **Advanced Filtering**:
   - Filter by method, status, date range
   - Save filter preferences

5. **Export Functionality**:
   - Export logs as JSON/CSV
   - Copy request/response data

## File Structure

```
src/
├── app/
│   ├── requests/
│   │   ├── page.tsx              # Requests table page
│   │   └── [id]/
│   │       └── page.tsx          # Request detail/logs page
│   └── ...
├── components/
│   └── Layout/
│       ├── AppLayout.tsx
│       └── Navbar.tsx            # Updated with Requests link
└── ...
```

## How to Use

1. Navigate to `/requests` from the navbar
2. Browse the list of API requests
3. Click any row to view detailed logs
4. Use the tabs to switch between Request, Response, and Logs views
5. Click the back button or browser back to return to the table

## Color Coding

- **Status Indicators**:
  - Green: 2xx (success)
  - Orange: 4xx (client error)
  - Red: 5xx (server error)

- **Method Chips**:
  - Blue: GET
  - Green: POST
  - Orange: PUT
  - Red: DELETE
  - Purple: PATCH

- **Log Levels**:
  - Blue: INFO
  - Orange: WARN
  - Red: ERROR
