const apiUrl = process.env.REACT_APP_SERVER_URL;
export const createAnalyze = async (payload) => {
  try {
    const response = await fetch(apiUrl + "/analysis", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
      body: payload,
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

export const getAllAnayzesByUser = async (payload) => {
  try {
    const response = await fetch(apiUrl + "/analysis", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
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
