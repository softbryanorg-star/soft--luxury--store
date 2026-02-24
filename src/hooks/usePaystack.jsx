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

