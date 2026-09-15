window.onload = loadLogs;

async function loadLogs() {

    try {

        const logs = await apiRequest("/audit/logs");

        const table = document.getElementById("logsTable");
        table.innerHTML = "";

        let created = 0;
        let reviewed = 0;
        let approved = 0;

        logs.forEach(log => {

            table.innerHTML += `
            <tr>
                <td>${log.full_name || "System"}</td>
                <td>${log.action}</td>
                <td>${log.timestamp}</td>
            </tr>`;

            if (log.action.includes("Created")) created++;
            if (log.action.includes("Reviewed")) reviewed++;
            if (log.action.includes("Approved")) approved++;

        });

        document.getElementById("totalLogs").textContent = logs.length;
        document.getElementById("createdCount").textContent = created;
        document.getElementById("reviewedCount").textContent = reviewed;
        document.getElementById("approvedCount").textContent = approved;

        showToast("Audit logs refreshed.");

    } catch (err) {

        showToast(err.message, "error");

    }

}