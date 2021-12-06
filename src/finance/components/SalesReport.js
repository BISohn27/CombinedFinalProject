import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SalesTable from  './SalesTable';
import styles from '../css/SalesReport.module.css';

export default function SalesReport({salesList,keyList}) {
    const [noData, setNoData] = React.useState(true);
    React.useEffect(()=>{
        if(keyList === null || keyList[0] === '2000-01-01' || keyList.length === 0 || salesList ===null){
            setNoData(true);
        } else{
            setNoData(false);
        }
    },[salesList,keyList]);
    return (
    <div id={styles.reportWrap}>
        {noData ? null 
            : 
                <Accordion sx={{
                                width: "100%",
                                }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Sales Report</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{width:"100%"}}>
                        {salesList === null ? '' :<SalesTable salesList={salesList} keyList={keyList}/>}
                    </div> 
                </AccordionDetails>
                </Accordion>
        }           
        </div>
    );
}
// export default function SalesReport({salesList, keyList}) {
//     return (
//         <div>

//         </div>
//     );
// }