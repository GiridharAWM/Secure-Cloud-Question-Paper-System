let currentPaperId = null;

window.onload = loadPendingPapers;

async function loadPendingPapers() {

    try {

        const papers = await apiRequest("/papers/pending");

        const table = document.getElementById("papersTable");
        table.innerHTML = "";

        if (papers.length === 0) {

            table.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    No pending papers available.
                </td>
            </tr>`;

            return;

        }

        papers.forEach(paper => {

            table.innerHTML += `
            <tr>
                <td>${paper.id}</td>
                <td>${paper.title || "Untitled Paper"}</td>
                <td><span class="status created">${paper.status}</span></td>
                <td>
                    <button class="review-btn"
                        onclick="selectPaper(${paper.id})">
                        Review
                    </button>
                </td>
            </tr>`;

        });

    } catch (err) {

        showToast(err.message, "error");

    }

}

function selectPaper(id) {

    currentPaperId = id;

    document.getElementById("reviewBox").style.display = "block";
    document.getElementById("selectedPaperId").textContent = id;

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}

async function submitReview() {

    try {

        const comments = document.getElementById("comments").value.trim();

        if (!comments) {
            return showToast("Please enter review comments.", "error");
        }

        const result = await apiRequest("/papers/review", {
            method: "POST",
            body: JSON.stringify({
                paperId: currentPaperId,
                comments
            })
        });

        showToast(result.message);

        document.getElementById("comments").value = "";
        document.getElementById("reviewBox").style.display = "none";

        currentPaperId = null;

        loadPendingPapers();

    } catch (err) {

        showToast(err.message, "error");

    }

}