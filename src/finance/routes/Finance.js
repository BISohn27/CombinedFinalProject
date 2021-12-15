import {useEffect, useState, Fragment} from 'react';
import {useParams,useNavigate} from "react-router-dom";
import axios from 'axios';

import SelectionBox from '../components/SelectionBox';
import Chart from '../components/Chart';
import ScrollTopButton from '../components/ScrollTopButton';
import SalesReport from '../components/SalesReport';
import styles from '../css/Finance.module.css';

function Finance () {
    const [business, setBusiness] = useState({});
    const [yearSales,setYearSales] = useState({});
    const [quaterSales,setQuaterSales] = useState({});
    const [monthSales,setMonthSales] = useState({});
    const [timeSales,setTimeSales] = useState({});
    const [params,setParams] = useState({});
    const [salesList, setSalesList] = useState({});
    const [keyList, setKeyList] = useState([]);
    const [dataState, setDataState] = useState(false);
    
    const {eno} = useParams();
    const navigation = useNavigate();

    const getBusiness = async () => {
        const json = await axios({
            url: `http://localhost:20000/enterprises/${eno}`,
            method: 'GET'
        });
        setBusiness(json.data);
    };
    const getSales = async () =>{
        const json = await axios({
            url: `http://localhost:20000/enterprises/${eno}/finance?ct=${params.categoryType}&pc=${params.periodCategory}&pt=${params.periodType}&sp=${params.startPeriod}&ep=${params.endPeriod}`,
            method: 'GET'
        });
        setYearSales(json.data.year);
        setQuaterSales(json.data.quater);
        setMonthSales(json.data.month);
        setTimeSales(json.data.time);
        setSalesList(json.data.saleslist);
        setKeyList(json.data.keylist);
    };
    const getMenuSales = async() =>{
        const json = await axios({
            url: `http://localhost:20000/enterprises/${eno}/finance?ct=${params.categoryType}&pc=${params.periodCategory}&pt=${params.periodType}&sp=${params.startPeriod}&ep=${params.endPeriod}&m=${params.menu}&mc=${params.menuCategory}`,
            method: 'GET'
        });
        setYearSales(json.data.year);
        setQuaterSales(json.data.quater);
        setMonthSales(json.data.month);
        setTimeSales(json.data.time);
        setSalesList(json.data.saleslist);
        setKeyList(json.data.keylist);
    }

    const authenticate = async (token) => {
        if(token !== null && token !== undefined){
            const state = await axios({
                                url: `http://localhost:20000/authorize/${eno}`,
                                method: "get",
                                responseType:"json",
                                headers: {
                                    'Authorization': 'Bearer ' + token,
                                },
                            });
            console.log(state.data);
            if(state.data){
                getBusiness();
            } else{
                alert('잘못된 접근입니다. 메인 페이지로 돌아갑니다.');
                navigation("/");
            }
        } else{
            alert('잘못된 접근입니다. 메인 페이지로 돌아갑니다.');
            navigation("/");
        }
    }

    useEffect(()=>{
        authenticate(localStorage.getItem("token"));
    },[]);

    useEffect(()=>{
        if(params !== {} && params.categoryType === 'sales'){
            getSales();
        } else if(params !== {} && params.categoryType === 'menu'){
            getMenuSales();
        }
    },[params])

    useEffect(()=>{
        if(yearSales.sales !== undefined && quaterSales.sales !== undefined && monthSales.sales !== undefined && timeSales.sales !== undefined){
            if(yearSales.sales.length === 0 && quaterSales.sales.length === 0 && monthSales.sales.length === 0 && timeSales.sales.length === 0){
                setDataState(false);
            } else{
                setDataState(true);
            } 
        }else{
            setDataState(false);
        }
    },[yearSales,quaterSales,monthSales,timeSales])
    
    return (
        <div id={styles.wrap}>
            <ScrollTopButton/>
            <div id={styles.card}>
                <img id={styles.img} src={business.eimage} alt={business.ename}/>
                <h3 id={styles.namebox}>{business.ename}</h3>
                <div id={styles.addressbox}>{`${business.road_address} ${business.detail_address}`}</div>
            </div>
            
            <Fragment>
                <SelectionBox businessNum={business.eno} setParams={setParams} dataState={setDataState}/>
            </Fragment>
            <Fragment>
                {dataState ? 
                    <div id={styles.charwrap}>
                        <Chart dataList={yearSales.sales} labelList={yearSales.label} rgb={'rgba(1, 151, 191, 0.5)'} title={'Sales per Year'}/>
                        <Chart dataList={quaterSales.sales} labelList={quaterSales.label} rgb={'rgba(255, 99, 132, 0.5)'} title={'Sales per Quater'}/>
                        <Chart dataList={monthSales.sales} labelList={monthSales.label} rgb={'rgba(0, 182, 0, 0.4)'} title={'Sales per Month'}/>
                        <Chart dataList={timeSales.sales} labelList={timeSales.label} rgb={'rgba(240, 240, 0, 0.5)'} title={'Sales per Time'}/>
                    </div>
                    : null
                }
            </Fragment>
            <SalesReport salesList={dataState ? salesList : null} keyList={dataState ? keyList : null}/>
            <footer id={styles.footer}>
            </footer>
        </div>
    );
}


export default Finance;