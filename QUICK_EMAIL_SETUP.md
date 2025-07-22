# 📧 Email Setup Instructions for ShopHub

## Quick Setup Guide

### Step 1: Create EmailJS Account
1. Visit: https://www.emailjs.com/
2. Click "Sign Up" and create account
3. Verify your email

### Step 2: Connect Gmail (Easiest Option)
1. In EmailJS dashboard → "Email Services"
2. Click "Add New Service" 
3. Select "Gmail"
4. Click "Connect Account" and authorize EmailJS
5. Note down your **Service ID** (e.g., service_abc123)

### Step 3: Create Email Template
1. Go to "Email Templates" 
2. Click "Create New Template"
3. Copy and paste this template:

```
Subject: Order Confirmation - {{order_number}}

Dear {{customer_name}},

Thank you for your order from ShopHub! 

ORDER DETAILS:
• Order Number: {{order_number}}
• Order Date: {{order_date}}
• Estimated Delivery: {{estimated_delivery}}

SHIPPING TO:
{{shipping_address}}

ITEMS ORDERED:
{{items_list}}

ORDER SUMMARY:
• Subtotal: {{subtotal}}
• Shipping: {{shipping}}
• Tax: {{tax}}
• TOTAL: {{order_total}}

Payment Method: {{payment_method}}

We'll email you tracking information once your order ships.

Questions? Reply to this email or call us!

Best regards,
The ShopHub Team
```

4. Click "Save" and note your **Template ID** (e.g., template_xyz789)

### Step 4: Get Your Public Key
1. Go to "API Keys" section
2. Copy your **Public Key** (e.g., user_abcdefghijk)

### Step 5: Update Your Website
1. Open `script.js` file
2. Find line 1043 and replace:

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';     // Your Service ID here
const EMAILJS_TEMPLATE_ID = 'template_xyz789';   // Your Template ID here  
const EMAILJS_PUBLIC_KEY = 'user_abcdefghijk';   // Your Public Key here
```

### Step 6: Test It!
1. Save the file
2. Open your website
3. Add items to cart
4. Go through checkout
5. Place a test order
6. Check if you receive the email!

## Example Configuration

After setup, your code should look like this:

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';     // Your actual Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789';   // Your actual Template ID  
const EMAILJS_PUBLIC_KEY = 'user_abcdefghijk';   // Your actual Public Key
```

## Troubleshooting

**No email received?**
- Check spam/junk folder
- Verify all IDs are correct
- Check browser console for errors
- Make sure Gmail account is verified

**Getting errors?**
- Double-check Service ID, Template ID, and Public Key
- Ensure template variables match exactly
- Check EmailJS dashboard for sending limits

**Still not working?**
- Test with a simple template first
- Verify email service connection
- Contact EmailJS support

## Free Limits
- **EmailJS Free Plan**: 100 emails/month
- **Gmail**: No additional limits
- **Perfect for small stores!**

---

🎉 **Once configured, customers will automatically receive professional order confirmation emails!**

Need help? Check the browser console for error messages.
