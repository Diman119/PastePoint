export async function ApiService(url, params = { headers: {} }) {
  const refreshToken = window.localStorage.getItem("refresh");
  const accessToken = window.localStorage.getItem("access");

  const newParams = {...params};
  if (accessToken) {
    newParams.headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`http://127.0.0.1:8000/api/${url}`, newParams);

  if (response.status === 401 && refreshToken) {
    const refreshData = await fetch(
      `http://127.0.0.1:8000/api/token/refresh/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({refresh: refreshToken}),
      }
    );
    const { access: newAccessToken } = await refreshData.json();
    window.localStorage.setItem("access", newAccessToken);

    newParams.headers.Authorization = `Bearer ${newAccessToken}`;
    const newResponse = await fetch(`http://127.0.0.1:8000/api/${url}`, newParams);
    return await newResponse.json();
  }

  return await response.json();
}
