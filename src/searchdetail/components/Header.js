import {useState, useEffect} from 'react';
import styles from '../css/Header.module.css';
import { useMediaQuery } from 'react-responsive';

import Search from '../components/Search';

function Header({search,state}) {
    const [scrollY,setScrollY] = useState(0);
    const [headerActive, setHeaderActive] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    
    const watch = isMobile ? () => {} : () => {
        window.addEventListener('scroll', handleScroll);
    };
    const handleScroll = () => {
        setScrollY(window.scrollY);
        if(scrollY > 120) {
            setHeaderActive(true);
        } else{
            setHeaderActive(false);
        }
    };
    
    useEffect(()=>{
        watch();
        const returnFunction = isMobile ? null : () => {window.removeEventListener('scroll',handleScroll)};
        return returnFunction;
    });

    return (
        <div id={headerActive? styles.headerActive : styles.header}>
            <Search search={search} state={state}/>
        </div>
    );
}

export default Header;