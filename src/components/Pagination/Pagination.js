import React from "react";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  boldPagination: {
    "& .MuiPaginationItem-page": {
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
  },
}));

const PaginationBar = ({ setPage, numOfPages = 25 }) => {
  const classes = useStyles();

  const handlePageChange = (_event, page) => {
    setPage(page);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 50,
        paddingBottom: 6, 
        position: "relative",
      }}
    >
      <Pagination
        classes={{ ul: classes.boldPagination }}
        count={numOfPages}
        onChange={handlePageChange}
        variant="outlined" 
        color="primary"
        size="small"
      />
    </div>
  );
};

export default PaginationBar;