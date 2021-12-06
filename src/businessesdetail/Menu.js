import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Offcanvas, Button, Row, Col } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

import MenuCard from './MenuCard';
import OrderList from './OrderList';
import Cart from './Cart';
import styles from './Menu.module.css';

function Menu({ placement }) {
    const {enterpriseCode,table} = useParams();
    const isMobile = useMediaQuery({ maxWidth: 767 });
    
    // 메뉴 가져오기
    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([{
        idx: 0,
        cname: ""
    }]);
    const [count, setCount] = useState(0);
    const getMenus = () => {
        axios({
            method: 'get',
            url: `http://localhost:20000/enterprises/${enterpriseCode}/cart`,
            responseType: JSON
          }).then(function (response) {
              setMenus(response.data.menus);
            });
    }
    useEffect(() => {
        getMenus();
    }, [])

    //결제 버튼
    const pay = async () =>{
        alert('결제 중입니다. 기다려주세요.');
        await axios({
            method: 'post',
            url: `http://localhost:5000/enterprises/${enterpriseCode}/tables/${table}/pay`,
            data : {
                eno: enterpriseCode,
                tno: table,
            }
        });
    }

    // 담기 버튼 이벤트
    const [selected, setSelected] = useState([]);
    const [total, setTotal] = useState(0);
    const [total2, setTotal2] = useState(0);
    const onClick = () => {
        setSelected(menus.filter(menu => menu.amount !== 0));
        alert("장바구니에 담겼습니다.");
    }
    useEffect(() => {
        let price = 0;
        selected.map(menu => {
            price += (menu.price * menu.amount);
        });
        setTotal(price);
    }, [selected]);

    // 주문내역 오프캔버스 핸들링
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const [ocode, setOcode] = useState(0);
    const handleShow = () => {
        setShow(true);
    };

    // 장바구니 오프캔버스 핸들링 
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => {
        let price = 0;
        selected.map(menu => {
            price += (menu.amount * menu.price)
        })
        setTotal2(price);
        setShow2(true);
    };

    // 주문내역
    const [ordered, setOrdered] = useState([]);
    console.log(menus);
    return(
        <>
            {/* <div id={styles.topContainer}> */}
            <div id={styles.titleDiv}>
                <h1>Menu</h1>
            </div>
            {isMobile ? 
            <div id={styles.buttonDiv}>
                <div>
                    <Button variant="secondary">자리이동</Button>
                </div>
                <div>
                    <Button variant="secondary" onClick={handleShow}>주문내역</Button>
                </div>
                <div>
                    <Button variant="secondary" onClick={handleShow2}>장바구니</Button>
                </div>
            </div>
            :
            <div id={styles.buttonDiv}>
                <div>
                    <Button variant="secondary">자리이동</Button>
                </div>
                <div>
                    <Button variant="secondary" onClick={handleShow} style={{marginRight:'10px'}}>주문내역</Button>
                    <Button variant="secondary" onClick={handleShow2} >장바구니</Button>
                </div>
            </div>
            }
            
            {/* </div> */}
            {/* <div id={styles.midContainer}> */}
            <div id={styles.categoryDiv}>
                <div>
                    {categories.map(category => {
                        <a href="#"><span>{category}</span></a>
                    })}
                </div>
            </div>
            {/* </div> */}
            <div id={styles.gridDiv}>
                {menus.map(menu => (
                    <MenuCard key={menu.mcode} mcode={menu.mcode} mname={menu.mname} mcomment={menu.mcomment} mimage={menu.mimage} price={menu.price} amount={menu.amount} menus={menus} setMenus={setMenus} />
                ))}
            </div>
            <div id={styles.btmButtonDiv}>
                <Button variant="secondary" onClick={onClick} style={{marginRight:'10px'}}>담기</Button>
                <Button variant="secondary" onClick={pay}>결제하기</Button>
            </div>
            <Offcanvas show={show2} onHide={handleClose2} placement={placement}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>장바구니</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Cart selected={selected} setSelected={setSelected} total={total} setTotal={setTotal} setOrdered={setOrdered} eno={enterpriseCode} ocode={ocode} setOcode={setOcode} setShow={setShow2} table={table} />
            </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas show={show} onHide={handleClose} placement={placement}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>주문내역 (table {table}) </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <OrderList ordered={ordered} total={total2} />
            </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Menu;