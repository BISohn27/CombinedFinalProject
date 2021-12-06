import {useRef, useEffect, useState} from 'react';
import styles from '../css/Business.module.css';
import {ProgressBar, Popover, OverlayTrigger, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Info from './Info';

function Business({business, references}) {
    const elementRef = useRef();
    const directionRef = useRef({});
    const [infoState, setInfoState] = useState(false);
    
    const onMouseOver = (event) => {
        if(infoState === false){
          setInfoState(true);
        }
        directionRef.current = {x:elementRef.current.getBoundingClientRect().x, y:elementRef.current.getBoundingClientRect().y};
    }
    const onMouseOut = () => {
        setInfoState(false);
    }
    const onWheel = () =>{
        setInfoState(false);
    }
    useEffect(()=>{
        references.current.push(elementRef);
    },[]);
    
    return (
        <div className={styles.wrap}>
            <Info direction={directionRef.current} infoState={infoState} content={business}/>
            <div ref={elementRef} className={styles.imgBox} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onWheel={onWheel}>
              <img className={styles.img} src={business.eimage} alt={business.ename}/>
            </div>
              <div className={styles.textBox}>
                <Link to={`/enterprises/${business.eno}`} className={styles.link}>
                  <div className={styles.linkText}>{business.ename}</div>
                </Link>
                <div className={styles.addressText}>{business.road_address}</div>
                <div className={styles.addressText}>{business.detail_address}</div>
              </div>
            <div className={styles.seatAvailable}>
            <>
              {['right'].map((placement) => (
                <OverlayTrigger
                  trigger="click"
                  key={placement}
                  placement={placement}
                  overlay={
                    <Popover id={`popover-positioned-${placement}`}>
                      <Popover.Header as="h3">좌석 현황</Popover.Header>
                      <Popover.Body>
                        <div><strong>전체좌석: </strong>{business.seat} </div>
                        <div><strong>이용좌석: </strong>{business.occupied}</div>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <ProgressBar animated className={styles.progressBar} now={business.seat === 0 ? 0: (business.occupied/business.seat * 100)} label={`${Math.round(business.seat === 0 ? 0: (business.occupied/business.seat * 100))}%`} />
                </OverlayTrigger>
              ))}
</>
            </div>
        </div>
    );
}

export default Business;