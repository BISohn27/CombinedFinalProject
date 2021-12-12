import { AppBar, Toolbar, Typography,Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        background: "#222222",
    },
}));

const Navbar = (props) => {
    const navigation = useNavigate();

    const { ENAME, setLoginState ,loginState, eno} = props;

    const classes = useStyles();

    const onClick = async () => {
        const token = localStorage.getItem("token");
        const state = await axios({
            url:"http://localhost:20000/logouts",
            method:"post",
            headers: {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            data: {
                token: token,
                eno: eno
            }
        });
        window.localStorage.clear();
        setLoginState(false);
    };

    const nameClick = () => {
        const url = '/'
        setLoginState(false);
        navigation(url);
    }

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" component="span" onClick={nameClick}>
                    {ENAME}
                </Typography>
                {!loginState ? null : <Button style={{color:"white",}} onClick={onClick}>로그아웃</Button>}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;