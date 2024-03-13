import axios from 'axios';

import { StudentResponse } from '../types';

export const getStudents = async (): Promise<StudentResponse> => {
  const response = await axios.get('http://localhost:8080/api/students');

  return response.data._embedded.students;
};
