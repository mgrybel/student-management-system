import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { Student } from '../types';

type DialogFormProps = {
  student: Student;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StudentDialogContent = ({ student, handleChange }: DialogFormProps) => {
  return (
    <DialogContent>
      <Stack spacing={2} mt={1}>
        <TextField
          label='First Name'
          name='firstName'
          value={student.firstName}
          onChange={handleChange}
        />
        <TextField
          label='Last Name'
          name='lastName'
          value={student.lastName}
          onChange={handleChange}
        />
        <TextField
          label='Email'
          name='email'
          value={student.email}
          onChange={handleChange}
        />
        <TextField
          label='Field of Study'
          name='fieldOfStudy'
          value={student.fieldOfStudy}
          onChange={handleChange}
        />
        <TextField
          label='Student Number'
          name='studentNumber'
          value={student.studentNumber}
          onChange={handleChange}
        />
        <TextField
          label='GPA'
          name='gpa'
          value={student.gpa}
          onChange={handleChange}
        />
      </Stack>
    </DialogContent>
  );
};

export default StudentDialogContent;
