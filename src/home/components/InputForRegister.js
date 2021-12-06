import React, { useState } from 'react';
import styles from '../css/Register.module.css';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import Post from './Post';

function InputForRegister({ text, type, placeholder, name, value, registerInputs, setRegisterInputs }) {
    // 주소 검색 모달 핸들링
    const [open, setOpen] = useState(false);
    const ModalClose = () => setOpen(false);
    const onChange = (e) => {
        const { name, value } = e.target;
        setRegisterInputs({
            ...registerInputs,
            [name]: value
        });
    };
    const searchAddress = () => setOpen(true);
    console.log(value);
    return (
        <>
            {text === '아이디' ? 
                <div className={`row justify-content-md-center ${styles.heightControll}`}>
                    <div className="col-md-2">
                            {text}
                    </div>
                    <div className="col-md-3">
                        <Form.Control type={type} name={name} value={value} onChange={onChange} readOnly />
                    </div>
                    <div className="col-md-2"></div>
                </div> 
            : 
            (text === '도로명주소' ?
                <>
                    <div className={`row justify-content-md-center ${styles.heightControll}`}>
                        <div className="col-md-2">
                            {text}
                        </div>
                        <div className="col-md-3">
                            <Form.Control type={type} placeholder={placeholder} name={name} value={registerInputs.road_address === "" ? "" : registerInputs.extra_address === "" ? "" : `${registerInputs.road_address} (${registerInputs.extra_address})`} readOnly />
                        </div>
                        <div className="col-md-2">
                            <Button variant="secondary" size="sm" onClick={searchAddress}>주소검색</Button>
                        </div>
                    </div>
                </>
                : 
                <div className={`row justify-content-md-center ${styles.heightControll}`}>
                    <div className="col-md-2">
                        {text}
                    </div>
                    <div className="col-md-3">
                        <Form.Control type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />
                    </div>
                    <div className="col-md-2"></div>
                </div>
            )
            }
            <div>
                <Modal size="lg" show={open} onHide={ModalClose} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>주소검색</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Post open={open} setOpen={setOpen} registerInputs={registerInputs} setRegisterInputs={setRegisterInputs} />
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

InputForRegister.defaultProps = {
    type: "text"
}

export default InputForRegister;