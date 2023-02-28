import React, { useCallback, useState } from "react";
import { useReportsQuery } from "../hooks";
import { useSelector } from "react-redux";
import { Searcher, useTranslations, useModulesManager } from "@openimis/fe-core";
import GenerateReportPicker from "./GenerateReportPicker";
import { Box, Button } from "@material-ui/core";
import ReportDefinitionEditorDialog from "./ReportDefinitionEditorDialog";
import { RIGHT_REPORTS } from "../constants";

const HEADERS = ["tools.report.description", "tools.report.module", "tools.report.name", ""];

const ReportSearcher = () => {
  const modulesManager = useModulesManager();
  const { formatMessageWithValues, formatMessage } = useTranslations("tools", modulesManager);
  const rights = useSelector((state) => state.core?.user?.i_user?.rights ?? []);
  const filteredRights = RIGHT_REPORTS.filter(value => rights.includes(value));
  const { data, isLoading, error, refetch } = useReportsQuery({ rights: filteredRights });
  const [editedReport, setEditedReport] = useState();
  const itemFormatters = useCallback(
    () => [
      (r) => r.description,
      (r) => r.module,
      (r) => r.name,
      (r) => (
        <Box display="flex" justifyContent={"flex-end"} gridGap={12}>
          <Button onClick={() => setEditedReport(r)} size="small">
            {formatMessage("ReportSearcher.editBtn")}
          </Button>
          <GenerateReportPicker name={r.name} />
        </Box>
      ),
    ],
    []
  );

  return (
    <>
      <Searcher
        module="report"
        tableTitle={formatMessageWithValues("ReportSearcher.tableTitle", { count: data?.reports?.length })}
        items={data?.reports ?? []}
        fetchingItems={isLoading}
        errorItems={error}
        fetch={() => refetch()}
        itemsPageInfo={{ totalCount: data?.reports?.length ?? 0 }}
        headers={() => HEADERS}
        itemFormatters={itemFormatters}
        withPagination={false}
      />
      {editedReport && <ReportDefinitionEditorDialog name={editedReport.name} onClose={() => setEditedReport(null)} />}
    </>
  );
};

export default ReportSearcher;
