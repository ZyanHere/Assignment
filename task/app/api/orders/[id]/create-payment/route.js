import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    // Await params for Next.js 15 compatibility
    const { id: order_id } = await params;
    const body = await request.json();
    
    console.log('Creating Razorpay order for order:', order_id);
    
    // Get authorization header from the request
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { status: 'error', message: 'Authorization header required' },
        { status: 401 }
      );
    }
    
    // Use fallback URL if environment variable is not set
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/lmd/api/v1';
    
    // Call backend API to create Razorpay order
    const response = await fetch(`${baseUrl}/retail/orders/${order_id}/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify(body),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      return NextResponse.json(
        { status: 'error', message: 'Backend returned non-JSON response' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Backend error:', data);
      return NextResponse.json(
        { status: 'error', message: data.message || 'Failed to create Razorpay order' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
} 