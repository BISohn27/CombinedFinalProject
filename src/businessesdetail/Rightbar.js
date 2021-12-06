import { Container, ImageList, ImageListItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { createTheme } from "@mui/material/styles";


const theme = createTheme()
const useStyles = makeStyles(() => ({
  container: {
    height: "100vh",
    color: "white",
    position: "sticky",
    top: 0,
    paddingTop: theme.spacing(10),
    cursor: "pointer",
    backgroundColor: theme.palette.primary.main,
    overflow: "scroll",
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7"
    }
  },
  title: {
    color: "#555",
    fontWeight: 500,
  },
}));

const RightBar = (props) => {
  const { imageJson, setFeed } = props;
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography variant="h6" className={classes.title} sx={{ mt: 1 }}>
        갤러리
      </Typography>
      <ImageList cols={3} style={{ marginBottom: 20, marginTop: 10 }} onClick={()=>setFeed("Gallery")}>
        {imageJson.images.slice(0,9).map((value, index) => (
          <ImageListItem key={index}>
            <img
              src={`${value.path}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${value.path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={index}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  )
};

export default RightBar;