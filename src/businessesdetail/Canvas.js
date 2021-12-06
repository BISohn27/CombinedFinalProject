import React from "react";
import { Box, Card, Dialog, Button } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { createTheme } from "@mui/material/styles";

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
            // width: "50vw",
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

const Canvas = (props) => {
    // option : 사진과 텍스트를 어떤 비율로 넣을지 선택 (default = 사진+텍스트, gallery = 사진)
    const { userType, index, value, removeList } = props;
    const classes = useStyles();
    const [dialogCard, setDialogCard] = React.useState(false);
    const openCard = () => { setDialogCard(true) };
    const closeCard = () => { setDialogCard(false) };

    return (
        <div style={{ display: "flex", justifyContent: "center" }} className={classes.cardMarginInFeed}>
            <PostContent
                value={value}
                index={index}
                modifiable={false}
                openCard={openCard}
                closeCard={closeCard}
            />

            {userType === "owner" &&
                <Dialog onClose={closeCard} open={dialogCard}>
                    <PostContent
                        value={value}
                        index={index}
                        modifiable={true}
                        openCard={openCard}
                        closeCard={closeCard}
                    />
                    <Button size="small" color="secondary" onClick={() => removeList("Gallery", index, value.ino)}>삭제</Button>
                    <Button size="small" color="primary" onClick={() => setDialogCard(false)}>닫기</Button>
                </Dialog>
            }
        </div>
    );
};

const PostContent = (props) => {
    const { modifiable, openCard, value } = props;
    const classes = useStyles();
    return (
        <Card className={classes.card} onClick={modifiable ? undefined : openCard}>
            <Box style={{
                backgroundImage: "url(" + value.path + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
                className={classes.gallery} />

        </Card>
    )
}

export default Canvas;