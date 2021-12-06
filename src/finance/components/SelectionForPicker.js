import {useState,useEffect,Fragment} from 'react';

import PickerRouter from './PickerRouter';
import Selection from './Selection';
import YearPicker from './YearPicker';

function SelectionForPicker({categories,setStartPeriod,setEndPeriod,setPeriodType}) {
    const [value,setValue] = useState('');
    const [state, setState] = useState(false);

    const category = ['Year','Custom Period'];
    useEffect(()=>{
        setValue('');
        if(categories[0] ==='총 매출' && (categories[1] === '년도별 매출' || categories[1] ==='분기별 매출')){
            setState(true);
            setPeriodType('Year');
        } else if(categories[0] ==='메뉴별 매출' && (categories[3]==='년도별 매출' || categories[3] ==='분기별 매출')){
            setState(true);
            setPeriodType('Year');
        } else{
            setState(false);
        }
    },[categories[0],categories[1],categories[2],categories[3]]);

    useEffect(()=>{
        if(state === false){
            setPeriodType(value);
        }
    },[value])
    
    return(
        <Fragment>
            { state ? 
                <YearPicker  setStartPeriod={setStartPeriod} setEndPeriod={setEndPeriod}/> 
                : 
                <Fragment>    
                    <Selection category={category} value={value} setCategory={setValue}/>
                    <PickerRouter type={value} setStartPeriod={setStartPeriod} setEndPeriod={setEndPeriod}/>
                </Fragment>
            }
        </Fragment>
    );
}

export default SelectionForPicker;