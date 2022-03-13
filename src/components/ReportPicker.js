import React, { useMemo, useState } from "react";
import { Autocomplete, useModulesManager, useTranslations } from "@openimis/fe-core";
import { useReportsQuery } from "../hooks";

const ReportPicker = (props) => {
  const { onChange, readOnly = false, required = false, withLabel = true, value, label, placeholder } = props;
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("tools", modulesManager);
  const [searchString, setSearchString] = useState("");
  const { isLoading, data } = useReportsQuery();

  const options = useMemo(() => {
    if (searchString) {
      return data?.reports.filter((x) => x.name.toLowerCase().includes(searchString.toLowerCase()));
    }
    return data?.reports;
  }, [searchString, data]);

  return (
    <Autocomplete
      required={required}
      placeholder={placeholder}
      label={label ?? formatMessage("ReportPicker.label")}
      withLabel={withLabel}
      readOnly={readOnly}
      options={options ?? []}
      isLoading={isLoading}
      value={value}
      getOptionLabel={(o) => o?.description}
      onChange={onChange}
      onInputChange={setSearchString}
    />
  );
};

export default ReportPicker;
