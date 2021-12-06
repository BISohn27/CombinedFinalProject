import YearPicker from './YearPicker';
import CustomPicker from './CustomPicker';

function PickerRouter({type,setStartPeriod,setEndPeriod}) {
    switch (type) {
        case 'Year' :
            return <YearPicker setStartPeriod={setStartPeriod} setEndPeriod={setEndPeriod}/>;
        case 'Custom Period' : 
            return <CustomPicker setStartPeriod={setStartPeriod} setEndPeriod={setEndPeriod}/>;
        default :
            return null;
        }
}

export default PickerRouter;