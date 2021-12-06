import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function OrderList({ ordered, total }) {

    return (
        <>
        {ordered.length == 0 ? 
            "주문내역이 없습니다." 
        : 
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th></th>
                    <th>메뉴</th>
                    <th>수량</th>
                    <th>가격 (KRW)</th>
                    </tr>
                </thead>
                <tbody>
                    {ordered.map((menu, index) =>
                        <tr>
                        <td>{index+1}</td>
                        <td>{menu.mname}</td>
                        <td>{menu.count}</td>
                        <td>{menu.price}</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="3">총 결제금액</td>
                        <td colSpan="1">{total}</td>
                    </tr>
                </tbody>
            </Table>
        }
        </>
    )
}

export default OrderList;