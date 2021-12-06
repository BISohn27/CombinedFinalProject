import {useState,useEffect} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import styles from '../css/ScrollTopButton.module.css'

function ScrollTopButton() {
    const [scrollY,setScrollY] = useState(0);
    const [btnActive, setbtnActive] = useState(false);

    const watch= () => {
        window.addEventListener('scroll', handleScroll);
    };
    const handleScroll = () => {
        setScrollY(window.scrollY);
        if(scrollY > 100) {
            setbtnActive(true);
        } else{
            setbtnActive(false);
        }
    };
    const clickTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setScrollY(0);
        setbtnActive(false);
    };
    
    useEffect(()=>{
        watch();
        return () => {window.removeEventListener('scroll',handleScroll)};
    });

    return (
        <button onClick={clickTop} id={btnActive? styles.btnActive : styles.btn}><FaArrowCircleUp/></button>
    );
}

export default ScrollTopButton;