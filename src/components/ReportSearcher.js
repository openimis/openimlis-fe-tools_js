import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Button, Tooltip } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import EditIcon from '@material-ui/icons/Edit';

import {
  Searcher,
  useTranslations,
  useModulesManager,
} from "@openimis/fe-core";
import { RIGHT_REPORT_EDIT } from "../constants";
import { useReportsQuery } from "../hooks";
import GenerateReportPicker from "./GenerateReportPicker";
import ReportDefinitionEditorDialog from "./ReportDefinitionEditorDialog";

const ReportSearcher = () => {
  const modulesManager = useModulesManager();
  const { formatMessageWithValues, formatMessage } = useTranslations(
    "tools",
    modulesManager
  );
  const { data, isLoading, error, refetch } = useReportsQuery();
  const [editedReport, setEditedReport] = useState();
  const rights = useSelector((state) => state.core?.user?.i_user?.rights ?? []);

  const reportsByModule = data?.reports?.reduce((acc, report) => {
    const { module } = report;
    if (!acc[module]) {
      acc[module] = [];
    }
    acc[module].push(report);
    return acc;
  }, {});

  const formattedReports =
    reportsByModule &&
    Object.keys(reportsByModule).reduce((acc, moduleName) => {
      acc.push({ isCategory: true, category: moduleName });
      reportsByModule[moduleName].forEach((report) => acc.push(report));
      return acc;
    }, []);

  const formatCategory = (report) => {
    const capitalizedCategory =
      report.category.charAt(0).toUpperCase() + report.category.slice(1);
    return (
      <Box display="flex" justifyContent="flex-start">
        <strong>
          <i>
            {formatMessageWithValues("ReportSearcher.moduleName", {
              module: capitalizedCategory,
            })}
          </i>
        </strong>
      </Box>
    );
  };

  const formatReport = (report) => (
    <Box display="flex" justifyContent="flex-start" marginLeft="18px">
      {report.description}
    </Box>
  );

  const formatActions = (report) =>
    !report.category && (
      <Box display="flex" justifyContent={"flex-end"} gridGap={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title={report.name}>
            <HelpOutlineIcon fontSize="small" />
          </Tooltip>
        </div>
        {rights.includes(RIGHT_REPORT_EDIT) && (
          <Button onClick={() => setEditedReport(report)} size="small" startIcon={<EditIcon />}>
            {formatMessage("ReportSearcher.editBtn")}
          </Button>
        )}
        <GenerateReportPicker name={report.name} />
      </Box>
    );

  const itemFormatters = useCallback(
    () => [
      (report) =>
        report.isCategory ? formatCategory(report) : formatReport(report),
      formatActions,
    ],
    []
  );

  return (
    <>
      <Searcher
        module="report"
        tableTitle={formatMessageWithValues("ReportSearcher.tableTitle", {
          count: data?.reports?.length,
        })}
        items={formattedReports ?? []}
        fetchingItems={isLoading}
        errorItems={error}
        fetch={() => refetch()}
        itemsPageInfo={{ totalCount: data?.reports?.length ?? 0 }}
        headers={() => []}
        itemFormatters={itemFormatters}
        withPagination={false}
      />
      {editedReport && (
        <ReportDefinitionEditorDialog
          name={editedReport.name}
          onClose={() => setEditedReport(null)}
        />
      )}
    </>
  );
};

export default ReportSearcher;
