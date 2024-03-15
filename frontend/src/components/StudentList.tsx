import { useQuery } from '@tanstack/react-query';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { getStudents } from '../api/StudentApi';

const StudentList = () => {
  const { data, error, isSuccess } = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  });

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'fieldOfStudy', headerName: 'Field of Study', width: 200 },
    { field: 'studentNumber', headerName: 'Student Number', width: 150 },
    { field: 'gpa', headerName: 'GPA', width: 150 },
  ];

  if (!isSuccess) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching students...</span>;
  } else {
    return (
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._links.self.href}
      />
    );
  }
};

export default StudentList;
