import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';

import { getStudents, deleteStudent } from '../api/StudentApi';
import AddStudent from './AddStudent';

const StudentList = () => {
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
    { field: 'firstName', headerName: 'First Name', width: 230 },
    { field: 'lastName', headerName: 'Last Name', width: 230 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'fieldOfStudy', headerName: 'Field of Study', width: 230 },
    { field: 'studentNumber', headerName: 'Student Number', width: 230 },
    { field: 'gpa', headerName: 'GPA', width: 230 },
    {
      field: 'delete',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <button
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
          Delete
        </button>
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
        <AddStudent />
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
