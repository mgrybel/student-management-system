import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import StudentList from './components/StudentList';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Container maxWidth='xl'>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>Student Management System</Typography>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
        <StudentList />
      </QueryClientProvider>
    </Container>
  );
};

export default App;
