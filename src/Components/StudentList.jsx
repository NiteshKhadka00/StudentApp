// Import student data from the JSON file
import studentsData from "../student.json";

// Define the StudentList component to render a list of students
export default function StudentList() {
  return (
    <div>
      {/* Map through the studentsData array by id */}
      {studentsData.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}
