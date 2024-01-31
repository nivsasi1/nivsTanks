import './App.css'
import './App.css';
import { ThemeProvider } from '@mui/material';
import { LoginForm } from './pages/Login/LoginForm.tsx';
import { theme } from './themes/themePalatte.ts'
import { MainPage } from './pages/MainPage/MainPage.tsx';
import { useState } from 'react';
import { VerticalChart } from './pages/MainPage/components/graphs/VerticalChart.tsx';
import { DoughnutChart } from './pages/MainPage/components/graphs/DoughnutChart.tsx';
import { AddTank } from './pages/AddTank/AddTank.tsx';
import { Page } from './components/Page.tsx';

const MakatsData = [
  {
    id: 1,
    makat: 2016,
    userGain: 80000,
    precent: 823,
  },
  {
    id: 2,
    makat: 2017,
    userGain: 45677,
    precent: 345,
  },
  {
    id: 3,
    makat: 2018,
    userGain: 78888,
    precent: 555,
  },
  {
    id: 4,
    makat: 2019,
    userGain: 90000,
    precent: 4555,
  },
  {
    id: 5,
    makat: 2020,
    userGain: 4300,
    precent: 234,
  },
];

function App() {
  const color = (theme.palette.secondary).main;
  console.log(color)
  const [makatsData, setMakatsData] = useState({
    //labels is precentage
    labels: MakatsData.map((data) => (data.makat).toString()),
    datasets: [{
      label: "כשירות לפי מק״ט",
      data: MakatsData.map((data) => data.precent),
      backgroundColor: color,
      borderRadius: 5,
    },]
  });
  
  return (
    <ThemeProvider theme={theme}>
        {/* <LoginForm /> */}
        {/* <Page><MainPage pernr='9063466' gdud={53} chartData={makatsData} admin={true} /></Page> */}
      <Page><AddTank /></Page>
    </ThemeProvider>
  )
}

export default App
