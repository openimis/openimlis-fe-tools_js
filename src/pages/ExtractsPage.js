import React, { useState } from "react";

import {
  useModulesManager,
  useTranslations,
  PublishedComponent,
  baseApiUrl,
  apiHeaders,
  ProgressOrError,
  ProxyPage,
} from "@openimis/fe-core";
import { useSelector } from "react-redux";

import { Box, Grid, Paper, Button, Input, Dialog, DialogContent, DialogTitle, DialogActions } from "@material-ui/core";
import Block from "../components/Block";
import { RIGHT_EXTRACTS } from "../constants";

const EXTRACTS_URL = `${baseApiUrl}/tools/extracts`;

const OfficerDownloadBlock = (props) => {
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("tools.ExtractsPage", modulesManager);
  const [officer, setOfficer] = useState();
  return (
    <Block title={formatMessage("OfficerDownloadBlock.title")}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PublishedComponent
            pubRef="admin.EnrolmentOfficerPicker"
            module="admin"
            value={officer}
            onChange={setOfficer}
          />
        </Grid>
        <Grid item xs={6}>
          <Button disabled={!officer} variant="contained">
            {formatMessage("OfficerDownloadBlock.downloadFeedbacksBtn")}
          </Button>
        </Grid>
        <Grid item xs={6} align="right">
          <Button disabled={!officer} variant="contained">
            {formatMessage("OfficerDownloadBlock.downloadRenewalsBtn")}
          </Button>
        </Grid>
      </Grid>
    </Block>
  );
};

const ResultDialog = ({ open, title, isLoading, children, onClose }) => {
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("tools.ExtractsPage", modulesManager);

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          {formatMessage("ResultDialog.okBtn")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ClaimsUploadBlock = (props) => {
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("tools.ExtractsPage", modulesManager);
  const [files, setFiles] = useState();
  const [request, setRequest] = useState();
  const onSubmit = async () => {
    setRequest({ isLoading: true });
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const f = files.item(i);
      formData.append(f.name, f);
    }
    try {
      const response = await fetch(`${EXTRACTS_URL}/upload_claims`, {
        headers: apiHeaders,
        body: formData,
        method: "POST",
        credentials: "same-origin",
      });
      if (response.status >= 400) {
        throw new Error("Unknown error");
      }
      const payload = await response.json();
      setRequest({ isLoading: false, error: null, payload });
    } catch (exc) {
      console.error(exc);
      setRequest({ isLoading: false, error: exc.message || formatMessage("ClaimsUploadBlock.errorMessage") });
    } finally {
      setFiles(null);
    }
  };

  return (
    <Block title={formatMessage("ClaimsUploadBlock.title")}>
      {request && (
        <ResultDialog
          title={formatMessage("ClaimsUploadBlock.ResultDialog.title")}
          open
          onClose={() => setRequest(undefined)}
        >
          <ProgressOrError isLoading={request.isLoading} error={request.error} />
          {request?.payload?.success && formatMessage("ClaimsUploadBlock.ResultDialog.success")}
        </ResultDialog>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            onChange={(event) => setFiles(event.target.files)}
            required
            multiple
            inputProps={{
              accept: ".xml, application/xml, text/xml",
            }}
            type="file"
          />
        </Grid>
        <Grid item xs={6}>
          <Button disabled={!files || data?.isLoading} variant="contained" onClick={onSubmit}>
            {formatMessage("ClaimsUploadBlock.uploadBtn")}
          </Button>
        </Grid>
      </Grid>
    </Block>
  );
};

const ExtractsPage = (props) => {
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("tools.ExtractsPage", modulesManager);
  const rights = useSelector((state) => state.core?.user?.i_user?.rights ?? []);

  if (!RIGHT_EXTRACTS.every((x) => rights.includes(x))) {
    return null;
  }

  return <ProxyPage url="/IMISExtracts.aspx" />;

  // return (
  //   <>
  //     <Box fullWidth m={2}>
  //       <Grid container spacing={2}>
  //         <Grid item xs={4}>
  //           <Block title={formatMessage("DownloadMasterData.title")}>
  //             <Grid container alignItems="center" justifyContent="center">
  //               <Button variant="contained">{formatMessage("DownloadMasterData.downloadBtn")}</Button>
  //             </Grid>
  //           </Block>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <OfficerDownloadBlock />
  //         </Grid>
  //         <Grid item xs={4}>
  //           <ClaimsUploadBlock />
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   </>
  // );
};

export { ExtractsPage };
