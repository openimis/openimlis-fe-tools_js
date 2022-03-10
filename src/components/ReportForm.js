import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Form, PublishedComponent } from "@openimis/fe-core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  item: theme.paper.item,
}));

const MainPanel = ({ edited, onEditedChanged }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={4} className={classes.item}>
        <PublishedComponent
          pubRef="tools.ReportDefinitionEditor"
          value={edited.definition}
          defaultValue={edited.defaultReport}
          onChange={(definition) => onEditedChanged({ ...edited, definition })}
        />
      </Grid>
    </Grid>
  );
};

const ReportForm = ({ onBack, onSave, report, onChange }) => {
  if (!report) {
    return null;
  }
  return (
    <Form
      module="tools"
      title="ReportForm.title"
      titleParams={{ name: report.name }}
      HeadPanel={MainPanel}
      onEditedChanged={onChange}
      edited={report}
      edited_id={report.name}
      save={onSave}
      back={onBack}
    />
  );
};
export default ReportForm;
