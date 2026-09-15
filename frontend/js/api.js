const API = "http://localhost:5000/api";

async function apiRequest(path, options = {}) {

    const token = localStorage.getItem("token");

    options.headers = {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    const response = await fetch(API + path, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
}

function logout() {
    localStorage.clear();
    window.location.href = "/";
}