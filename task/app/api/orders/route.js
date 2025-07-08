import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth'; 

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:6000';

// GET /api/orders - Get all orders for the user
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.token && !session?.user?.accessToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // The backend expects a JWT token from its own authentication system
    // We need to use the token that was obtained from the backend login
    const token = session.user.token || session.user.accessToken;
    
    console.log('Session user:', session.user);
    console.log('Token:', token);
    console.log('Backend URL:', `${BACKEND_URL}/lmd/api/v1/retail/orders/me`);
    
    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token available. Please log in again.' },
        { status: 401 }
      );
    }
    
    // Check if this is the test token (which won't work with the backend)
    if (token === 'test-token-12345') {
      return NextResponse.json(
        { error: 'Test token detected. Please log in with real credentials to access orders.' },
        { status: 401 }
      );
    }
    
    const response = await fetch(`${BACKEND_URL}/lmd/api/v1/retail/orders/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response text:', errorText);
      
      try {
        const errorData = JSON.parse(errorText);
        return NextResponse.json(errorData, { status: response.status });
      } catch (e) {
        return NextResponse.json(
          { error: `Backend error: ${response.status} - ${errorText}` },
          { status: response.status }
        );
      }
    }
    
    const data = await response.json();
    console.log('Response data:', data);
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
} 