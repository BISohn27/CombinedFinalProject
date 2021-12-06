import { BsXLg,BsSearch } from "react-icons/bs";
import {useState, useRef, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

import styles from '../css/MainSearch.module.css';
// import '../../searchdetail/css/Search.css';
import Microphone from '../../searchdetail/components/Microphone';

function MainSearch() {
    const [keyword,setKeyword] = useState();
    const [keywordState,setKeywordState] = useState(true);
    const navigate = useNavigate();
    const divRef = useRef();
    const linkRef = useRef();

    const onKeyPress = (event) =>{
        if(event.key === 'Enter'){
            // state(true);
            navigate(`/enterprises?search=${keyword}`);
        }
    };
    const onClick = () =>{
        navigate(`/enterprises?search=${keyword}`);
    };
    const onChange = (event) => {
        setKeyword(event.target.value);
    }
    const clickReset = () => {
        setKeyword("");
        setKeywordState(true);
    };
    useEffect(()=>{
        if(typeof keyword === "string")
        if(keyword === '' || keyword.length === 0) {
            setKeywordState(true);
        }else{
            setKeywordState(false);
        }
    },[keyword]);

    return (
        <>
            <div id={styles.logoBox}>
                <div id={styles.logoWrapper}>
                    <img src="image/fmlogo.png" style={{width: '100%', height: '100%'}}/>
                </div>
                <div id={styles.textWrapper}>
                    <span style={{fontSize: '3rem', color: 'rgb(100, 100, 100)'}}>11.4</span>
                </div>
            </div>
            <div id={styles.searchBox} ref={divRef}>
                <div id={styles.searchText}>
                    <input id={styles.searchInput} type="text" value={keyword} onChange={onChange} onKeyPress={onKeyPress}/>
                </div>
                <div id={keywordState ? "resetInactive":"reset"}>
                    <BsXLg onClick={clickReset}/>
                </div>
                <div id={keywordState ? "barrierInactive":"barrierActive"}></div>
                    <Microphone setKeyword={setKeyword} keywordState={keywordState}/>
                <div id="searchIcon">
                    <Link ref={linkRef} id="linkSearch" to={`/enterprises?search=${keyword}`} onClick={onClick}><BsSearch id="searchIcon"/></Link>
                </div>
            </div>
        </>
    );
}

export default MainSearch;