import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(date,array) {
    let price = 0;
    let list = array[`${date}`];

    if(list !== null){
        for(let i=0; i< list.length; i++){
            price += list[i].price * list[i].count
        } 
    }

    return {
        date,
        price,
        list,
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row.date}
            </TableCell>
            <TableCell align="right">{row.price}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                    주문내역
                </Typography>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                    <TableRow>
                        <TableCell>주문날짜</TableCell>
                        <TableCell>카테고리</TableCell>
                        <TableCell align="right">메뉴명</TableCell>
                        <TableCell align="right">가격</TableCell>
                        <TableCell align="right">수량</TableCell>
                        <TableCell align="right">총 가격</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {row.list.map((order) => (
                        <TableRow key={order.odcode}>
                        <TableCell component="th" scope="row">
                            {order.otime}
                        </TableCell>
                        <TableCell>{order.mcategory}</TableCell>
                        <TableCell align="right">{order.mname}</TableCell>
                        <TableCell align="right">{order.price}</TableCell>
                        <TableCell align="right">{order.count}</TableCell>
                        <TableCell align="right">
                            {order.count * order.price}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </React.Fragment>
    );
}

export default function SalesTable({salesList,keyList}) {
    const [rows,setRows] = React.useState([]);

    React.useEffect(()=>{
        setRows(keyList.map((key)=>createData(key,salesList)));
    },[keyList]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>주문 날짜</TableCell>
                        <TableCell align="right">총 가격</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.date} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}



// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//         PropTypes.shape({
//             amount: PropTypes.number.isRequired,
//             customerId: PropTypes.string.isRequired,
//             date: PropTypes.string.isRequired,
//         }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };