import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';


export async function POST() {
  const response = NextResponse.json({
    message: 'Logout successful'
  });

  // Clear the admin token cookie
  response.cookies.set('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0
  });

  return response;
}
