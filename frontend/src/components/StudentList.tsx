import { useQuery } from '@tanstack/react-query';

import { StudentResponse } from '../types';
import { getStudents } from '../api/StudentApi';

const StudentList = () => {
  const { data, error, isSuccess } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  });

  if (!isSuccess) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching students...</span>;
  } else {
    return (
      <table>
        <tbody>
          {data.map((student: StudentResponse) => (
            <tr key={student._links.self.href}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.fieldOfStudy}</td>
              <td>{student.studentNumber}</td>
              <td>{student.gpa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default StudentList;
