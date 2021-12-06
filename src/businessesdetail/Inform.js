import React from "react";
import { Box, Button, Card, CardContent, Dialog, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { createTheme } from "@mui/material/styles";
import MapContainer from "../searchdetail/components/MapContainer";

const theme = createTheme()
const useStyles = makeStyles(() => ({
    media: {
        height: 250,
        [theme.breakpoints.down("sm")]: {
            height: 150,
        },
    },
    cardOnModal: {
        marginBottom: theme.spacing(5),
    },
    card: {
        // marginBottom: theme.spacing(5),
        width: "50vh",
        [theme.breakpoints.up("sm")]: {
            display: 'flex',
            width: "50vw",
        },
    },
    informCard: {
        // marginBottom: theme.spacing(5),
        width: "50vh",
        [theme.breakpoints.up("sm")]: {
            width: "50vw",
        },
    },
    imageBreak: {
        minHeight: "300px",
        maxWidth: "600px",
        [theme.breakpoints.up("sm")]: {
            width: "50%",
            minHeight: "300px",
            maxWidth: "300px",
            // [theme.breakpoints.up("lg")]: {
            //     Width: "200px",
            // },
        },
    },
    gallery: {
        [theme.breakpoints.up("sm")]: {
            width: "40vw",
            height: "40vw",
        },
    },
    contentBreak: {
        [theme.breakpoints.up("sm")]: {
            width: "50%"
            // width: "50vw",
            // [theme.breakpoints.down("lg")]: {
            //     width: "50%"
            // },
        },
    },
    inform: {
        flex: '1 0 auto',
        [theme.breakpoints.up("sm")]: {
            display: 'flex',
            justifyContent: "center"
        },
    },
}));


// 세번째 카드
const MapCard = (props) => {
    const { enterpriseJson } = props;
    const classes = useStyles();

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card className={classes.card} style={{ height: "100%" }}>
                <MapContainer array={[enterpriseJson]} shown={1} mapStyle={{
                    width: '100%',
                    height: '40vh'
                }} />
            </Card>
        </div>
    )
}

// 첫번째 카드
const IntroCard = (props) => {
    const { modifiable, enterpriseJson, openCard, closeCard, setEnterpriseJson } = props;
    const classes = useStyles();

    // 수정 버튼을 클릭했는지에 대한 state
    const [modifyMode, setModifyMode] = React.useState(false)
    const confirmEvent = () => {
        const temp = { ...enterpriseJson }
        temp.introduction = tempIntroduction
        setEnterpriseJson(temp)
        setModifyMode(false);
        closeCard()
    }
    const cancelEvent = () => {
        setTempIntroduction(enterpriseJson.introduction)
        setModifyMode(false);
    }

    // 임시 저장
    const [tempIntroduction, setTempIntroduction] = React.useState(enterpriseJson.introduction);
    React.useEffect(() => {
        setTempIntroduction(enterpriseJson.introduction)
    }, [enterpriseJson]);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card className={classes.card} onClick={modifiable ? undefined : openCard} >
                <Box style={{
                    backgroundImage: "url(" + enterpriseJson.eimage + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
                    className={classes.imageBreak} />

                <Box sx={{ display: 'flex', flexDirection: 'column' }} className={classes.contentBreak} >

                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component={'div'} gutterBottom variant="h6">{enterpriseJson.ename}</Typography>
                        {
                            !modifyMode ?
                                <Typography component={'div'} variant="body2">
                                    {enterpriseJson.introduction}
                                </Typography>
                                :
                                <TextField
                                    label="여러분을 소개해주세요."
                                    multiline
                                    value={tempIntroduction}
                                    onChange={e => setTempIntroduction(e.target.value)}
                                />
                        }

                    </CardContent>
                    {modifiable &&
                        <>
                            {modifyMode ?
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", pl: 1, pb: 1 }}>
                                    <Button size="small" color="primary" onClick={confirmEvent}>저장</Button>
                                    <Button size="small" color="primary" onClick={cancelEvent}>취소</Button>
                                </Box>
                                :
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", pl: 1, pb: 1 }}>
                                    <Button size="small" color="primary" onClick={() => setModifyMode(true)}>수정</Button>
                                    <Button size="small" color="primary" onClick={closeCard}>닫기</Button>
                                </Box>}
                        </>
                    }
                </Box>
            </Card>
        </div>
    )
}

// 두번째 카드
const DetailCard = (props) => {
    const classes = useStyles();
    const { modifiable, enterpriseJson, openCard, closeCard, setEnterpriseJson } = props;

    // 수정버튼을 클릭한 state
    const [modifyMode, setModifyMode] = React.useState(false)
    const confirmEvent = () => {
        setModifyMode(false);
        closeCard();
        confirmHandler();
    }
    const cancelEvent = () => {
        setModifyMode(false);
        resetHandler();
    }

    const [open1, setOpen1] = React.useState(enterpriseJson.open1);
    const [close1, setClose1] = React.useState(enterpriseJson.close1);
    const [open2, setOpen2] = React.useState(enterpriseJson.open2);
    const [close2, setClose2] = React.useState(enterpriseJson.close2);
    const [email, setEmail] = React.useState(enterpriseJson.email);
    const [phone, setPhone] = React.useState(enterpriseJson.phone);

    // 리셋 이벤트
    const resetHandler = () => {
        setOpen1(enterpriseJson.open1)
        setClose1(enterpriseJson.close1)
        setOpen2(enterpriseJson.open2)
        setClose2(enterpriseJson.close2)
        setEmail(enterpriseJson.email)
        setPhone(enterpriseJson.phone)
    }
    // 확정 이벤트
    const confirmHandler = () => {
        const temp = { ...enterpriseJson }
        temp.open1 = open1;
        temp.close1 = close1;
        temp.open2 = open2;
        temp.close2 = close2
        temp.email = email
        temp.phone = phone
        setEnterpriseJson(temp)
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card className={classes.informCard} onClick={modifiable ? undefined : openCard} >
                <Box className={classes.inform}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }} className={classes.contentBreak} >
                        <CardContent sx={{ flex: '1 0 auto' }}>

                            <Typography component={'div'} gutterBottom variant="h6" sx={{ mb: 0 }}>
                                매장명
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0, mb: 2 }}>
                                {enterpriseJson.ename}
                            </Typography>

                            <Typography component={'div'} gutterBottom variant="h6" sx={{ mb: 0 }}>
                                도로명 주소
                            </Typography>
                            <Typography component={'div'} variant="body2" sx={{ mt: 0, mb: 2 }}>
                                {enterpriseJson.road_address}
                            </Typography>

                            <Typography component={'div'} gutterBottom variant="h6" sx={{ mb: 0 }}>
                                지번 주소
                            </Typography>
                            <Typography component={'div'} variant="body2" sx={{ mt: 0, mb: 2 }}>
                                {enterpriseJson.jibun_address}
                            </Typography>

                            <Typography component={'div'} gutterBottom variant="h6" sx={{ mb: 0 }}>
                                상세 주소
                            </Typography>
                            <Typography component={'div'} variant="body2" sx={{ mt: 0, mb: 2 }}>
                                {enterpriseJson.detail_address}
                            </Typography>

                            <Typography component={'div'} gutterBottom variant="h6" sx={{ mb: 0 }}>
                                우편 번호
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0, mb: 2 }}>
                                {enterpriseJson.postcode}
                            </Typography>



                        </CardContent>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }} className={classes.contentBreak} >
                        <CardContent sx={{ flex: '1 0 auto' }}>

                            <Typography component={'div'} gutterBottom variant="h6" sx={{ mb: 0 }}>
                                사업자 등록
                            </Typography>
                            <Typography component={'div'} variant="body2" sx={{ mt: 0, mb: 2 }}>
                                {enterpriseJson.ecategory}
                            </Typography>

                            <Typography component={'div'} gutterBottom variant="h6" sx={{ mb: 0 }}>
                                주중 영업 시간
                            </Typography>


                            <Typography component={'div'} variant="body2" sx={{ mt: 0, mb: 2 }}>
                                {!modifyMode ?
                                    <>
                                        {enterpriseJson.open1} ~ {enterpriseJson.close1}
                                    </>
                                    :
                                    <>
                                        <TextField
                                            label="주중영업 시작시간"
                                            multiline
                                            value={open1}
                                            onChange={e => setOpen1(e.target.value)}
                                        />
                                        ~
                                        <TextField
                                            label="주중영업 종료시간"
                                            multiline
                                            value={close1}
                                            onChange={e => setClose1(e.target.value)}
                                        />
                                    </>
                                }
                            </Typography>

                            <Typography component={'div'} gutterBottom variant="h6" sx={{ mb: 0 }}>
                                주말 영업 시간
                            </Typography>
                            <Typography component={'div'} variant="body2" sx={{ mt: 0, mb: 2 }}>
                                {!modifyMode ?
                                    <>
                                        {enterpriseJson.open2} ~ {enterpriseJson.close2}
                                    </>
                                    :
                                    <>
                                        <TextField
                                            label="주말영업 시작시간"
                                            multiline
                                            value={open2}
                                            onChange={e => setOpen2(e.target.value)}
                                        />
                                        ~
                                        <TextField
                                            label="주말영업 종료시간"
                                            multiline
                                            value={close2}
                                            onChange={e => setClose2(e.target.value)}
                                        />
                                    </>
                                }

                            </Typography>

                            <Typography component={'div'} gutterBottom variant="h6" sx={{ mb: 0 }}>
                                이메일
                            </Typography>
                            <Typography component={'div'} variant="body2" sx={{ mt: 0, mb: 2 }}>
                                {!modifyMode ?
                                    <>{enterpriseJson.email}</>
                                    :
                                    <TextField
                                        label="이메일"
                                        multiline
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                }
                            </Typography>

                            <Typography component={'div'} gutterBottom variant="h6" sx={{ mb: 0 }}>
                                연락처
                            </Typography>
                            <Typography component={'div'} variant="body2" sx={{ mt: 0, mb: 2 }}>
                                {!modifyMode ?
                                    <>{enterpriseJson.phone}</>
                                    :
                                    <TextField
                                        label="연락처"
                                        multiline
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                    />
                                }
                            </Typography>

                        </CardContent>
                    </Box>
                </Box>
                {modifiable &&
                    <>
                        {modifyMode ?
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", pl: 1, pb: 1 }}>
                                <Button size="small" color="primary" onClick={confirmEvent} >저장</Button>
                                <Button size="small" color="primary" onClick={cancelEvent}>취소</Button>
                            </Box>
                            :
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", pl: 1, pb: 1 }}>
                                <Button size="small" color="primary" onClick={() => setModifyMode(true)}>수정</Button>
                                <Button size="small" color="primary" onClick={closeCard}>닫기</Button>
                            </Box>}
                    </>
                }

            </Card>
        </div>
    )
}
const Inform = (props) => {
    const { userType, enterpriseJson, setEnterpriseJson } = props;
    const classes = useStyles();

    const [firstCard, setFirstCard] = React.useState(false);
    const [secondCard, setSecondCard] = React.useState(false);

    const openFirstCard = () => { setFirstCard(true) };
    const closeFirstCard = () => { setFirstCard(false) };
    const openSecondCard = () => { setSecondCard(true) };
    const closeSecondCard = () => { setSecondCard(false) };

    return (
        <div>
            <div className={classes.cardOnModal}>
                <IntroCard modifiable={false} enterpriseJson={enterpriseJson} openCard={openFirstCard} closeCard={closeFirstCard} />
            </div>
            <div className={classes.cardOnModal}>
                <DetailCard modifiable={false} enterpriseJson={enterpriseJson} openCard={openSecondCard} closeCard={closeSecondCard} />
            </div>

            <div className={classes.cardOnModal}>
                <MapCard enterpriseJson={enterpriseJson} />
            </div>

            {userType === "owner" &&
                <div>
                    {/* 첫번째 카드 수정 모달 */}
                    <Dialog onClose={closeFirstCard} open={firstCard}>
                        <IntroCard modifiable={true} enterpriseJson={enterpriseJson} setEnterpriseJson={setEnterpriseJson} openCard={openFirstCard} closeCard={closeFirstCard} />
                    </Dialog>

                    {/* 두번째 카드 수정 모달 */}
                    <Dialog onClose={closeSecondCard} open={secondCard}>
                        <DetailCard modifiable={true} enterpriseJson={enterpriseJson} setEnterpriseJson={setEnterpriseJson} openCard={openSecondCard} closeCard={closeSecondCard} />
                    </Dialog>
                </div>
            }
        </div>
    );
};

export default Inform;