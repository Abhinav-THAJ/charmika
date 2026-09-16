import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const status = formData.get('status');
    const txnid = formData.get('txnid');
    
    const baseUrl = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    if (status === 'success') {
      // 303 Redirect converts the POST back to a GET request for the frontend
      return NextResponse.redirect(`${baseUrl}/order-success?payment_id=${txnid}&payment_method=payu`, 303);
    } else {
      return NextResponse.redirect(`${baseUrl}/checkout?error=Payment+Failed`, 303);
    }
  } catch (error) {
    const baseUrl = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/checkout?error=Server+Error`, 303);
  }
}
