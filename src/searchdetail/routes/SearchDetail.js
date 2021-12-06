import {useEffect, useState, useRef, Fragment} from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import {FaAngleDoubleDown} from 'react-icons/fa';
import queryString from 'query-string';
import axios from 'axios';

import MapContainer from '../components/MapContainer';
import Business from '../components/Business';
import styles from '../css/SearchDetail.module.css';
import ScrollTopButton from '../components/ScrollTopButton';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import MenuButton from "../components/MenuButton";

function SearchDetail() {
    const [loadingMain,setLoadingMain] = useState(true);
    const [businesses,setBusinesses] = useState([]);
    const [noExist, setNoExist] = useState(true);
    const [more, setMore] = useState(true);
    const [shown,setShown] = useState(0);
    const [redirect,setRedirect] = useState(false);
    
    const businessRef = useRef([]);
    const dataRef = useRef([]);
    const {search} = useLocation();
    const keyword = useRef(queryString.parse(search).search);
    const option = useRef(queryString.parse(search).option);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const getBusinesses = async () => {
        const json = await axios({
            url: `http://localhost:20000/enterprises?q=${keyword.current}&option=${option.current}`,
            method: 'GET'
        });
        dataRef.current = json.data;
        setLoadingMain(false);
        
        if(redirect === true && dataRef.current.length === 0){
            setBusinesses(dataRef.current);
            setMore(false);
            setNoExist(true);
        } else if(dataRef.current.length >= 5){
            const json = dataRef.current.slice(0, 5);
            setShown(5);
            setBusinesses(json);
            setNoExist(false);
            setMore(true);
        } else if(dataRef.current.length >0){
            const json = dataRef.current.slice(0, dataRef.current.length);
            setShown(dataRef.current.length);
            setBusinesses(json);
            setNoExist(false);
            setMore(false);
        } else{
            setMore(false);
        }
        setLoadingMain(false);
    }
    const onClick = () => {
        const sub = dataRef.current.length - shown;
        if(sub >= 5){
            setBusinesses(businesses.concat(dataRef.current.slice(shown, shown+5)));
            setShown(shown+5);
        } else if(sub>0 && sub < 5){
            setBusinesses(businesses.concat(dataRef.current.slice(shown, shown+sub)));
            setShown(shown+sub);
            setMore(false);
        } else {
            setMore(false);
        }
    }

    useEffect(()=>{
        keyword.current = queryString.parse(search).search;
        option.current = queryString.parse(search).option;
        if(redirect === true){
            businessRef.current= [];
        }
        getBusinesses();
    },[search]);

    return (
        <div className={styles.wrap}>
            {isMobile ? <MenuButton search={keyword.current} state={setRedirect}/> : null}
            <Header search={keyword.current} state={setRedirect}/>
            <nav id={styles.nav}>
                <Navigation search={keyword.current} state={setRedirect}/>
            </nav>
            <section id={styles.section}>
                <ScrollTopButton/>
                <div className={styles.mapWrap}>
                    <MapContainer array={businesses} references={businessRef.current} shown={shown} redirectState={redirect}/>
                </div>
                <div className={styles.contentWrap}>
                    {loadingMain ? <h1>Loadings...</h1>:
                        noExist ? <h2>검색 결과가 없습니다</h2> :
                        <>
                            <div id={styles.searchFor}>{`Search For '${keyword.current}'`}</div>
                            {businesses.map((business,itx)=>(<Business key = {`${business.eno}${itx}`} references={businessRef} business={business}/>))}
                            {more ? 
                                <div id={styles.moreButtonWrap}>
                                    <button onClick={onClick} id={styles.moreButton}>
                                        <FaAngleDoubleDown/>
                                    </button>
                                </div>
                                :
                                <div id={styles.emptyBox}>
                                </div>
                            }
                        </>
                    }
                </div>
            </section>
            <footer id={styles.footer}>
            </footer>
        </div>
    );
}

export default SearchDetail;