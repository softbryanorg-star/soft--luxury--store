import API from '../utils/api';

export default function usePaystack() {
	const initiatePayment = async (orderId, email) => {
		if (!orderId) throw new Error('orderId required');
		try {
			const res = await API.post('/api/payments/paystack/initiate', { orderId, email });
			return res.data; // { authorization_url, access_code, reference }
		} catch (err) {
			console.error('initiatePayment error', err?.response?.data || err.message || err);
			throw err;
		}
	};

	return { initiatePayment };
}

/*

The usePaystack hook abstracts payment initiation away from the UI.
It sends only a trusted order reference to the backend, where the amount is recalculated and Paystack is contacted using secret keys.
The frontend never handles sensitive payment logic — it only redirects the user using the authorization URL returned by the server.
This design prevents tampering, protects secrets, and keeps the payment flow secure.
*/


/*
When a customer wants to pay, my website does not touch their money 
or card details directly.

Instead, my system first creates an order and calculates the correct total on the server.
Then it asks Paystack to handle the payment securely.

Paystack redirects the customer to their own secure payment page. After payment,
 Paystack sends a private confirmation message directly to my server 
 to confirm that the money was actually received.
Only after that confirmation do I mark the order as paid. 
This keeps the system secure and prevents fake payments or fraud.


“HOW DID YOU ACHIEVE PAYSTACK INTEGRATION?” 

✅ Perfect Answer

I integrated Paystack by using a server-controlled payment flow.

The frontend only requests payment using an order ID. The backend recalculates the amount, securely initializes the payment using Paystack’s secret key, and returns a payment link.

After payment, Paystack sends a signed webhook to my backend, which I verify before updating the order status.

This ensures payments are secure, verifiable, and tamper-proof.


SIMPLE STEP-BY-STEP (FOR CLARITY)



User clicks Proceed to Payment

Backend creates an order and calculates total

Backend contacts Paystack securely

User is redirected to Paystack’s payment page

Paystack confirms payment via webhook

Backend verifies and marks order as paid




I used Paystack by letting my backend control the payment process.
The frontend only triggers payment, Paystack handles the transaction, 
and my server confirms it before marking an order as paid.
*/



