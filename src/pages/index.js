/* 
Developed by: Nitesh Khadka
Date: 2/18/2025

This project involves creating a single-page web application that displays a list of students using JSON data. 
The application includes a custom static navbar, a student list, and a footer containing school information.
Each student entry will display their first and last name, date of birth, and current grade. 
A form will be provided to allow users to add new students dynamically. 
The goal is to create a simple and functional interface for managing student records.


*/

import { useState } from "react";
import NavBar from "../Components/Navbar";
import AddStudentForm from "../Components/AddStudentForm";
import Footer from "../Components/Footer";
import initialStudents from "../student.json";

export default function Home() {
  // Local state for student list so that new additions update the UI.
  const [students, setStudents] = useState(initialStudents);

  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  return (
    <div>
      <NavBar />
      <main style={{ padding: "1rem" }}>
        <div>
          {students.map((student) => (
            <div
              key={student.id}
              style={{
                marginBottom: "1rem",
                border: "1px solid #9E9E9E",
                padding: "0.5rem",
              }}
            >
              <strong>
                {student.firstName} {student.lastName}
              </strong>
              <p>Birthdate: {student.bday}</p>
              <p>Grade: {student.grade}</p>
            </div>
          ))}
        </div>
        <AddStudentForm onAdd={handleAddStudent} />
      </main>
      <Footer />
    </div>
  );
}
