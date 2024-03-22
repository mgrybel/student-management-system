import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

import { getStudents, deleteStudent } from '../api/StudentApi';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

type StudentListProps = {
  logOut?: () => void;
};

const StudentList = ({ logOut }: StudentListProps) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  });

  const { mutate } = useMutation(deleteStudent, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'fieldOfStudy', headerName: 'Field of Study', width: 200 },
    { field: 'studentNumber', headerName: 'Student Number', width: 150 },
    { field: 'gpa', headerName: 'GPA', width: 150 },
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditStudent studentdata={params.row} />
      ),
    },
    {
      field: 'delete',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <Tooltip title='Delete student'>
          <IconButton
            aria-label='delete'
            size='small'
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete ${params.row.firstName} ${params.row.lastName}?`
                )
              ) {
                mutate(params.row._links.student.href);
              }
            }}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (isError) {
    return <span>Error when fetching students...</span>;
  }
  if (!isSuccess) {
    return <span>Loading...</span>;
  } else if (isSuccess) {
    return (
      <>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <AddStudent />
          <Button onClick={logOut}>Log Out</Button>
        </Stack>
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message='Student deleted'
        />
      </>
    );
  }
};

export default StudentList;
