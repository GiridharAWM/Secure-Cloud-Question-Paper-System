async function approvePaper() {

    try {

        const paperId = Number(document.getElementById("approvePaperId").value);

        if (!paperId) {
            return alert("Please enter a valid Paper ID.");
        }

        const result = await apiRequest("/papers/approve", {
            method: "POST",
            body: JSON.stringify({
                paperId
            })
        });

        alert(result.message);

        document.getElementById("approvePaperId").value = "";

    } catch (err) {

        alert(err.message);

    }

}

async function scheduleExam() {

    try {

        const paperId = Number(document.getElementById("schedulePaperId").value);
        const examTime = document.getElementById("examTime").value;

        if (!paperId || !examTime) {
            return alert("Please select Paper ID and Exam Date & Time.");
        }

        const result = await apiRequest("/papers/schedule", {
            method: "POST",
            body: JSON.stringify({
                paperId,
                exam_time: examTime
            })
        });

        document.getElementById("scheduleSuccess").style.display = "block";

        document.getElementById("schedulePaperId").value = "";
        document.getElementById("examTime").value = "";

    } catch (err) {

        alert(err.message);

    }

}