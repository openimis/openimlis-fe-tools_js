import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { ErrorBoundary, SelectInput, useBoolean, useModulesManager, useTranslations } from "@openimis/fe-core";
import React, { useEffect, useMemo, useState } from "react";
import { useReportQuery } from "../hooks";
import ReportPicker from "./ReportPicker";

const GenerateReportPicker = (props) => {
  const { name, outputFormat = "pdf", children } = props;
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("tools.GenerateReportPicker", modulesManager);
  const [isOpen, { toggle }] = useBoolean(false);
  const [values, setValues] = useState({ outputFormat });
  const reportQuery = useReportQuery({ name }, { skip: !name });
  const [report, setReport] = useState();
  const moduleReport = modulesManager.getReport(report?.name);

  useEffect(() => {
    if (reportQuery?.report) {
      setReport(reportQuery?.report);
    }
  }, [reportQuery]);

  const onSubmit = () => {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(moduleReport.getParams(values))) {
      query.set(key, value);
    }
    window.open(`/api/report/${report.name}/${values.outputFormat}/?${query.toString()}`, "_blank", "download");
    toggle();
  };
  const isValid = Boolean(report && values.outputFormat && moduleReport?.isValid && moduleReport.isValid(values));
  return (
    <>
      {children ? (
        children({ toggle })
      ) : (
        <Button onClick={toggle} variant="contained" size="small">
          {formatMessage("triggerBtn")}
        </Button>
      )}
      <Dialog open={isOpen} onClose={toggle}>
        <DialogTitle>{formatMessage("title")}</DialogTitle>
        <DialogContent>
          <ErrorBoundary>
            {!name && (
              <Box mb={2}>
                <ReportPicker value={report} onChange={setReport} />
              </Box>
            )}
            {!props.outputFormat && (
              <Box mb={1}>
                <SelectInput
                  module="tools"
                  required
                  label="GenerateReportPicker.formatLabel"
                  options={[
                    { value: "pdf", label: "PDF" },
                    { value: "xlsx", label: "XLSX" },
                  ]}
                  value={values.outputFormat}
                  onChange={(outputFormat) => setValues({ ...values, outputFormat })}
                />
              </Box>
            )}
            {moduleReport?.component && (
              <moduleReport.component report={report} values={values} setValues={setValues} />
            )}
          </ErrorBoundary>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle}>{formatMessage("cancelBtn")}</Button>
          <Button disabled={!isValid} onClick={onSubmit}>
            {formatMessage("generateBtn")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GenerateReportPicker;
