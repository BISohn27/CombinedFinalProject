import React, { useEffect, useState, useRef } from "react";
import io from 'socket.io-client';
import { useParams } from 'react-router';
import superagent from "superagent";
import { Card, Container, Grid, Typography,Box } from "@mui/material";
import axios from 'axios';
import { letterSpacing } from "@mui/system";
import { set } from "date-fns";
import {useNavigate} from 'react-router-dom';

let socket;

function Pos() {
    const params = useParams();
    const [orders, setOrders] = useState([]);
    const [tables, setTables] = useState([]);
    const [occupiedTables, setOccupiedTables] = useState([]);

    const navigation = useNavigate();

    socket = io('http://localhost:5000');

    const inputOrderDetail = (order) => {
        const cur = new Date();
        const curDate = cur.getFullYear() + "/" + (cur.getMonth() + 1) + "/" + cur.getDate();
        const curTime = cur.getHours() + ":" + cur.getMinutes() + ":" + cur.getSeconds();

        if (order && order.message.length !== 0) {
            const tempOrders = order.message;
            tempOrders.map((value) => {
                value.curDate = curDate;
                value.curTime = curTime;
            });
            // console.log(tempOrders);
            setOrders(orders => [...orders, ...tempOrders]);
        }
    }

    const getOccupiedTables = async (eno) =>{
        const url = `http://localhost:20000/enterprises/${eno}/tables/order`
        const json = await axios({
            method: 'get',
            url: url,
            responseType: JSON
        });
        setOccupiedTables(json.data);
    }
    const getTables = async (eno) => {
        const url = `http://localhost:20000/enterprises/${eno}/tables`
        // const dummyTables = [{ "tno": 1 }, { "tno": 2 }, { "tno": 3 }, { "tno": 4 }, { "tno": 5 },
        // { "tno": 6 }, { "tno": 7 }, { "tno": 8 }, { "tno": 9 }, { "tno": 10 }]
        superagent
            .get(url)
            .end((err, res) => {
                const json = JSON.parse(res.text).tables;
                setTables(json);
                // setTables(dummyTables);
                // let arr = [json.length];
                // for(let i = 0; i< json.length; i++){
                //     arr[i] = false;
                // }
                // setPayState(arr);
            });
        
    }
    const payment = (eno,tno) => {
        const url = `http://localhost:20000/enterprises/${eno}/tables/${tno}/pay`
        axios({
            method: 'post',
            url: url,
            responseType: JSON
        });
    };
    useEffect(() => {
        const { enterpriseCode } = params;
        getTables(enterpriseCode);
        getOccupiedTables(enterpriseCode);

        socket.emit('POS-startUp', Number(enterpriseCode), (err) => {
            if (err) {
                alert(err);
            }
        })
    }, [params]);

    useEffect(() => {
        socket.on('orderToPos', (order) => {
            // inputOrderDetail(order);
            const { enterpriseCode } = params;
            getTables(enterpriseCode);
            getOccupiedTables(enterpriseCode);
        });
        socket.on('payToPos', (pay) =>{
            console.log(1);
            if(window.confirm(`${pay.message.tno}번 테이블에서 결제를 요청했습니다.`)){
                payment(pay.message.eno, pay.message.tno);
                alert('결제가 완료되었습니다.');
            }else {
                alert('결제 취소');
            }
            getTables(pay.message.eno);
            getOccupiedTables(pay.message.eno);
            // let arr = payState;
            // console.log(arr);
            // arr[pay.tno-1] = true;
            // setPayState(arr);
        });
    }, [])

    return (
        !tables ?
            <div></div> :
            <Container>
                <Typography variant="h5">ORDERS</Typography>
                {tables.map((table, indexT) => (
                    <Card key={indexT} style={{ padding: "10px", margin: "10px", marginBottom:"20px", display:"flex" }}>
                        <Box sx={{width: 1000}}>
                        <Typography variant="h6">Table {table.seat_num}</Typography>
                            <Grid container>
                                <Grid item sm={2}>주문일</Grid>
                                <Grid item sm={2}>주문시간</Grid>
                                <Grid item sm={2}>수량</Grid>
                                <Grid item sm={6}>메뉴</Grid>
                            </Grid>
                            {occupiedTables[`${indexT + 1}`] === undefined ? 
                                null
                            :
                                occupiedTables[`${indexT + 1}`].map((table) => {
                                    const str = table.otime.split(" ");
                                    return(
                                        <Grid container>
                                            <Grid item sm={2}>{str[0].replace(/-/gi,"/")}</Grid>
                                            <Grid item sm={2}>{str[1]}</Grid>
                                            <Grid item sm={2}>{table.count}</Grid>
                                            <Grid item sm={6}>{table.mname}</Grid>
                                        </Grid>
                                    );
                                })
                            }
                            {/* {orders.map((order, indexO) => (
                            order.seat_num === table.seat_num &&
                            <Grid container key={indexO}>
                                <Grid item sm={2}>{order.curDate}</Grid>
                                <Grid item sm={2}>{order.curTime}</Grid>
                                <Grid item sm={2}>{order.count}</Grid>
                                <Grid item sm={6}>{order.mname}</Grid>
                            </Grid>
                        ))} */}
                        </Box>
                        {/* <button style={payState[indexT] ? {width: "50px",height: "50px",opacity:"1"} : {opacity:"0"}}>결제</button> */}
                    </Card>
                ))}
            </Container>
    );
}

export default Pos;