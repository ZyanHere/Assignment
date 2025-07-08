import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

// POST /api/addresses/validate - Validate address
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('Session data:', session);
    console.log('User data:', session?.user);
    
    if (!session?.user?.token && !session?.user?.accessToken) {
      console.log('No token found in session');
      return NextResponse.json(
        { error: 'Authentication required. Please sign in first.' },
        { status: 401 }
      );
    }

    const token = session.user.token || session.user.accessToken;
    const body = await request.json();
    
    const response = await fetch(`${BACKEND_URL}/lmd/api/v1/addresses/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error validating address:', error);
    return NextResponse.json(
      { error: 'Failed to validate address' },
      { status: 500 }
    );
  }
} 