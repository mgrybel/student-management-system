import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { Student } from '../types';
import { addStudent } from '../api/StudentApi';
import StudentDialogContent from './StudentDialogContent';

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
      <Button variant='outlined' onClick={handleClickOpen}>
        New Student
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New student</DialogTitle>
        <StudentDialogContent student={student} handleChange={handleChange} />
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddStudent;
