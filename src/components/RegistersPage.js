import React, { useState } from "react";
import { ProxyPage, useTranslations, ConstantBasedPicker } from "@openimis/fe-core";
import clsx from "clsx";
import {
  Tab,
  Tabs,
  Paper,
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Input,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  paper: theme.paper.paper,
  header: theme.paper.header,

  iframe: {
    overflow: "hidden",
    maxHeight: "80vh",
  },
}));

const useBlockStyles = makeStyles((theme) => ({
  block: {
    ...theme.paper.paper,
    margin: 0,
  },
  header: {
    ...theme.paper.header,
    ...theme.paper.title,
  },
}));

const Block = (props) => {
  const { title, className, children } = props;
  const classes = useBlockStyles();
  return (
    <Paper className={clsx(classes.block, className)}>
      {title && (
        <Box className={classes.header}>
          <Typography>{title}</Typography>
        </Box>
      )}
      <Box overflow="auto">
        <Box m="10px">{children}</Box>
      </Box>
    </Paper>
  );
};

const DIAGNOSES_STRATEGIES = ["INSERT_ONLY", "UPDATE_ONLY", "INSERT_UPDATE", "INSERT_UPDATE_DELETE"];
const LOCATIONS_STRATEGIES = ["INSERT_ONLY", "UPDATE_ONLY", "INSERT_UPDATE"];
const HEALTH_FACILITIES_STRATEGIES = LOCATIONS_STRATEGIES;

const ModernRegistersPage = (props) => {
  const { formatMessage } = useTranslations("tools.RegistersPage");
  const [forms, setForms] = useState({});

  const handleFieldChange = (formName, fieldName, value) => {
    setForms({
      ...forms,
      [formName]: {
        ...(forms[formName] ?? {}),
        [fieldName]: value,
      },
    });
  };

  return (
    <Box fullWidth m={"10px"}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Block title={formatMessage("diagnosesBlockTitle")}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Button variant="contained" color="primary">
                  {formatMessage("downloadBtn")}
                </Button>
              </Grid>
              <Grid item>
                <Divider fullWidth />
              </Grid>
              <Grid item>
                <Typography variant="h6">{formatMessage("diagnoses.uploadLabel")}</Typography>
              </Grid>
              <Grid item>
                <form noValidate>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      <Input
                        onChange={(value) => handleFieldChange("diagnoses", "file", value)}
                        required
                        id="import-button"
                        inputProps={{
                          accept:
                            ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
                        }}
                        type="file"
                      />
                    </Grid>
                    <Grid item>
                      <ConstantBasedPicker
                        module="tools"
                        label="strategyPicker"
                        onChange={(value) => handleFieldChange("diagnoses", "strategy", value)}
                        required
                        constants={DIAGNOSES_STRATEGIES}
                        withNull
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        label={formatMessage("dryRunLabel")}
                        control={
                          <Checkbox
                            checked={forms.diagnoses?.dryRun}
                            onChange={(e) => handleFieldChange("diagnoses", "dryRun", e.target.checked)}
                          />
                        }
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!(forms.diagnoses?.file && forms.diagnoses?.strategy)}
                      >
                        {formatMessage("uploadBtn")}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Block>
        </Grid>
        <Grid item xs={4}>
          <Block title={formatMessage("locationsBlockTitle")}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Button variant="contained" color="primary">
                  {formatMessage("downloadBtn")}
                </Button>
              </Grid>
              <Grid item>
                <Divider fullWidth />
              </Grid>
              <Grid item>
                <Typography variant="h6">{formatMessage("locations.uploadLabel")}</Typography>
              </Grid>
              <Grid item>
                <form noValidate>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      <Input
                        onChange={(value) => handleFieldChange("locations", "file", value)}
                        required
                        id="import-button"
                        inputProps={{
                          accept:
                            ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
                        }}
                        type="file"
                      />
                    </Grid>
                    <Grid item>
                      <ConstantBasedPicker
                        module="tools"
                        label="strategyPicker"
                        onChange={(value) => handleFieldChange("locations", "strategy", value)}
                        required
                        constants={LOCATIONS_STRATEGIES}
                        withNull
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        label={formatMessage("dryRunLabel")}
                        control={
                          <Checkbox
                            checked={forms.locations?.dryRun}
                            onChange={(e) => handleFieldChange("diagnoses", "dryRun", e.target.checked)}
                          />
                        }
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!(forms.locations?.file && forms.locations?.strategy)}
                      >
                        {formatMessage("uploadBtn")}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Block>
        </Grid>
        <Grid item xs={4}>
          <Block title={formatMessage("healthFacilitiesBlockTitle")}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Button variant="contained" color="primary">
                  {formatMessage("downloadBtn")}
                </Button>
              </Grid>
              <Grid item>
                <Divider fullWidth />
              </Grid>
              <Grid item>
                <Typography variant="h6">{formatMessage("healthFacilities.uploadLabel")}</Typography>
              </Grid>
              <Grid item>
                <form noValidate>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      <Input
                        onChange={(value) => handleFieldChange("healthFacilities", "file", value)}
                        required
                        id="import-button"
                        inputProps={{
                          accept:
                            ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
                        }}
                        type="file"
                      />
                    </Grid>
                    <Grid item>
                      <ConstantBasedPicker
                        module="tools"
                        label="strategyPicker"
                        onChange={(value) => handleFieldChange("healthFacilities", "strategy", value)}
                        required
                        constants={HEALTH_FACILITIES_STRATEGIES}
                        withNull
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        label={formatMessage("dryRunLabel")}
                        control={
                          <Checkbox
                            checked={forms.healthFacilities?.dryRun}
                            onChange={(e) => handleFieldChange("healthFacilities", "dryRun", e.target.checked)}
                          />
                        }
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!(forms.healthFacilities?.file && forms.healthFacilities?.strategy)}
                      >
                        {formatMessage("uploadBtn")}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Block>
        </Grid>
      </Grid>
    </Box>
  );
};

const RegistersPage = (props) => {
  const {} = props;
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState("modern");
  const { formatMessage } = useTranslations("tools.RegistersPage");
  return (
    <>
      <Paper className={classes.paper}>
        <Tabs
          className={classes.header}
          value={currentTab}
          indicatorColor="primary"
          onChange={(_, value) => setCurrentTab(value)}
        >
          <Tab value="modern" label={formatMessage("modernView")}></Tab>
          <Tab value="legacy" label={formatMessage("legacyView")}></Tab>
        </Tabs>
        {currentTab === "legacy" && (
          <Box p={2}>
            <div className={classes.iframe}>
              <ProxyPage url="/Registers.aspx" />
            </div>
          </Box>
        )}
      </Paper>
      {currentTab === "modern" && <ModernRegistersPage />}
    </>
  );
};

export default RegistersPage;
