import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom'
import styles from '../css/Navigation.module.css';
import { MdCoffee,MdFlatware,MdManageSearch,MdOutlineMap } from "react-icons/md";

function Navigation({search,state}) {
    const [keyword,setKeyword] = useState("");
    
    const clickLink = () => {
        state(true);
    }
    useEffect(()=>{
        setKeyword(search);
    },[search]);

    return (
        <div id={styles.navBox}>
            <div className={styles.navDiv}><Link className={styles.navLink} to={`/enterprises?search=${keyword}`} onClick={clickLink}><span className={styles.iconSpan}><MdManageSearch/></span>통합검색</Link></div>
            {/* <div className={styles.navDiv}><Link className={styles.navLink} to={`/enterprises?search=${keyword}&option=region`} onClick={clickLink}><span className={styles.iconSpan}><MdOutlineMap/></span>도시 및 지역</Link></div> */}
            <div className={styles.navDiv}><Link className={styles.navLink} to={`/enterprises?search=${keyword}&option=rest`} onClick={clickLink}><span className={styles.iconSpan}><MdFlatware/></span>음식점</Link></div>
            <div className={styles.navDiv}><Link className={styles.navLink} to={`/enterprises?search=${keyword}&option=cafe`} onClick={clickLink}><span className={styles.iconSpan}><MdCoffee/></span>카페</Link></div>
        </div>
    );
}

export default Navigation;