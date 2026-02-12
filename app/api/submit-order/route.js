import { NextResponse } from 'next/server';

// ═══════════════════════════════════════════════════════════════
//  GOOGLE SHEETS INTEGRATION
//  Replace the URL below with your deployed Google Apps Script URL.
//  See the setup guide at the bottom of this file.
// ═══════════════════════════════════════════════════════════════
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

export async function POST(request) {
    try {
        const body = await request.json();

        // Validation
        const required = ['vendorName', 'businessName', 'phone', 'address'];
        for (const field of required) {
            if (!body[field] || body[field].trim() === '') {
                return NextResponse.json(
                    { success: false, error: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        // Phone validation (basic)
        const phone = body.phone.replace(/\s+/g, '');
        if (phone.length < 10) {
            return NextResponse.json(
                { success: false, error: 'Please enter a valid phone number' },
                { status: 400 }
            );
        }

        // If no Google Script URL configured, log and return success
        if (!GOOGLE_SCRIPT_URL) {
            console.log('📋 New Order (no Google Sheet configured):', JSON.stringify(body, null, 2));
            return NextResponse.json({
                success: true,
                message: 'Order received (Google Sheet not configured yet)',
            });
        }

        // Forward to Google Apps Script
        const res = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            throw new Error(`Google Script responded with ${res.status}`);
        }

        return NextResponse.json({ success: true, message: 'Order submitted successfully' });

    } catch (error) {
        console.error('Order submission error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit order. Please try again.' },
            { status: 500 }
        );
    }
}

/*
═══════════════════════════════════════════════════════════════
  GOOGLE APPS SCRIPT SETUP GUIDE
═══════════════════════════════════════════════════════════════

1. Go to https://sheets.google.com and create a new sheet
   - Name it "Miltz Orders"
   - Add these headers in Row 1:
     Timestamp | Vendor Name | Business Name | Phone | Email | Product | SKU | Quantity | Address | Notes

2. Go to Extensions → Apps Script

3. Replace the default code with:

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.vendorName || '',
    data.businessName || '',
    data.phone || '',
    data.email || '',
    data.product || '',
    data.sku || '',
    data.quantity || '',
    data.address || '',
    data.notes || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

4. Click Deploy → New Deployment
   - Type: Web App
   - Execute as: Me
   - Who has access: Anyone
   - Click Deploy

5. Copy the Web App URL

6. Create a .env.local file in your project root:
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

7. Restart dev server — orders will now flow to your Google Sheet!

═══════════════════════════════════════════════════════════════
*/
