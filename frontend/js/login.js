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

        showToast("Login successful.");

        const routes = {
            "Question Setter": "/setter",
            "Reviewer": "/reviewer",
            "Examination Authority": "/authority",
            "Security Administrator": "/security"
        };

        setTimeout(() => {
            window.location.href = routes[response.role] || "/";
        }, 800);

    } catch (err) {

        showToast(err.message, "error");

    }

});