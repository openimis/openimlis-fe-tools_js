import React, { Component } from "react";
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { AccountBalance, Autorenew, Ballot, Build, EmailOutlined, Feedback, ImportExport, SaveAlt, Settings } from "@material-ui/icons";
import { formatMessage, MainMenuContribution } from "@openimis/fe-core";
import {
  RIGHT_REGISTERS,
  RIGHT_EXTRACTS,
  RIGHT_REPORTS,
  RIGHT_UTILITIES,
  RIGHT_FUNDING,
  RIGHT_POLICY_RENEWALS,
  RIGHT_FEEDBACK_PROMPT,
  RIGHT_EMAILSETTING,
} from "../constants";

class ToolsMainMenu extends Component {
  render() {
    const { rights } = this.props;
    let entries = [];
    if (rights.includes(RIGHT_REGISTERS)) {
      entries.push(
        { text: formatMessage(this.props.intl, "tools", "menu.registers"), icon: <ImportExport />, route: "/tools/registers" }
      )
    }
    if (rights.includes(RIGHT_POLICY_RENEWALS)) {
      entries.push(
        { text: formatMessage(this.props.intl, "tools", "menu.renewals"), icon: <Autorenew />, route: "/tools/policyRenewals" }
      )
    }
    if (rights.includes(RIGHT_FEEDBACK_PROMPT)) {
      entries.push(
        { text: formatMessage(this.props.intl, "tools", "menu.feedbacks"), icon: <Feedback />, route: "/tools/feedbackPrompts" },
      )
    }
    if (rights.includes(RIGHT_EXTRACTS)) {
      entries.push(
        { text: formatMessage(this.props.intl, "tools", "menu.extracts"), icon: <SaveAlt />, route: "/tools/extracts" },
      )
    }
    if (rights.includes(RIGHT_REPORTS)) {
      entries.push(
        { text: formatMessage(this.props.intl, "tools", "menu.reports"), icon: <Ballot />, route: "/tools/reports" },
      )
    }
    if (rights.includes(RIGHT_UTILITIES)) {
      entries.push(
        { text: formatMessage(this.props.intl, "tools", "menu.utilities"), icon: <Build />, route: "/tools/utilities" },
      )
    }
    if (rights.includes(RIGHT_FUNDING)) {
      entries.push(
        { text: formatMessage(this.props.intl, "tools", "menu.funding"), icon: <AccountBalance />, route: "/tools/funding" },
      )
    }
    if (rights.includes(RIGHT_EMAILSETTING)) {
      entries.push(
        { text: formatMessage(this.props.intl, "tools", "menu.emails"), icon: <EmailOutlined />, route: "/tools/emailSettings" }
      )
    }
    if (!entries.length) return null;
    return (
      <MainMenuContribution
        {...this.props}
        header={formatMessage(this.props.intl, "tools", "mainMenu")}
        icon={<Settings />}
        entries={entries}
      />
    );
  }
}

const mapStateToProps = state => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
})

export default injectIntl(connect(mapStateToProps)(ToolsMainMenu));
