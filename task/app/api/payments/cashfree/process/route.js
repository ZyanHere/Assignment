import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      order_id,
      payment_session_id,
      reference_id,
      order_amount,
      tx_status,
      tx_time,
      signature
    } = body;

    // Validate required fields (signature is optional)
    if (!order_id || !payment_session_id || !reference_id || !order_amount || !tx_status) {
      return NextResponse.json({
        success: false,
        error: 'Missing required payment parameters: order_id, payment_session_id, reference_id, order_amount, tx_status'
      }, { status: 400 });
    }

    // Process payment on backend
    const backendResponse = await fetch(`${process.env.BACKEND_URL || 'http://localhost:4000'}/lmd/api/v1/payments/cashfree/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id,
        order_number: order_id, // Use order_id as order_number if not provided
        amount: order_amount, // Map order_amount to amount
        payment_method: 'cashfree',
        cashfree_order_id: payment_session_id, // Map payment_session_id to cashfree_order_id
        reference_id,
        payment_status: tx_status, // Map tx_status to payment_status
        payment_method_details: {
          payment_method: 'cashfree'
        },
        tx_time,
        signature
      })
    });

    const result = await backendResponse.json();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Payment processed successfully',
        data: result.data
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || 'Payment processing failed'
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Error processing Cashfree payment:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
} 