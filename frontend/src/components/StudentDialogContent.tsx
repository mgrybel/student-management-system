import React from 'react';
import DialogContent from '@mui/material/DialogContent';

import { Student } from '../types';

type DialogFormProps = {
  student: Student,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StudentDialogContent = ({ student, handleChange }: DialogFormProps) => {
  return (
    <DialogContent>
          <input
            placeholder='First Name'
            name='firstName'
            value={student.firstName}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder='Last Name'
            name='lastName'
            value={student.lastName}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder='Email'
            name='email'
            value={student.email}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder='Field of Study'
            name='fieldOfStudy'
            value={student.fieldOfStudy}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder='Student Number'
            name='studentNumber'
            value={student.studentNumber}
            onChange={handleChange}
          />
          <br />
          <input
            placeholder='GPA'
            name='gpa'
            value={student.gpa}
            onChange={handleChange}
          />
        </DialogContent>
  );
};

export default StudentDialogContent;