import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log('🔍 Payment processing API called');
    
    // Get authorization header from the request
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      console.log('❌ No authorization header found');
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Request body:', {
      razorpay_payment_id: body.razorpay_payment_id,
      razorpay_order_id: body.razorpay_order_id,
      has_signature: !!body.razorpay_signature,
      payment_method: body.payment_method
    });

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      payment_method,
      payment_method_details
    } = body;

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { error: "Missing required payment parameters" },
        { status: 400 }
      );
    }

    console.log('📞 Calling backend API...');
    
    // Call backend to process payment
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    const response = await fetch(`${backendUrl}/lmd/api/v1/payments/process`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        payment_method: payment_method || 'razorpay',
        payment_method_details: payment_method_details || {}
      })
    });

    console.log('Backend response status:', response.status);
    
    const data = await response.json();
    console.log('Backend response data:', data);

    if (!response.ok) {
      console.log('❌ Backend returned error:', data);
      return NextResponse.json(
        { error: data.message || "Failed to process payment" },
        { status: response.status }
      );
    }

    console.log('✅ Payment processed successfully');
    return NextResponse.json({
      success: true,
      data: data.data
    });

  } catch (error) {
    console.error('💥 Payment processing error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 