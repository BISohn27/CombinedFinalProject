import {useState,useEffect,Fragment} from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from "date-fns";
import Box from '@mui/material/Box';


export default function YearPicker({setEndPeriod, setStartPeriod,endPeriod,startPeriod}) {
    const [startValue, setStartValue] = useState(null);
    const [endValue, setEndValue] = useState(null);
    
    useEffect(()=>{
        if(typeof setEndPeriod ==='function'){
            setEndPeriod(endValue);
        }
    },[endValue]);
    useEffect(()=>{
        if(typeof setEndPeriod ==='function'){
            setStartPeriod(startValue);
        }
    },[startValue]);

    useEffect(()=>{
        if(startPeriod === null){
            setStartValue(null);
        }
    },[startPeriod]);

    useEffect(()=>{
        if(endPeriod === null){
            setEndValue(null);
        }
    },[endPeriod]);
    
    return (
        <Fragment>
            <Box sx={{ width: '13%' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        views={['year']}
                        label="Strat Year"
                        value={startValue}
                        onChange={(newValue) => {
                            setStartValue(format(newValue,"yyyy"));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>
            <Box sx={{ width: '13%' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        views={['year']}
                        label="End Year"
                        value={endValue}
                        onChange={(newValue) => {
                            setEndValue(format(newValue,"yyyy"));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>
    </Fragment>
    );
}