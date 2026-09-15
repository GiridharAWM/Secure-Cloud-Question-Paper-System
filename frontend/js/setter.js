async function createPaper() {
    try {
        const result = await apiRequest("/papers/create", {
            method: "POST",
            body: JSON.stringify({
                title: title.value.trim(),
                content: content.value.trim()
            })
        });

        // Show the success card
        document.getElementById("resultCard").style.display = "block";
        document.getElementById("paperId").textContent = result.paperId;
        document.getElementById("paperHash").textContent = result.hash;

        // Clear the form
        title.value = "";
        content.value = "";

    } catch (err) {
        alert(err.message);
    }
}