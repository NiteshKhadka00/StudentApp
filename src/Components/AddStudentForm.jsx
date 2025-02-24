import { useState } from "react";

export default function AddStudentForm({ onAdd }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [grade, setGrade] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Input validations
  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!dob) newErrors.dob = "Date of birth is required.";
    else if (isNaN(Date.parse(dob))) newErrors.dob = "Invalid date format.";

    // Grade validations
    if (!grade.trim()) {
      newErrors.grade = "Grade is required.";
    } else if (isNaN(grade) || grade < 1 || grade > 5) {
      newErrors.grade = "Grade must be a number between 1 and 5.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    //convert into fix 1 decimal
    const formattedGrade = parseFloat(grade).toFixed(1);
    // Handle the input data before sending
    const newStudent = {
      firstName,
      lastName,
      dob,
      grade: formattedGrade,
    };

    try {
      // Fetch endpoint
      const response = await fetch("/api/addStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send the data
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        const result = await response.json();
        onAdd(result.student);
        // Reset form fields after successful submission
        setFirstName("");
        setLastName("");
        setDob("");
        setGrade("");
        setErrors({});
        setSuccessMessage("Student added successfully!");

        // Clear the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 p-6 border border-gray-300 rounded-lg shadow-lg bg-white w-full max-w-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Student</h2>

      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-400 rounded">
          {successMessage}
        </div>
      )}

      <div className="mb-4">
        <label className="block font-medium mb-1">First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm">{errors.firstName}</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.lastName && (
          <span className="text-red-500 text-sm">{errors.lastName}</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.dob && (
          <span className="text-red-500 text-sm">{errors.dob}</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Grade:</label>
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.grade && (
          <span className="text-red-500 text-sm">{errors.grade}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Add Student
      </button>
    </form>
  );
}
