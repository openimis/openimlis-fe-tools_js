import React, { useState } from "react";

import { useTranslations, ConstantBasedPicker, baseApiUrl, ProgressOrError, apiHeaders } from "@openimis/fe-core";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Input,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import {
  STRATEGY_INSERT,
  STRATEGY_INSERT_UPDATE,
  STRATEGY_INSERT_UPDATE_DELETE,
  STRATEGY_UPDATE,
  RIGHT_REGISTERS_DIAGNOSES,
  RIGHT_REGISTERS_HEALTH_FACILITIES,
  RIGHT_REGISTERS_LOCATIONS,
  RIGHT_REGISTERS_ITEMS,
  RIGHT_REGISTERS_SERVICES,
} from "../constants";
import Block from "../components/Block";

const DIAGNOSES_STRATEGIES = [STRATEGY_INSERT, STRATEGY_UPDATE, STRATEGY_INSERT_UPDATE, STRATEGY_INSERT_UPDATE_DELETE];
const LOCATIONS_STRATEGIES = [STRATEGY_INSERT, STRATEGY_UPDATE, STRATEGY_INSERT_UPDATE];
const HEALTH_FACILITIES_STRATEGIES = LOCATIONS_STRATEGIES;
const MEDICAL_ITEMS_STRATEGIES = DIAGNOSES_STRATEGIES;

const RegistersPage = () => {
  const { formatMessage } = useTranslations("tools.RegistersPage");
  const [forms, setForms] = useState({});
  const rights = useSelector((state) => state.core?.user?.i_user?.rights ?? []);
  const [dialogState, setDialogState] = useState({});
  const [popupState, setPopupState] = useState({});

  const hasRights = (rightsList) => rightsList.every((x) => rights.includes(x));

  const handleFieldChange = (formName, fieldName, value) => {
    setForms({
      ...forms,
      [formName]: {
        ...(forms[formName] ?? {}),
        [fieldName]: value,
      },
    });
  };

  const REGISTERS_URL = `${baseApiUrl}/tools/registers`;

  const onRegisterDownload = (register) => (e) => window.open(`${REGISTERS_URL}/download_${register}`);

  const openPopup = (e, uploadType) => {
    setPopupState({
      open: true,
      openLocations: uploadType === 'locations',
      openDiagnosis: uploadType === 'diagnosis',
      openHF: uploadType === 'hf',
      openItems: uploadType === 'items',
      anchorEl: e.currentTarget,
      error: null,
    });
  }

  const onPopupClose = (e) => {
    setPopupState({
      open: false,
      openLocations: false,
      openDiagnosis: false,
      openHF: false,
      openItems: false,
      anchorEl: null,
      error: null,
    });
  }

  const onDialogClose = (reason) => {
    if (reason === "escapeKeyDown" || reason === "backdropClick") {
      return;
    }
    setDialogState({ open: false });
  };

  const onSubmit = async (values, register) => {
    setDialogState({
      open: true,
      isLoading: true,
      data: null,
      error: null,
    });
    setPopupState({
      open: false,
      anchorEl: null,
      error: null,
    });
    const formData = new FormData();
    formData.append("dry_run", Boolean(values.dryRun));
    formData.append("file", values.file);
    formData.append("strategy", values.strategy);

    try {
      const response = await fetch(`${REGISTERS_URL}/upload_${register}`, {
        headers: apiHeaders,
        body: formData,
        method: "POST",
        credentials: "same-origin",
      });
      if (response.status >= 400) {
        throw new Error("Unknown error");
      }

      const payload = await response.json();
      setDialogState({
        open: true,
        isLoading: false,
        success: payload.success,
        data: payload.data,
        error: payload.error,
      });
    } catch (error) {
      console.error(error);
      setDialogState({
        open: true,
        isLoading: false,
        data: null,
        error: error?.message ?? formatMessage("An unknown error occurred. Please contact your administrator."),
      });
    }
  };
  console.log("TOOLS RENDERING")
  return (
    <>
      {dialogState?.open && (
        <Dialog open onClose={onDialogClose} fullWidth maxWidth="sm">
          <DialogTitle>{formatMessage("UploadDialog.title")}</DialogTitle>
          <DialogContent>
            <ProgressOrError progress={dialogState.isLoading} />
            {dialogState.error && <Box my={1}>{dialogState.error}</Box>}
            {!dialogState.isLoading && dialogState.data && (
              <>
                <Box my={1}>
                  <b>Status:</b>{" "}
                  {dialogState.success ? formatMessage("UploadDialog.success") : formatMessage("UploadDialog.failure")}
                </Box>
                {"sent" in dialogState.data && (
                  <Box my={1}>
                    <b>{formatMessage("UploadDialog.sent")}</b> {dialogState.data.sent}
                  </Box>
                )}
                {"created" in dialogState.data && (
                  <Box my={1}>
                    <b>{formatMessage("UploadDialog.created")}</b> {dialogState.data.created}
                  </Box>
                )}
                {"updated" in dialogState.data && (
                  <Box my={1}>
                    <b>{formatMessage("UploadDialog.updated")}</b> {dialogState.data.updated}
                  </Box>
                )}
                {"deleted" in dialogState.data && (
                  <Box my={1}>
                    <b>{formatMessage("UploadDialog.deleted")}</b> {dialogState.data.deleted}
                  </Box>
                )}
                {dialogState.data?.errors?.length > 0 && (
                  <Box my={1}>
                    <b>{formatMessage("UploadDialog.errors")}</b> {dialogState.data.errors.join(", ")}
                  </Box>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button disabled={dialogState.isLoading} onClick={onDialogClose} variant="primary">
              {formatMessage("UploadDialog.okButton")}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Box fullWidth m={2}>
        <Grid container spacing={2}>
          {hasRights(RIGHT_REGISTERS_DIAGNOSES) && (
            <Grid item xs={4}>
              <Block title={formatMessage("diagnosesBlockTitle")}>
                <Grid container spacing={2} direction="column">
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={onRegisterDownload("diagnoses")}>
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
                            onChange={(event) => handleFieldChange("diagnoses", "file", event.target.files[0])}
                            required
                            id="import-button"
                            inputProps={{
                              accept: ".xml, application/xml, text/xml",
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
                          onClick={(e) => openPopup(e, 'diagnosis')}
                          disabled={!(forms.diagnoses?.file && forms.diagnoses?.strategy)}
                        >
                          {formatMessage("uploadBtn")}
                        </Button>
                        {popupState?.open && popupState?.openDiagnosis && (
                        <Dialog open onClose={onPopupClose} fullWidth maxWidth="sm">
                            <DialogTitle>{formatMessage("UploadDialog.confirmDiagnoses")}</DialogTitle>
                            <DialogActions>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => onSubmit(forms.diagnoses, "diagnoses")}
                              disabled={!(forms.diagnoses?.file && forms.diagnoses?.strategy)}
                            >
                              {formatMessage("uploadBtn")}
                            </Button>
                            <Button onClick={onPopupClose} variant="contained">
                              {formatMessage("cancelBtn")}
                            </Button>
                            </DialogActions>
                          </Dialog>)}
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Block>
            </Grid>
          )}
          {hasRights(RIGHT_REGISTERS_LOCATIONS) && (
            <Grid item xs={4}>
              <Block title={formatMessage("locationsBlockTitle")}>
                <Grid container spacing={2} direction="column">
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={onRegisterDownload("locations")}>
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
                            onChange={(event) => handleFieldChange("locations", "file", event.target.files[0])}
                            required
                            id="import-button"
                            inputProps={{
                              accept: ".xml, application/xml, text/xml",
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
                                onChange={(e) => handleFieldChange("locations", "dryRun", e.target.checked)}
                              />
                            }
                          />
                        </Grid>
                        <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => openPopup(e, 'locations')}
                            disabled={!(forms.locations?.file && forms.locations?.strategy)}
                          >
                          {formatMessage("uploadBtn")}
                        </Button>
                        {popupState?.open && popupState?.openLocations && (
                        <Dialog open onClose={onPopupClose} fullWidth maxWidth="sm">
                            <DialogTitle>{formatMessage("UploadDialog.confirmLocations")}</DialogTitle>
                            <DialogActions>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => onSubmit(forms.locations, "locations")}
                                disabled={!(forms.locations?.file && forms.locations?.strategy)}
                              >
                              {formatMessage("uploadBtn")}
                              </Button>
                              <Button onClick={onPopupClose} variant="contained">
                                {formatMessage("cancelBtn")}
                              </Button>
                            </DialogActions>
                          </Dialog>)}
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Block>
            </Grid>
          )}
          {hasRights(RIGHT_REGISTERS_HEALTH_FACILITIES) && (
            <Grid item xs={4}>
              <Block title={formatMessage("healthFacilitiesBlockTitle")}>
                <Grid container spacing={2} direction="column">
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={onRegisterDownload("healthfacilities")}>
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
                            onChange={(event) => handleFieldChange("healthFacilities", "file", event.target.files[0])}
                            required
                            id="import-button"
                            inputProps={{
                              accept: ".xml, application/xml, text/xml",
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
                          onClick={(e) => openPopup(e, 'hf')}
                          disabled={!(forms.healthFacilities?.file && forms.healthFacilities?.strategy)}
                        >
                        {formatMessage("uploadBtn")}
                        </Button>
                        {popupState?.open && popupState?.openHF && (
                        <Dialog open onClose={onPopupClose} fullWidth maxWidth="sm">
                            <DialogTitle>{formatMessage("UploadDialog.confirmHF")}</DialogTitle>
                            <DialogActions>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => onSubmit(forms.healthFacilities, "healthfacilities")}
                                disabled={!(forms.healthFacilities?.file && forms.healthFacilities?.strategy)}
                              >
                                {formatMessage("uploadBtn")}
                            </Button>
                            <Button onClick={onPopupClose} variant="contained">
                              {formatMessage("cancelBtn")}
                            </Button>
                            </DialogActions>
                          </Dialog>)}
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Block>
            </Grid>
          )}
          {hasRights(RIGHT_REGISTERS_ITEMS) && (
            <Grid item xs={4}>
              <Block title={formatMessage("itemsBlockTitle")}>
                <Grid container spacing={2} direction="column">
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={onRegisterDownload("items")}>
                      {formatMessage("downloadBtn")}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Divider fullWidth />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{formatMessage("items.uploadLabel")}</Typography>
                  </Grid>
                  <Grid item>
                    <form noValidate>
                      <Grid container spacing={1} direction="column">
                        <Grid item>
                          <Input
                            onChange={(event) => handleFieldChange("items", "file", event.target.files[0])}
                            required
                            id="import-button"
                            inputProps={{
                              accept: ".xml, application/xml, text/xml",
                            }}
                            type="file"
                          />
                        </Grid>
                        <Grid item>
                          <ConstantBasedPicker
                            module="tools"
                            label="strategyPicker"
                            onChange={(value) => handleFieldChange("items", "strategy", value)}
                            required
                            constants={MEDICAL_ITEMS_STRATEGIES}
                            withNull
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            label={formatMessage("dryRunLabel")}
                            control={
                              <Checkbox
                                checked={forms.items?.dryRun}
                                onChange={(e) => handleFieldChange("items", "dryRun", e.target.checked)}
                              />
                            }
                          />
                        </Grid>
                        <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => openPopup(e, 'items')}
                          disabled={!(forms.items?.file && forms.items?.strategy)}
                        >
                          {formatMessage("uploadBtn")}
                        </Button>
                        {popupState?.open && popupState?.openItems && (
                        <Dialog open onClose={onPopupClose} fullWidth maxWidth="sm">
                            <DialogTitle>{formatMessage("UploadDialog.confirmItems")}</DialogTitle>
                            <DialogActions>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => onSubmit(forms.items, "items")}
                              disabled={!(forms.items?.file && forms.items?.strategy)}
                            >
                              {formatMessage("uploadBtn")}
                            </Button>
                            <Button onClick={onPopupClose} variant="contained">
                              {formatMessage("cancelBtn")}
                            </Button>
                            </DialogActions>
                          </Dialog>)}
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Block>
            </Grid>
          )}
          {hasRights(RIGHT_REGISTERS_SERVICES) && (
            <Grid item xs={4}>
              <Block title={formatMessage("servicesBlockTitle")}>
                <Grid container spacing={2} direction="column">
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={onRegisterDownload("services")}>
                      {formatMessage("downloadBtn")}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Divider fullWidth />
                  </Grid>
                </Grid>
              </Block>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default RegistersPage;
