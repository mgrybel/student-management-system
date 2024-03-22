import axios, { AxiosRequestConfig } from 'axios';

import { StudentResponse, Student, StudentEntry } from '../types';

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem('jwt');

  return {
    headers: {
      // prettier-ignore
      'Authorization': token,
      'Content-Type': 'application/json',
    },
  };
};

export const getStudents = async (): Promise<StudentResponse[]> => {
  const response = await axios.get(
    'http://localhost:8080/api/students',
    getAxiosConfig()
  );

  return response.data._embedded.students;
};

export const deleteStudent = async (link: string): Promise<StudentResponse> => {
  const response = await axios.delete(link, getAxiosConfig());
  return response.data;
};

export const addStudent = async (
  student: Student
): Promise<StudentResponse> => {
  const response = await axios.post(
    'http://localhost:8080/api/students',
    student,
    getAxiosConfig()
  );
  return response.data;
};

export const updateStudent = async (
  studentEntry: StudentEntry
): Promise<StudentResponse> => {
  const response = await axios.put(
    studentEntry.url,
    studentEntry.student,
    getAxiosConfig()
  );
  return response.data;
};
