import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Student } from '../types';
import { addStudent } from '../api/StudentApi';

const AddStudent = () => {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState<Student>({
    firstName: '',
    lastName: '',
    email: '',
    fieldOfStudy: '',
    studentNumber: 0,
    gpa: 0,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    mutate(student);
    setStudent({
      firstName: '',
      lastName: '',
      email: '',
      fieldOfStudy: '',
      studentNumber: 0,
      gpa: 0,
    });
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  return (
    <>
      <button onClick={handleClickOpen}>New Student</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New student</DialogTitle>
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
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddStudent;
