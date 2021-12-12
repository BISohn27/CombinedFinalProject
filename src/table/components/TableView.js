import { useEffect, useState } from "react";
import {FaChair,FaBorderAll } from "react-icons/fa";

import styles from '../css/TableView.module.css';

export default function TableView({icon, table}) {
    const [occupiedState, setOccupiedState] = useState(false);

    useEffect(()=>{
        if(table.state === 'y'){
            setOccupiedState(true);
        }else{
            setOccupiedState(false);
        }
    },[table]);

    switch (icon){
        case 'window' :
            return (
                <div className={styles.table}>
                    <FaBorderAll className={occupiedState ? styles.occupied : styles.noOccupied}/>
                    <div>
                        {`${table.seat_num}명석`}
                    </div>
                </div>
            );
        case 'general' :
            return (
                <div className={styles.table}>
                    <FaChair className={occupiedState ? styles.occupied : styles.noOccupied}/>
                    <div>
                        {`${table.seat_num}명석`}
                    </div>
                </div>
            );
        default :
            return null;
    };
};