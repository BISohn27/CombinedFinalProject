import {useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa";
import { MdCoffee,MdFlatware,MdManageSearch,MdOutlineMap } from "react-icons/md";

import styles from "../css/MenuButton.module.css";

function MenuButton({search,state}) {
    const [menuState, setMenuState] = useState(false);
    const [keyword, setKeyword] = useState("");

    const onClick = () =>{
        setMenuState(!menuState);
    }
    const clickLink = () => {
        state(true);
    }

    useEffect(()=>{
        setKeyword(search);
    },[search]);
    return(
        <div>
            <button onClick={onClick}><FaBars id={styles.icon}/></button>
            <ul id = {menuState ? styles.menuBarActive : styles.menuBar}>
                <li className={styles.li}><Link className={styles.link} to={`/enterprises?search=${keyword}`} onClick={clickLink}><span className={styles.iconSpan}><MdManageSearch/></span>통합검색</Link></li>
                {/* <li className={styles.li}><Link className={styles.link} to={`/enterprises?search=${keyword}&option=region`} onClick={clickLink}><span className={styles.iconSpan}><MdOutlineMap/></span>도시 및 지역</Link></li> */}
                <li className={styles.li}><Link className={styles.link} to={`/enterprises?search=${keyword}&option=rest`} onClick={clickLink}><span className={styles.iconSpan}><MdFlatware/></span>음식점</Link></li>
                <li className={styles.li}><Link className={styles.link} to={`/enterprises?search=${keyword}&option=cafe`} onClick={clickLink}><span className={styles.iconSpan}><MdCoffee/></span>카페</Link></li>
            </ul>
        </div>
    );
}

export default MenuButton;