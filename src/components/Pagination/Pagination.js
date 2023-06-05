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

const PaginationBar = ({ setPage, numOfPages = 15 }) => {
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
        marginTop: 40, // Adjust the marginTop value to move the pagination down
        position: "relative",
      }}
    >
      <Pagination
        classes={{ ul: classes.boldPagination }}
        count={numOfPages}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationBar;
