import React from "react";
import { Container, Dialog, MenuItem, TextField, Button, Box, InputLabel, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useParams } from 'react-router-dom';

const theme = createTheme();
const useStyles = makeStyles(() => ({
    contentFrame: {
        minWidth: "200px",
        marginTop: theme.spacing(3),
        // height: "90vh",
        // width: "90vw",
        // [theme.breakpoints.up("sm")]: {
        //     height: "400px",
        //     width: "400px"
        // },
    },
    container: {
        paddingBottm: theme.spacing(5),
        paddingTop: theme.spacing(2)
    },
    components: {
        width: "100%",
    }
}));

const UploadForm = (props) => {
    const { option, setOption, categories, openPostModal, setOpenPostModal } = props;
    const classes = useStyles();


    // 파일 선택 state
    const [selectedFile, setSelectedFile] = React.useState();
    // 카테고리 선택 state
    const [category, setCategory] = React.useState();
    // 사용자 지정 카테고리 state
    const [customCategory, setCustomCategory] = React.useState();
    // 메뉴 이름 state
    const [menuName, setMenuName] = React.useState();
    // 메뉴 설명 state
    const [menuComment, setMenuComment] = React.useState();
    // 메뉴 가격 state
    const [menuPrice, setMenuPrice] = React.useState();

    const fileSelectedHandler = event => {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
    }

    const resetExitHandler = () => {
        setOpenPostModal(false);
        setSelectedFile();
        setCategory();
        setCustomCategory();
        setMenuName();
        setMenuComment();
        setMenuPrice();
        setOption();
    }

    const fileUploadHandler = () => {
        const formData = new FormData();
        if (selectedFile) {
            formData.append("files", selectedFile);
        }

        if (option !== "gallery") {
            if (!selectedFile || !category || !menuName || !menuComment || !menuPrice)
                return
            const uploadCategory = (category === "사용자 지정" ? customCategory : category)
            if (!uploadCategory)
                return
            const uploadJson = {}
            uploadJson["mname"] = menuName;
            uploadJson["price"] = menuPrice;
            uploadJson["mcomment"] = menuComment;
            uploadJson["mcategory"] = uploadCategory;

            formData.append("data", JSON.stringify(uploadJson));
        }

        const url = "http://localhost:20000/enterprises/" + enterpriseCode
        const postUrl = url + (option !== "gallery" ? "/menus" : "/images");

        axios({
            method: "post",
            url: postUrl,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((err, res) => {
            console.log(err);
            console.log(res);
            resetExitHandler();
        })
    }

    const { enterpriseCode } = useParams();

    return (
        <Dialog onClose={resetExitHandler} open={openPostModal}>
            <Container className={classes.container}>

                <div className={classes.contentFrame}>
                    <Typography variant="h6">{option !== "gallery" ? "메뉴 생성" : "갤러리 생성"}</Typography>
                </div>

                <div className={classes.contentFrame}>
                    <InputLabel shrink={true}>JPG 이미지 선택</InputLabel>
                    <input type="file" multiple="multiple" onChange={fileSelectedHandler} />
                </div>

                {
                    // 갤러리가 아닐 경우에만(메뉴일 경우) 실행
                    option !== "gallery" && <div>

                        <div className={classes.contentFrame}>
                            <TextField value={category || ""}
                                select
                                label="카테고리"
                                size="small"
                                className={classes.components}
                                variant="standard"
                                InputLabelProps={{
                                    shrink: true,
                                }}>
                                {categories && categories.map((value, index) => (
                                    <MenuItem onClick={() => setCategory(value)} key={index} value={value}>{value}</MenuItem>
                                ))}
                                <MenuItem onClick={() => setCategory("사용자 지정")} value={"사용자 지정"}>사용자 지정</MenuItem>
                            </TextField>
                        </div>

                        {
                            category === "사용자 지정" &&
                            <div className={classes.contentFrame}>
                                <TextField
                                    label="카테고리 사용자 지정"
                                    value={customCategory || ""}
                                    onChange={e => setCustomCategory(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    className={classes.components}
                                />
                            </div>
                        }

                        <div className={classes.contentFrame}>
                            <TextField
                                label="메뉴 이름"
                                value={menuName || ""}
                                onChange={e => setMenuName(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                className={classes.components}
                            />
                        </div>

                        <div className={classes.contentFrame}>
                            <TextField
                                label="메뉴 설명"
                                value={menuComment || ""}
                                onChange={e => setMenuComment(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                multiline
                                variant="standard"
                                className={classes.components}
                            />
                        </div>

                        <div className={classes.contentFrame}>
                            <TextField
                                label="메뉴 가격"
                                type="number"
                                value={menuPrice || ""}
                                onChange={e => setMenuPrice(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                className={classes.components}
                            />
                        </div>
                    </div>}

                <div className={classes.contentFrame}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", pl: 1, pb: 1 }}>
                        <Button size="small" color="primary" onClick={fileUploadHandler}>저장</Button>
                        <Button size="small" color="primary" onClick={resetExitHandler}>취소</Button>
                    </Box>
                </div>
            </Container>

        </Dialog>
    );
};

export default UploadForm;