import { CssBaseline } from '@material-ui/core';
import { NavBar } from './components/NavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Scheduler } from './components/pages/Scheduler';
import { Reports } from './components/pages/Reports';
import { NextMessages } from './components/pages/Upcoming';

const theme = createTheme({
  palette: {
    primary: {
      main: '#232c3b'
    },
    secondary: {
      main: '#2ebb9a'
    }
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/next" element={<NextMessages />} />
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );

}

export default App;
