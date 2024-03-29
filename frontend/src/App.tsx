import "./App.css";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import { LoginForm } from "./pages/Login/LoginForm.tsx";
import { theme } from "./themes/themePalatte.ts";
import { MainPage } from "./pages/MainPage/MainPage.tsx";
import { AddTank } from "./pages/AddTank/AddTank.tsx";
import { Page } from "./components/Page.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/Error/ErrorPage.tsx";
import { TankContextProvider } from "./store/tank-info-context.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <LoginForm />, 
       },    
       {
        path: "/main",
        element: (
          <Page>
            <MainPage/>
          </Page>
        ),
      },
      {
        path: "/addtank",
        element: (
          <Page>
            <AddTank />
          </Page>
        ),
      },
    ]);



function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <TankContextProvider>
      <RouterProvider router={router} />
      </TankContextProvider>
    </ThemeProvider>
  );
}

export default App;
