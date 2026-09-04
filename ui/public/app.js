const API_URL =
    window.API_URL ||
    (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000/api"
        : "https://jagruthi-ui-api.azurewebsites.net/api");

const leaveForm = document.getElementById("leaveForm");
const leaveTableBody = document.getElementById("leaveTableBody");
const message = document.getElementById("message");

async function checkApiHealth() {
    try {
        const response = await fetch(`${API_URL}/health`);

        if (!response.ok) {
            throw new Error("API health check failed");
        }

        return true;
    } catch (error) {
        showMessage(
            "Cannot connect to API. Make sure the API is running.",
            "error"
        );

        return false;
    }
}

async function loadDashboard() {
    try {
        const response = await fetch(`${API_URL}/dashboard`);

        if (!response.ok) {
            throw new Error("Dashboard request failed");
        }

        const data = await response.json();

        document.getElementById("totalEmployees").textContent =
            data.totalEmployees;

        document.getElementById("totalLeaves").textContent =
            data.totalLeaves;

        document.getElementById("pendingLeaves").textContent =
            data.pendingLeaves;

        document.getElementById("approvedLeaves").textContent =
            data.approvedLeaves;

        document.getElementById("rejectedLeaves").textContent =
            data.rejectedLeaves;
    } catch (error) {
        console.error("Dashboard error:", error);
    }
}

async function loadLeaves() {
    try {
        const response = await fetch(`${API_URL}/leaves`);

        if (!response.ok) {
            throw new Error("Failed to load leaves");
        }

        const leaves = await response.json();

        if (leaves.length === 0) {
            leaveTableBody.innerHTML = `
                <tr>
                    <td colspan="9">No leave requests found.</td>
                </tr>
            `;
            return;
        }

        leaveTableBody.innerHTML = leaves.map(leave => `
            <tr>
                <td>${leave.id}</td>
                <td>${escapeHtml(leave.employeeName)}</td>
                <td>${escapeHtml(leave.employeeUniqueId)}</td>
                <td>${escapeHtml(leave.leaveType)}</td>
                <td>${escapeHtml(leave.fromDate)}</td>
                <td>${escapeHtml(leave.toDate)}</td>
                <td>${escapeHtml(leave.reason)}</td>
                <td class="status ${getStatusClass(leave.status)}">
                    ${escapeHtml(leave.status)}
                </td>
                <td>
                    <button
                        class="action-button approve"
                        onclick="approveLeave(${leave.id})"
                    >
                        Approve
                    </button>

                    <button
                        class="action-button reject"
                        onclick="rejectLeave(${leave.id})"
                    >
                        Reject
                    </button>

                    <button
                        class="action-button delete"
                        onclick="deleteLeave(${leave.id})"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Load leaves error:", error);

        leaveTableBody.innerHTML = `
            <tr>
                <td colspan="9">
                    Failed to load leave requests.
                </td>
            </tr>
        `;
    }
}

leaveForm.addEventListener("submit", async event => {
    event.preventDefault();

    const employeeName =
        document
            .getElementById("employeeName")
            .value
            .trim();

    const employeeUniqueId =
        document
            .getElementById("employeeUniqueId")
            .value
            .trim()
            .toUpperCase();

    const leaveType =
        document
            .getElementById("leaveType")
            .value;

    const fromDate =
        document
            .getElementById("fromDate")
            .value;

    const toDate =
        document
            .getElementById("toDate")
            .value;

    const reason =
        document
            .getElementById("reason")
            .value
            .trim();

    const data = {
        employeeName,
        employeeUniqueId,
        leaveType,
        fromDate,
        toDate,
        reason
    };

    try {
        showMessage("Submitting leave request...", "info");

        const response = await fetch(`${API_URL}/leaves`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to submit leave request"
            );
        }

        showMessage(
            "Leave request submitted successfully.",
            "success"
        );

        document.getElementById("leaveType").value = "";
        document.getElementById("fromDate").value = "";
        document.getElementById("toDate").value = "";
        document.getElementById("reason").value = "";

        await loadLeaves();
        await loadDashboard();
    } catch (error) {
        console.error("Submit leave error:", error);

        showMessage(
            error.message || "Failed to submit leave request.",
            "error"
        );
    }
});

async function updateLeaveStatus(id, action) {
    try {
        const response = await fetch(
            `${API_URL}/leaves/${id}/${action}`,
            {
                method: "PUT"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to update leave"
            );
        }

        showMessage(
            result.message || "Leave updated successfully.",
            "success"
        );

        await loadLeaves();
        await loadDashboard();
    } catch (error) {
        console.error("Update leave error:", error);

        showMessage(
            error.message || "Failed to update leave.",
            "error"
        );
    }
}

async function approveLeave(id) {
    await updateLeaveStatus(id, "approve");
}

async function rejectLeave(id) {
    await updateLeaveStatus(id, "reject");
}

async function deleteLeave(id) {
    const confirmed = window.confirm(
        "Are you sure you want to delete this leave request?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}/leaves/${id}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to delete leave"
            );
        }

        showMessage(
            result.message || "Leave deleted successfully.",
            "success"
        );

        await loadLeaves();
        await loadDashboard();
    } catch (error) {
        console.error("Delete leave error:", error);

        showMessage(
            error.message || "Failed to delete leave.",
            "error"
        );
    }
}

function getStatusClass(status) {
    if (status === "Pending") {
        return "status-pending";
    }

    if (status === "Approved") {
        return "status-approved";
    }

    if (status === "Rejected") {
        return "status-rejected";
    }

    return "";
}

function showMessage(text, type) {
    message.innerHTML = `
        <div class="message ${type}">
            ${escapeHtml(text)}
        </div>
    `;

    if (type === "success") {
        setTimeout(() => {
            message.innerHTML = "";
        }, 4000);
    }
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function initialize() {
    const apiRunning = await checkApiHealth();

    if (!apiRunning) {
        return;
    }

    await loadDashboard();
    await loadLeaves();
}

initialize();
