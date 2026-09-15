document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const response = await apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        localStorage.setItem("token", response.token);

        const routes = {
            "Question Setter": "/setter.html",
            "Reviewer": "/reviewer.html",
            "Examination Authority": "/authority.html",
            "Security Administrator": "/security.html"
        };

        window.location.href = routes[response.role] || "/";
    } catch (err) {
        alert(err.message);
    }
});