# 📧 EmailJS Setup Instructions - Next Steps

Since you already have an EmailJS account, here's exactly what to do next:

## Step 1: Connect Your Email Service
1. **Login to EmailJS** at https://dashboard.emailjs.com/
2. Click **"Email Services"** in the left sidebar
3. Click **"Add New Service"**
4. Choose **"Gmail"** (easiest option)
5. Click **"Connect Account"** and authorize EmailJS
6. **COPY YOUR SERVICE ID** (looks like `service_abc123`)

## Step 2: Create Email Template
1. Click **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. **Template Name**: Order Confirmation
4. **Copy this EXACT template**:

### Subject Line:
```
Order Confirmation - {{order_number}}
```

### Email Body:
```
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

Questions? Reply to this email or visit our website!

Best regards,
The ShopHub Team
```

5. Click **"Save"**
6. **COPY YOUR TEMPLATE ID** (looks like `template_xyz789`)

## Step 3: Get Your Public Key
1. Click **"API Keys"** in the left sidebar
2. **COPY YOUR PUBLIC KEY** (looks like `user_abcdefghijk`)

## Step 4: Update Your Code
1. Open `script.js` in your editor
2. Find line 1043 (around the `sendOrderConfirmationEmail` function)
3. Replace these three lines:

**BEFORE:**
```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';    // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';    // Replace with your Public Key
```

**AFTER:**
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';     // Your actual Service ID here
const EMAILJS_TEMPLATE_ID = 'template_xyz789';   // Your actual Template ID here
const EMAILJS_PUBLIC_KEY = 'user_abcdefghijk';   // Your actual Public Key here
```

## Step 5: Test Your Setup
1. **Save your script.js file**
2. Open your website in a browser
3. Add some products to cart
4. Go through the checkout process
5. Place a test order with **your real email address**
6. Check if you receive the confirmation email!

## ✅ Verification Checklist
- [ ] EmailJS account created ✅
- [ ] Gmail connected to EmailJS
- [ ] Email template created with exact content above
- [ ] Service ID copied and pasted in script.js
- [ ] Template ID copied and pasted in script.js
- [ ] Public Key copied and pasted in script.js
- [ ] Tested with real order

## 🚨 Important Notes
- Use your **real email** for testing
- Check **spam folder** if you don't see the email
- **Free plan** allows 100 emails/month (perfect for small stores)
- The template variables (like `{{order_number}}`) must match exactly

## 🔧 If Something Goes Wrong
1. **Check browser console** for error messages (F12 → Console tab)
2. **Verify all IDs** are correctly copied (no extra spaces)
3. **Test template** in EmailJS dashboard first
4. **Check EmailJS quota** - you might have hit the monthly limit

## 📞 Need Help?
If you get stuck, check the browser console (F12) for error messages. The most common issues are:
- Wrong Service ID, Template ID, or Public Key
- Template variables don't match
- Email service not properly connected

Once setup, **every customer will automatically receive professional order confirmation emails!** 🎉
