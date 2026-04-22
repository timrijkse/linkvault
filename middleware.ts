import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // #region agent log
  fetch('http://127.0.0.1:7938/ingest/f8dcf939-62d3-47e2-8899-e0c9523512ec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '805e02' },
    body: JSON.stringify({
      sessionId: '805e02',
      runId: 'pre-fix',
      hypothesisId: 'H_APPDIR_SHADOW',
      location: 'middleware.ts:10',
      message: 'middleware hit',
      data: {
        pathname: request.nextUrl.pathname,
        host: request.headers.get('host'),
        nextUrl: request.nextUrl.toString(),
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

