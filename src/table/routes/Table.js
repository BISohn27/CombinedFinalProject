import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import TableView from '../components/TableView';
import styles from '../css/Table.module.css';

export default function Table({eno}){
    const [window,setWindow] = useState([]);
    const [general,setGeneral] = useState([]);
    const [business,setBusiness] = useState({});

    const getTables = async () =>{
        const json = await axios({
            url: `http://localhost:20000/enterprises/${eno}/tables`,
            method: 'get',
            responseType: 'json',
        });
        if(json.data.window.length !== 0) {
            setWindow(json.data.window);
        } else {
            setWindow([]);
        }

        if(json.data.window.length !== 0) {
            setGeneral(json.data.general);
        } else {
            setGeneral([]);
        }
    }
    const getBusiness = async () => {
        const json = await axios({
            url: `http://localhost:20000/enterprises/${eno}`,
            method: 'GET'
        });
        setBusiness(json.data);
    };
    useEffect(()=>{
        getTables();
        getBusiness();
    },[]);

    useEffect(()=>{
        getTables();
    },[eno]);

    return (
        <div id={styles.wrap}>
            <div id={styles.card}>
                <img id={styles.img} src={business.eimage} alt={business.ename}/>
                <h3 id={styles.namebox}>{business.ename}</h3>
                <div id={styles.addressbox}>{`${business.road_address} ${business.detail_address}`}</div>
            </div>
            
            { window.length === 0 ? null 
                :
                <div className={styles.table}>
                    {window.map((table)=>(<TableView key={table.tno} icon={'window'} table={table}/>))}
                </div>
            }
            { general.length === 0 ? null 
                :
                <div className={styles.table}>
                    {general.map((table)=>(<TableView key={table.tno} icon={'general'} table={table}/>))}
                </div>
            }
        </div>
    );
};