import React, { useMemo, useState } from "react";
import { Autocomplete, useModulesManager, useTranslations } from "@openimis/fe-core";
import { useReportsQuery } from "../hooks";
import { RIGHT_REPORTS } from "../constants";

const ReportPicker = (props) => {
  const { onChange, readOnly = false, required = false, withLabel = true, value, label, placeholder } = props;
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("tools", modulesManager);
  const [searchString, setSearchString] = useState("");
  const rights = useSelector((state) => state.core?.user?.i_user?.rights ?? []);
  const filteredRights = RIGHT_REPORTS.filter(value => rights.includes(value));
  const { isLoading, data } = useReportsQuery( {rights: filteredRights} );
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
