import { CssBaseline } from '@material-ui/core';
import { NavBar } from './components/NavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Scheduler } from './components/pages/Scheduler';
import { Reports } from './components/pages/Reports';

const theme = createTheme({
  palette: {
    primary: {
      main: '#122448'
    },
    secondary: {
      main: '#FFFFFF'
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
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );

}

export default App;
