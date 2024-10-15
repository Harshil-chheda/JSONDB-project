// index.js

// Base URL of the API (make sure to set your actual API URL here)
const baseUrl = "http://api.login2explore.com:5577"; // Adjust this as needed
const token = "90934500|-31949223286434454|90962837"; // Replace with your actual token

// Get references to the form input elements
const rollNoInput = document.getElementById("rollNo");
const fullNameInput = document.getElementById("fullName");
const classInput = document.getElementById("class");
const birthDateInput = document.getElementById("birthDate");
const addressInput = document.getElementById("address");
const enrollmentDateInput = document.getElementById("enrollmentDate");

// Get references to the buttons
const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");
const resetBtn = document.getElementById("resetBtn");


// Validate the form inputs
function validateForm() {
    return rollNoInput.value && fullNameInput.value && classInput.value &&
           birthDateInput.value && addressInput.value && enrollmentDateInput.value;
}

// Save student data to the database
function saveStudentData() {
    if (!validateForm()) {
        alert("Please fill all fields.");
        return;
    }

    const studentData = {
        rollNo: rollNoInput.value,
        fullName: fullNameInput.value,
        class: classInput.value,
        birthDate: birthDateInput.value,
        address: addressInput.value,
        enrollmentDate: enrollmentDateInput.value
    };

    const reqData = JSON.stringify({
        dbName: "SCHOOL-DB",
        relationName: "STUDENT-TABLE",
        jsonStr: studentData
    });

    const saveUrl = '${baseUrl}/api/iml';

    const req = new XMLHttpRequest();
    req.open("POST", saveUrl, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization", `Bearer ${token}`); // Ensure the token is included correctly
    req.setRequestHeader("X-Requested-With", "XMLHttpRequest"); // Add this header

    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                alert("Student data saved successfully!");
                resetForm();
            } else {
                alert("Failed to save data. Response: " + this.responseText);
            }
        }
    };

    req.send(reqData);
}

// Update existing student data
function updateStudentData() {
    if (!validateForm()) {
        alert("Please fill all fields.");
        return;
    }

    const studentData = {
        rollNo: rollNoInput.value,
        fullName: fullNameInput.value,
        class: classInput.value,
        birthDate: birthDateInput.value,
        address: addressInput.value,
        enrollmentDate: enrollmentDateInput.value
    };

    const reqData = JSON.stringify({
        dbName: "SCHOOL-DB",
        relationName: "STUDENT-TABLE",
        jsonStr: studentData
    });

    const updateUrl = `${baseUrl}/api/iml`; // Adjust endpoint accordingly

    const req = new XMLHttpRequest();
    req.open("POST", updateUrl, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization", `Bearer ${token}`); // Ensure the token is included correctly
    req.setRequestHeader("X-Requested-With", "XMLHttpRequest"); // Add this header

    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                alert("Student data updated successfully!");
                resetForm();
            } else {
                alert("Failed to update data. Response: " + this.responseText);
            }
        }
    };

    req.send(reqData);
}

// Reset the form
function resetForm() {
    rollNoInput.value = "";
    fullNameInput.value = "";
   
    birthDateInput.value = "";
    addressInput.value = "";
    enrollmentDateInput.value = "";
    
    // Resetting the state of the form
    fullNameInput.disabled = false; // Enable fields for input

    birthDateInput.disabled = false;
    addressInput.disabled = false;
    enrollmentDateInput.disabled = false;
    
    saveBtn.disabled = false; // Enable Save button
   
    resetBtn.disabled = false; // Enable Reset button
    
    rollNoInput.focus();
}

// Initialize the form on page load
document.addEventListener("DOMContentLoaded", function () {
    resetForm(); // Call resetForm to initialize the form
});
