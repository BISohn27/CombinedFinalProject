import { useEffect, useState } from 'react';
import { Modal, Offcanvas, Button, Row, Col, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import homeCss from "../css/Home.module.css";
import styles from '../css/Login.module.css';
import InputForRegister from './InputForRegister';

function Owner({ placement }) {
    const [id, setId] = useState(0);

    // 오프캔버스 핸들링
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => {
        setShow(true);
        setLoginInputs({
            loginId: "",
            loginPwd: ""
        });
        axios({
            url:"http://localhost:20000/enterprises/count",
            method:"get",
            responseType:"json"
        }).then(function(response) {
            setId(response.data + 1);
        })
    };
    const [loginInputs, setLoginInputs] = useState({
        loginId: "",
        loginPwd: "",
    });
    const { loginId, loginPwd } = loginInputs;
    const onChange = (e) => {
        const {value, name} = e.target;
        setLoginInputs({
            ...loginInputs,
            [name]: value,
        });
    };
    const navigation = useNavigate();
    const login = () => {
        if(loginId === ""){
            alert("아이디를 입력하세요.");
        }else if(loginPwd === ""){
            alert("비밀번호를 입력하세요.");
        }else{
            axios.post('http://localhost:20000/authenticate', {
                eno: loginId,
                password: loginPwd
            }).then(function (response) {
                if(response.status === 200){
                    localStorage.setItem('token',response.data.token);
                    localStorage.setItem('eno', response.data.eno);

                    const path = `/enterprises/${response.data.eno}`;
                    navigation(path);
                }else{
                    alert("아이디 또는 비밀번호를 확인하세요.");
                }
            });
        }
    };

    const [registerInputs, setRegisterInputs] = useState({
        password: "",
        pwdCheck: "",
        email: "",
        ename: "",
        postcode: "",
        road_address: "",
        jibun_address: "",
        detail_address: "",
        phone: ""
    })
    const {pwd, pwdCheck, email, ename, postcode, road_address, detail_address, phone} = registerInputs;
    const [open, setOpen] = useState(false);
    const ModalClose = () => setOpen(false);
    const ModalOpen = () => {
        setOpen(true);
    }
    const register = () => {
        setOpen(false);
        console.log(registerInputs.postcode);
        console.log(registerInputs);
        console.log("등록");
        axios.post('http://localhost:20000/enterprises/register', {
            registerInfo: registerInputs
        }).then(function (response) {
            if(response.status == 200){
                console.log(response.status);
                alert("등록되었습니다.");
                setRegisterInputs({
                    password: "",
                    pwdCheck: "",
                    email: "",
                    ename: "",
                    postcode: "",
                    road_address: "",
                    jibun_address: "",
                    detail_address: "",
                    phone: ""
                })
            }else{

            }
          });
          setShow(false);
    }

    return (
    <>
        <div>
            <Button variant="secondary" size="sm" onClick={handleShow}>
                점주페이지
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement={placement}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>점주페이지</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Row className={`row justify-content-center ${styles.heightControll}`}>
                    <Col>
                    <FloatingLabel controlId="floatingInput" label="아이디" className="mb-3">
                        <Form.Control type="text" placeholder="아이디" name="loginId" value={loginId} onChange={onChange} />
                    </FloatingLabel>
                    </Col>
                </Row>
                <Row className={`row justify-content-center ${styles.heightControll}`}>
                    <Col>
                        <FloatingLabel controlId="floatingInput" label="비밀번호" className="mb-3">
                            <Form.Control type="password" placeholder="비밀번호" name="loginPwd" value={loginPwd} onChange={onChange} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className={`row justify-content-md-center ${styles.heightControll}`}>
                    <Col sm="auto">
                        <Button variant="secondary" size="md" onClick={login}>로그인</Button>
                    </Col>
                    <Col sm="auto">
                        <Button variant="secondary" size="md" onClick={ModalOpen}>업체등록</Button>
                    </Col>
                </Row>
            </Offcanvas.Body>
            </Offcanvas>
        </div>
        <div>
            <Modal size="lg" show={open} onHide={ModalClose} backdrop="static" >
            <Modal.Header closeButton>
                <Modal.Title>업체등록</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputForRegister text="아이디" value={id} readOnly={true} placeholder="아이디" />
                <InputForRegister text="비밀번호" type="password" placeholder="비밀번호" name="password" value={pwd} registerInputs={registerInputs} setRegisterInputs={setRegisterInputs} />
                <InputForRegister text="비밀번호확인" type="password" placeholder="비밀번호확인" name="pwdCheck" value={pwdCheck} registerInputs={registerInputs} setRegisterInputs={setRegisterInputs} />
                <InputForRegister text="이메일" placeholder="이메일" name="email" value={email} registerInputs={registerInputs} setRegisterInputs={setRegisterInputs} />
                <InputForRegister text="업체명" placeholder="업체명" name="ename" value={ename} registerInputs={registerInputs} setRegisterInputs={setRegisterInputs} />
                <InputForRegister text="도로명주소" placeholder="주소를 검색하세요." name="road_address" value={road_address} registerInputs={registerInputs} setRegisterInputs={setRegisterInputs} />
                <InputForRegister text="상세주소" placeholder="상세주소" name="detail_address" value={detail_address} registerInputs={registerInputs} setRegisterInputs={setRegisterInputs} />
                <InputForRegister text="전화번호" placeholder="전화번호" name="phone" value={phone} registerInputs={registerInputs} setRegisterInputs={setRegisterInputs} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ModalClose}>취소</Button>
                <Button variant="secondary" onClick={register}>등록</Button>
            </Modal.Footer>
            </Modal>
        </div>
    </>
    );
  }

export default Owner;