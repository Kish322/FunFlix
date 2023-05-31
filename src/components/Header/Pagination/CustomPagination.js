import { ThemeProvider, createTheme, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const darkTheme = createTheme({
  palette: {
    type: "light"
  }
});

const useStyles = makeStyles((theme) => ({
  boldPagination: {
    "& .MuiPaginationItem-page": {
      fontWeight: "bold",
      fontSize: "1.2rem"
    }
  }
}));

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const classes = useStyles();

  const handlePageChange = (_event, page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
        position: "relative",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          classes={{ ul: classes.boldPagination }}
          count={numOfPages}
          onChange={handlePageChange}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
