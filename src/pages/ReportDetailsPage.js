// import { makeStyles } from "@material-ui/styles";
// import { historyPush, useModulesManager, toISODate, withHistory } from "@openimis/fe-core";
// import clsx from "clsx";
// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import ReportForm from "../components/ReportForm";
// import { useOverrideReportMutation, useReportQuery } from "../hooks";

// const useStyles = makeStyles((theme) => ({
//   page: theme.page,
//   fab: theme.fab,
// }));

// const ReportDetailsPage = (props) => {
//   const { match, history } = props;
//   const modulesManager = useModulesManager();
//   const { report, isLoading } = useReportQuery({ name: match.params.name }, { skip: !match.params.name });

//   const [values, setValues] = useState();
//   const classes = useStyles();

//   useEffect(() => {
//     setValues(report);
//   }, [report]);

//   const onSave = () => {
//     if (values) {
//       mutate({
//         name: values.name,
//         validityFrom: values.validityFrom ? moment(values.validityFrom).format() : null,
//         definition: values.definition,
//       });
//     }
//   };

//   const onChange = (newReport) => {
//     setValues(newReport);
//   };

//   return (
//     <div className={clsx(classes.page)}>
//       {!isLoading && (
//         <ReportForm
//           onChange={onChange}
//           report={values}
//           onBack={() => historyPush(modulesManager, history, "tools.reports")}
//           onSave={onSave}
//         />
//       )}
//     </div>
//   );
// };

// export default withHistory(ReportDetailsPage);
