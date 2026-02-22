import axios from 'axios';

const API = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

export default function usePaystack() {
	const initiatePayment = async (orderId, email) => {
		if (!orderId) throw new Error('orderId required');
		try {
			const res = await axios.post(`${API}/api/payments/paystack/initiate`, { orderId, email });
			return res.data; // { authorization_url, access_code, reference }
		} catch (err) {
			console.error('initiatePayment error', err?.response?.data || err.message || err);
			throw err;
		}
	};

	return { initiatePayment };
}

