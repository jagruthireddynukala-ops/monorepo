const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const employees = [
    {
        id: 1,
        uniqueId: "EMP001",
        name: "Jagruthi",
        department: "Cloud & DevOps",
        email: "jagruthi@example.com"
    },
    {
        id: 2,
        uniqueId: "EMP002",
        name: "Rahul",
        department: "Engineering",
        email: "rahul@example.com"
    },
    {
        id: 3,
        uniqueId: "EMP003",
        name: "Priya",
        department: "HR",
        email: "priya@example.com"
    },
    {
        id: 4,
        uniqueId: "EMP004",
        name: "Arjun",
        department: "Finance",
        email: "arjun@example.com"
    }
];

let leaves = [
    {
        id: 1,
        employeeId: 1,
        employeeUniqueId: "EMP001",
        employeeName: "Jagruthi",
        leaveType: "Casual Leave",
        fromDate: "2026-09-10",
        toDate: "2026-09-11",
        reason: "Personal work",
        status: "Pending"
    },
    {
        id: 2,
        employeeId: 2,
        employeeUniqueId: "EMP002",
        employeeName: "Rahul",
        leaveType: "Sick Leave",
        fromDate: "2026-09-05",
        toDate: "2026-09-06",
        reason: "Not feeling well",
        status: "Approved"
    },
    {
        id: 3,
        employeeId: 3,
        employeeUniqueId: "EMP003",
        employeeName: "Priya",
        leaveType: "Casual Leave",
        fromDate: "2026-09-15",
        toDate: "2026-09-16",
        reason: "Family function",
        status: "Rejected"
    }
];

let nextLeaveId = 4;

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Employee Leave API is running"
    });
});

app.get("/api/dashboard", (req, res) => {
    const total = leaves.length;
    const pending = leaves.filter(l => l.status === "Pending").length;
    const approved = leaves.filter(l => l.status === "Approved").length;
    const rejected = leaves.filter(l => l.status === "Rejected").length;

    res.json({
        totalEmployees: employees.length,
        totalLeaves: total,
        pendingLeaves: pending,
        approvedLeaves: approved,
        rejectedLeaves: rejected
    });
});

app.get("/api/employees", (req, res) => {
    res.json(employees);
});

app.get("/api/employees/:id", (req, res) => {
    const employee = employees.find(
        emp => emp.id === Number(req.params.id)
    );

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    res.json(employee);
});

app.get("/api/leaves", (req, res) => {
    res.json(leaves);
});

app.get("/api/leaves/:id", (req, res) => {
    const leave = leaves.find(
        item => item.id === Number(req.params.id)
    );

    if (!leave) {
        return res.status(404).json({
            message: "Leave request not found"
        });
    }

    res.json(leave);
});

app.post("/api/leaves", (req, res) => {
    const {
        employeeName,
        employeeUniqueId,
        leaveType,
        fromDate,
        toDate,
        reason
    } = req.body;

    if (
        !employeeName ||
        !employeeUniqueId ||
        !leaveType ||
        !fromDate ||
        !toDate ||
        !reason
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (new Date(toDate) < new Date(fromDate)) {
        return res.status(400).json({
            message: "To Date cannot be before From Date"
        });
    }

    const employee = employees.find(emp =>
        emp.name.toLowerCase() === employeeName.trim().toLowerCase() &&
        emp.uniqueId.toUpperCase() === employeeUniqueId.trim().toUpperCase()
    );

    if (!employee) {
        return res.status(404).json({
            message: "Employee Name and Unique ID do not match"
        });
    }

    const newLeave = {
        id: nextLeaveId++,
        employeeId: employee.id,
        employeeName: employee.name,
        employeeUniqueId: employee.uniqueId,
        leaveType: leaveType.trim(),
        fromDate,
        toDate,
        reason: reason.trim(),
        status: "Pending"
    };

    leaves.push(newLeave);

    res.status(201).json({
        message: "Leave request submitted successfully",
        leave: newLeave
    });
});

app.put("/api/leaves/:id/approve", (req, res) => {
    const leave = leaves.find(
        item => item.id === Number(req.params.id)
    );

    if (!leave) {
        return res.status(404).json({
            message: "Leave request not found"
        });
    }

    leave.status = "Approved";

    res.json({
        message: "Leave approved successfully",
        leave
    });
});

app.put("/api/leaves/:id/reject", (req, res) => {
    const leave = leaves.find(
        item => item.id === Number(req.params.id)
    );

    if (!leave) {
        return res.status(404).json({
            message: "Leave request not found"
        });
    }

    leave.status = "Rejected";

    res.json({
        message: "Leave rejected successfully",
        leave
    });
});

app.delete("/api/leaves/:id", (req, res) => {
    const index = leaves.findIndex(
        item => item.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Leave request not found"
        });
    }

    const deletedLeave = leaves.splice(index, 1)[0];

    res.json({
        message: "Leave deleted successfully",
        leave: deletedLeave
    });
});

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`Employee Leave API listening on port ${PORT}`);
});
