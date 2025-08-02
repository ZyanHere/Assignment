import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Get session for authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.token && !session?.user?.accessToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = session.user.token || session.user.accessToken;
    
    // Call backend API to get order tracking data
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    const response = await fetch(`${BACKEND_URL}/lmd/api/v1/retail/orders/${id}/track`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { status: 'error', message: data.message || 'Failed to fetch order tracking data' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching order tracking data:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
} 