import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if environment variables are set
    const clientId = process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID;
    
    if (!clientId) {
      return NextResponse.json({
        success: false,
        error: 'Cashfree Client ID not configured',
        message: 'Please set NEXT_PUBLIC_CASHFREE_CLIENT_ID in your environment variables'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Cashfree configuration is valid',
      data: {
        clientId: clientId ? 'Configured' : 'Not configured',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Cashfree test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 