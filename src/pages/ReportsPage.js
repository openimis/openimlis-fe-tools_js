import { makeStyles } from "@material-ui/styles";
import React from "react";
import ReportSearcher from "../components/ReportSearcher";

const useStyles = makeStyles((theme) => ({
  page: theme.page,
}));

const ReportsPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <ReportSearcher />
    </div>
  );
};
export default ReportsPage;
