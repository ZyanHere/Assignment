import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

// GET /api/addresses/checkout - Get checkout address
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.token && !session?.user?.accessToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = session.user.token || session.user.accessToken;
    
    const response = await fetch(`${BACKEND_URL}/lmd/api/v1/addresses/checkout`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error getting checkout address:', error);
    return NextResponse.json(
      { error: 'Failed to get checkout address' },
      { status: 500 }
    );
  }
} 