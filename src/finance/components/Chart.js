import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import style from '../css/Chart.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Chart({labelList,dataList,rgb,title}) {
    const [noData,setNoData] = useState(true);
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
        },
    };
    const data = {
        labels: labelList,
        datasets: [
            {
            label: title,
            data: dataList,
            backgroundColor: rgb,
            },
        ],
    };

    useEffect(()=>{
        if(dataList === null){
            setNoData(true);
        }else{
            setNoData(false);
        }
    },[dataList])

    return (<div id={style.wrap}>
                {noData ? null : <Bar options={options} data={data}/>}
            </div>);
}