import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        background: "#222222",
    },
}));

const Navbar = (props) => {
    const { ENAME} = props;

    const classes = useStyles();
    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" component="span">
                    {ENAME}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;