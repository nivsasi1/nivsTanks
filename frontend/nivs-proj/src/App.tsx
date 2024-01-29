
import './App.css'
import './App.css';
import { ThemeProvider } from '@mui/material';
// import { LoginForm } from './pages/Login/components/LoginForm.tsx';
import { theme } from './themes/themePalatte.ts'
import { MainPage } from './pages/MainPage/MainPage.tsx';

function App() {

  return (
    <ThemeProvider theme={theme}>
        {/* <LoginForm /> */}
        <MainPage pernr='9063466' gdud={53} />
    </ThemeProvider>
  )
}

export default App
