import fs from "fs";
import path from "path";

//API route handler function
export default function handler(req, res) {
  //path to the student.json file
  const filePath = path.join(process.cwd(), "src", "student.json");

  if (req.method === "POST") {
    try {
      // Check if 'student.json' exists; if so, read its contents, otherwise use an empty array
      const fileData = fs.existsSync(filePath)
        ? fs.readFileSync(filePath)
        : "[]";
      // Parse the JSON data into a JS array
      const students = JSON.parse(fileData);

      // Create a new student object
      const newStudent = {
        id: Date.now(), // Use the current timestamp as a unique ID
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob, // Date of birth
        grade: req.body.grade,
      };

      // Add the new student to the array
      students.push(newStudent);
      // Convert the updated array back to JSON and write
      fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
      // Send a success response with the new student's data
      res
        .status(201)
        .json({ message: "Student added successfully!", student: newStudent });
    } catch (error) {
      res.status(500).json({ message: "Error saving student data", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
