import { React, useState, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';

function MenuCard({ mcode, mname, mcomment, mimage, price, amount, menus, setMenus }) {
    const increase = () => {
        setMenus(menus.map(menu => menu.mcode === mcode ? {...menu, amount: amount + 1} : menu));
    }
    const decrease = () => {
        setMenus(menus.map(menu => menu.mcode === mcode && menu.amount > 0 ? {...menu, amount: amount - 1} : menu));
    }

    return (
        <Card style={{ width: '18rem' }}>
            {mimage !== "" ? 
            <Card.Img variant="top" src={mimage} alt="메뉴사진"/> 
            :
            <Card.Img variant="top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyestlco1LxKFs_21Y8BO4qp-69YdbdgMnOA&usqp=CAU' alt="메뉴사진"/>
            }  
            <Card.Body >
                <Card.Title>{mname}</Card.Title>
                <Card.Text>{mcomment}</Card.Text>
                <Card.Text style={{textAlign: 'center'}}>{price} KRW</Card.Text>
                <Card.Text style={{textAlign: 'center'}}>
                    <div>
                        <Button variant="outline-secondary" size="sm" onClick = {decrease}>-</Button>
                            <span style={{margin: '5px'}}>{amount}</span>
                        <Button variant="outline-secondary" size="sm" onClick = {increase}>+</Button>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default MenuCard;