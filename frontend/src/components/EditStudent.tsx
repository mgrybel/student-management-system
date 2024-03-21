import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';

import { Student, StudentEntry, StudentResponse } from '../types';
import { updateStudent } from '../api/StudentApi';
import StudentDialogContent from './StudentDialogContent';

type FormProps = {
  studentdata: StudentResponse;
};

const EditStudent = ({ studentdata }: FormProps) => {
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

  const { mutate } = useMutation(updateStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  const handleClickOpen = () => {
    setStudent({
      firstName: studentdata.firstName,
      lastName: studentdata.lastName,
      email: studentdata.email,
      fieldOfStudy: studentdata.fieldOfStudy,
      studentNumber: studentdata.studentNumber,
      gpa: studentdata.gpa,
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = studentdata._links.self.href;
    const studentEntry: StudentEntry = { student, url };
    mutate(studentEntry);
    setStudent({
      firstName: '',
      lastName: '',
      email: '',
      fieldOfStudy: '',
      studentNumber: 0,
      gpa: 0,
    });

    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Tooltip title='Edit student'>
        <IconButton aria-label='edit' size='small' onClick={handleClickOpen}>
          <EditIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit student</DialogTitle>
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

export default EditStudent;
