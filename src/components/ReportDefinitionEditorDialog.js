import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslations, useModulesManager } from "@openimis/fe-core";
import ReportBro from "./ReportBro";
import { useOverrideReportMutation, useReportQuery } from "../hooks";

const useDialogStyles = makeStyles(() => ({
  root: {
    zIndex: "2001 !important",
  },
  paper: {
    height: "100%",
  },
}));

const useDialogContentStyles = makeStyles(() => ({
  dialogContent: {
    padding: 0,
  },
}));

const ReportDefinitionEditorDialog = (props) => {
  const { name, onClose } = props;
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("tools", modulesManager);
  const [resetKey, setResetKey] = useState(null);
  const dialogClasses = useDialogStyles();
  const classes = useDialogContentStyles();
  const { report, isLoading } = useReportQuery({ name });
  const { mutate } = useOverrideReportMutation();
  const [definition, setDefinition] = useState(null);

  useEffect(() => {
    setDefinition(report?.definition ?? report?.defaultReport);
  }, [report]);

  const onReset = () => {
    setResetKey(Date.now());
    setDefinition(report?.defaultReport);
  };

  const handleChange = async (value) => {
    await mutate({ name, definition: value });
    onClose();
  };

  return (
    <Dialog classes={dialogClasses} maxWidth="xl" open fullWidth onClose={onClose}>
      <DialogTitle>{formatMessage("ReportDefinitionEditor.title")}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {report && <ReportBro key={resetKey} definition={definition} onChange={handleChange} />}
        {isLoading && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        {report?.defaultReport && (
          <Button onClick={onReset}>{formatMessage("tools.ReportDefinitionEditor.resetToDefault")}</Button>
        )}
        <Button onClick={onClose}>{formatMessage("tools.ReportDefinitionEditor.cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDefinitionEditorDialog;
