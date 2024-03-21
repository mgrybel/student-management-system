import axios from 'axios';

import { StudentResponse, Student, StudentEntry } from '../types';

export const getStudents = async (): Promise<StudentResponse[]> => {
  const response = await axios.get('http://localhost:8080/api/students');

  return response.data._embedded.students;
};

export const deleteStudent = async (link: string): Promise<StudentResponse> => {
  const response = await axios.delete(link);
  return response.data;
};

export const addStudent = async (
  student: Student
): Promise<StudentResponse> => {
  const response = await axios.post(
    'http://localhost:8080/api/students',
    student,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const updateStudent = async (
  studentEntry: StudentEntry
): Promise<StudentResponse> => {
  const response = await axios.put(studentEntry.url, studentEntry.student, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
