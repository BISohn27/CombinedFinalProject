import React, { useEffect, useState } from 'react';
import { Card, Button, CloseButton } from 'react-bootstrap';
import axios from 'axios';
import { remove } from 'dom-helpers';

import styles from './Menu.module.css';


function Cart({ selected, setSelected, total, setTotal, setOrdered, eno, ocode, setOcode, setShow, table }) {
    const increase = (mcode, amount, e) => {
        setSelected(selected.map(menu => menu.mcode === mcode ? {...menu, amount: amount + 1} : menu));
    }
    const decrease = (mcode, amount, e) => {
        setSelected(selected.map(menu => menu.mcode === mcode && amount > 1 ? {...menu, amount: amount - 1} : menu));
    }
    const remove = (mcode, amount, e) => {
        setSelected(selected.filter(menu => mcode !== menu.mcode));
    }
    const putTableOrder = (ocode) =>{
        axios({
            method:'post',
            url: `http://localhost:20000/enterprises/${eno}/tables/${table}/order`,
            data: {ocode:ocode}
        });
    };
    const order = () => {
        const result = window.confirm("주문하시겠습니까?");
        if(result){
            axios({
                method: 'post',
                url: `http://localhost:20000//enterprises/${eno}/orders`,
                data : {total : total}
              }).then(function (response) {
                  const ocode = response.data.ocode;
                  putTableOrder(ocode);
                  if(response.data.status == true){
                      axios({
                        method: 'post',
                        url: `http://localhost:20000/enterprises/${eno}/orders/${ocode}/orderdetails`,
                        data: {orderdetail : selected}
                      }).then(function (response) {
                        console.log(response.data.orderList);
                        setOrdered(response.data.orderList);
                        if(response.data.status == true){
                            axios({
                                method: 'post',
                                url: `http://localhost:5000/enterprises/${eno}/tables/${table}`,
                                data: {orderdetails : response.data.orderList}
                            });
                        }
                      });
                  }
                });
            alert("주문이 전달되었습니다.");
            setShow(false);
            setSelected([]);
        }
    }

    return (
        <>
        <div className="container">
        {selected.length !== 0 ?
            <>
            {selected.map(menu => (
                <div key={menu.id} className={`row justify-content-md-center ${styles.heightControll}`}>
                    <div className="col-md-auto">
                        <Card style={{ width: '18rem' }}>
                        {menu.mimage !== "" ? 
                        <Card.Img variant="top" src={menu.mimage} alt="메뉴사진"/> 
                        :
                        <Card.Img variant="top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyestlco1LxKFs_21Y8BO4qp-69YdbdgMnOA&usqp=CAU' alt="메뉴사진"/>
                        }
                        <Card.Body style={{textAlign: 'center'}}>
                            <Card.Title>{menu.mname}</Card.Title>
                            <Card.Text>{menu.mcomment}</Card.Text>
                            <Card.Text>{menu.price} KRW</Card.Text>
                            <Card.Text>
                                <Button variant="outline-secondary" size="sm" onClick={(e)=>{decrease(menu.mcode, menu.amount, e)}}>-</Button>
                                <span style={{margin: '5px'}}>{menu.amount}</span>
                                <Button variant="outline-secondary" size="sm" onClick={(e)=>{increase(menu.mcode, menu.amount, e)}}>+</Button>
                            </Card.Text>
                            <Button variant="secondary" size="sm" onClick={(e) => {remove(menu.mcode, menu.amount, e)}}>장바구니에서 삭제</Button>
                        </Card.Body>
                        </Card>
                    </div>
                </div>
            ))}
            <div className={`row justify-content-md-center ${styles.heightControll}`}>
                <div className="col-md-auto">
                    <span>주문금액 : {total} KRW</span>
                </div>
            </div>
            <div className={`row justify-content-md-center ${styles.heightControll}`}>
            <div className="col-md-auto">
                <Button variant="secondary" onClick={order}>주문하기</Button>
            </div>
            </div>
            </>
            :
            "장바구니가 비었습니다." 
        }
        </div>
        </>
    )
}

export default Cart;