import React from "react";
import { Box, Button, Card, CardContent, Dialog, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { createTheme } from "@mui/material/styles";
import { useParams } from 'react-router-dom';
import superagent from "superagent";

const theme = createTheme()
const useStyles = makeStyles(() => ({
    media: {
        height: 250,
        [theme.breakpoints.down("sm")]: {
            height: 150,
        },
    },
    cardMarginInFeed: {
        marginBottom: theme.spacing(5),
    },
    card: {
        // marginBottom: theme.spacing(5),

        [theme.breakpoints.down("sm")]: {
            minWidth: "70vw",
        },
        [theme.breakpoints.up("sm")]: {
            display: 'flex',
            width: "50vw",
        },
    },
    content: {
        // marginRight: theme.spacing(1)
        maxWidth: "300px"
    },
    imageBreak: {
        minHeight: "300px",
        [theme.breakpoints.up("sm")]: {
            width: "50%",
            minHeight: "300px",
            maxWidth: "300px",
            [theme.breakpoints.up("lg")]: {
                Width: "200px"
            },
        },
    },
    gallery: {
        width: "70vw",
        height: "70vw",
        [theme.breakpoints.up("sm")]: {
            width: "40vw",
            height: "40vw",
        },
    },
    contentBreak: {
        [theme.breakpoints.up("sm")]: {
            // width: "50vw",
            [theme.breakpoints.down("lg")]: {
                width: "50%"
            },
        },
    }
}));

const Post = (props) => {
    // option : 사진과 텍스트를 어떤 비율로 넣을지 선택 (default = 사진+텍스트, gallery = 사진)
    const { userType, option, updateEnterprise, index, value,removeList } = props;
    const classes = useStyles();
    const [dialogCard, setDialogCard] = React.useState(false);
    const openCard = () => { setDialogCard(true) };
    const closeCard = () => { setDialogCard(false) };

    const { enterpriseCode } = useParams();
    // 임시저장하고, 수정되면 PUT 요청을 보내는 state와 함수
    const [menuTemp, setMenuTemp] = React.useState();
    React.useEffect(() => {
        if (menuTemp) {
            const url = "http://localhost:20000/enterprises/" + enterpriseCode + "/menus/" + value.mcode;

            superagent.put(url)
                .set('Content-Type', 'application/json')
                .send(menuTemp)
                .end((err, res) => {
                    if (!err && JSON.parse(res.text).status) {
                        updateEnterprise(option, index, value.mimage, menuTemp)
                    }
                })
        }
    }, [menuTemp])

    return (
        <div style={{ display: "flex", justifyContent: "center" }} className={classes.cardMarginInFeed}>
            <PostContent
                value={value}
                index={index}
                modifiable={false}
                option={option}
                updateEnterprise={setMenuTemp}
                openCard={openCard}
                closeCard={closeCard}
                removeList={removeList}
            />

            {userType === "owner" &&
                <Dialog onClose={closeCard} open={dialogCard}>
                    <PostContent
                        value={value}
                        index={index}
                        modifiable={true}
                        option={option}
                        updateEnterprise={setMenuTemp}
                        openCard={openCard}
                        closeCard={closeCard}
                        removeList={removeList}
                    />
                </Dialog>
            }
        </div>
    );
};

const PostContent = (props) => {
    const { modifiable, option, updateEnterprise, openCard, closeCard, value, index, removeList } = props;
    const classes = useStyles();
    // 수정 버튼을 클릭했는지에 대한 state
    const [modifyMode, setModifyMode] = React.useState(false)
    const confirmEvent = () => {
        const text = {};
        text.mname = tempTitle;
        text.price = tempPrice;
        text.mcomment = tempChildren;
        // updateEnterprise(option, index, value.mimage, text)
        updateEnterprise(text);
        setModifyMode(false);
        closeCard()
    }
    const cancelEvent = () => {
        setTempTitle(value.mname)
        setTempPrice(value.price)
        setTempChildren(value.mcomment)
        // setTempIntroduction(enterpriseJson.INTRODUCTION)
        setModifyMode(false);
    }
    // 수정을 위한 임시 저장 state
    const [tempTitle, setTempTitle] = React.useState(value.mname);
    const [tempPrice, setTempPrice] = React.useState(value.price);
    const [tempChildren, setTempChildren] = React.useState(value.mcomment);
    
    return (
        <Card className={classes.card} onClick={modifiable ? undefined : openCard}>
            {
                value.mimage !== "" && 
                <Box style={{
                    backgroundImage: "url(" + value.mimage + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
                    className={option === "gallery" ? classes.gallery : classes.imageBreak} />
            }
            

            {option !== "gallery" &&
                <Box sx={{ display: 'flex', flexDirection: 'column' }} className={classes.contentBreak} >
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component={"span"} className={classes.content} gutterBottom variant="h6">
                            {!modifyMode ?
                                <>
                                    {value.mname}
                                </>
                                :
                                <TextField
                                    label="메뉴 이름"
                                    multiline
                                    value={tempTitle}
                                    onChange={e => setTempTitle(e.target.value)}
                                />
                            }
                        </Typography>
                        <br />
                        <Typography component={"span"} className={classes.content} variant="body2">
                            {!modifyMode ?
                                <>
                                    {value.mcomment}
                                </>
                                :
                                <TextField
                                    label="메뉴 설명"
                                    multiline
                                    value={tempChildren}
                                    onChange={e => setTempChildren(e.target.value)}
                                />
                            }
                        </Typography>
                        <br />
                        <Typography component={"span"} className={classes.content} variant="body2">
                            {!modifyMode ?
                                <>
                                    {value.price}
                                </>
                                :
                                <TextField
                                    label="가격"
                                    multiline
                                    value={tempPrice}
                                    onChange={e => setTempPrice(e.target.value)}
                                />
                            }
                        </Typography>
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
                                    <Button size="small" color="secondary" onClick={() => removeList("Menu", index, value.mcode)}>삭제</Button>
                                    <Button size="small" color="primary" onClick={() => setModifyMode(true)}>수정</Button>
                                    <Button size="small" color="primary" onClick={closeCard}>닫기</Button>
                                </Box>}
                        </>
                    }
                </Box>
            }
        </Card>
    )
}

export default Post;