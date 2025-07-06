import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    // Await params for Next.js 15 compatibility
    const { id: order_id } = await params;
    const body = await request.json();
    
    console.log('Creating Razorpay order for order:', order_id);
    console.log('Request body:', body);
    
    // Get authorization header from the request
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      console.log('❌ No authorization header found');
      return NextResponse.json(
        { status: 'error', message: 'Authorization header required' },
        { status: 401 }
      );
    }
    
    console.log('✅ Authorization header found');
    
    // Use fallback URL if environment variable is not set
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    const backendUrl = `${baseUrl}/lmd/api/v1/retail/orders/${order_id}/create-payment`;
    
    console.log('📞 Calling backend API:', backendUrl);
    
    // Call backend API to create Razorpay order
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify(body),
    });
    
    console.log('Backend response status:', response.status);

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Non-JSON response:', text);
      return NextResponse.json(
        { status: 'error', message: 'Backend returned non-JSON response' },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('Backend response data:', data);
    
    if (!response.ok) {
      console.error('❌ Backend error:', data);
      return NextResponse.json(
        { status: 'error', message: data.message || 'Failed to create Razorpay order' },
        { status: response.status }
      );
    }
    
    console.log('✅ Backend request successful');

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
} 