import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);



export const DoughnutChart: React.FC <{precent: number}> = ({precent}) => {
    const data = {
        labels: ['סהכ כשירים'],
        datasets: [
          {
            label: '%',
            data: [precent, 100-precent],
            backgroundColor: [
              '#899BF8',
              '#FFF',
            ],
          },
        ],
      };
    return (
        <>
            <Box style={{display:'flex', justifyContent:'center', borderRadius:'1rem',  height:"200px",width:"100%", alignSelf:"center", marginTop:"2rem", marginBottom:"2rem"}}>
                <Doughnut data={data} />
            </Box>
            <Typography style={{direction:'rtl'}} mb={2}>{precent + '%' + ' מהכלים כשירים '}</Typography>
        </>
    )
}