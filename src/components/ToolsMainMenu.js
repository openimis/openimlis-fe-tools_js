import React, { Component } from "react";
import { AccountBalance, Autorenew, Ballot, Build, EmailOutlined, Feedback, ImportExport, SaveAlt, Settings } from "@material-ui/icons";
import { MainMenuContribution } from "@openimis/fe-core";

class ToolsMainMenu extends Component {
  render() {
    return (
      <MainMenuContribution
        {...this.props}
        header="Tools"
        icon={<Settings/>}
        entries={[
          { text: "Registers", icon: <ImportExport />, route: "/tools/registers" },
          { text: "Policy Renewals", icon: <Autorenew />, route: "/tools/policyRenewals" },
          { text: "Feedback Prompts", icon: <Feedback />, route: "/tools/feedbackPrompts" },
          { text: "Extracts", icon: <SaveAlt />, route: "/tools/extracts" },
          { text: "Reports", icon: <Ballot />, route: "/tools/reports" },
          { text: "Utilities", icon: <Build />, route: "/tools/utilities" },
          { text: "Funding", icon: <AccountBalance />, route: "/tools/funding" },
          { text: "Emails Settings", icon: <EmailOutlined />, route: "/tools/emailSettings" }                
        ]}
      />
    );
  }
}
export { ToolsMainMenu };
