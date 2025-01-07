const apiUrl = process.env.REACT_APP_SERVER_URL;
export const register = async (payload) => {
	try {
		const response = await fetch(apiUrl + '/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(payload),
		});
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (e) {
		return {
			error: e.message,
		};
	}
};
export const login = async (payload) => {
	try {
		const response = await fetch(apiUrl + '/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(payload),
		});
		const jsonResponse = await response.json();
		return jsonResponse;
	} catch (e) {
		return {
			error: e.message,
		};
	}
};
