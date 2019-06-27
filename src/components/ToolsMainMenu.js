import React, { Component } from "react";
import { injectIntl } from 'react-intl';
import { AccountBalance, Autorenew, Ballot, Build, EmailOutlined, Feedback, ImportExport, SaveAlt, Settings } from "@material-ui/icons";
import { formatMessage, MainMenuContribution } from "@openimis/fe-core";

class ToolsMainMenu extends Component {
  render() {
    return (
      <MainMenuContribution
        {...this.props}
        header={formatMessage(this.props.intl, "tools", "mainMenu")}
        icon={<Settings />}
        entries={[
          { text: formatMessage(this.props.intl, "tools", "menu.registers"), icon: <ImportExport />, route: "/tools/registers" },
          { text: formatMessage(this.props.intl, "tools", "menu.renewals"), icon: <Autorenew />, route: "/tools/policyRenewals" },
          { text: formatMessage(this.props.intl, "tools", "menu.feedbacks"), icon: <Feedback />, route: "/tools/feedbackPrompts" },
          { text: formatMessage(this.props.intl, "tools", "menu.extracts"), icon: <SaveAlt />, route: "/tools/extracts" },
          { text: formatMessage(this.props.intl, "tools", "menu.reports"), icon: <Ballot />, route: "/tools/reports" },
          { text: formatMessage(this.props.intl, "tools", "menu.utilities"), icon: <Build />, route: "/tools/utilities" },
          { text: formatMessage(this.props.intl, "tools", "menu.funding"), icon: <AccountBalance />, route: "/tools/funding" },
          { text: formatMessage(this.props.intl, "tools", "menu.emails"), icon: <EmailOutlined />, route: "/tools/emailSettings" }
        ]}
      />
    );
  }
}
export default injectIntl(ToolsMainMenu);
