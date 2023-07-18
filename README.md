# openIMIS Frontend Claim reference module
This repository holds the files of the openIMIS Frontend Claim reference module.
It is dedicated to be deployed as a module of [openimis-fe_js](https://github.com/openimis/openimis-fe_js).

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/openimis/openimis-fe-tools_js.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/openimis/openimis-fe-tools_js/alerts/)
## Main Menu Contributions
* **Tools** (`tools.mainMenu` contribution key)

  **Registers** (`tools.menu.registers` translation key), pointing to `/Registers.aspx` legacy openIMIS (via proxy page). Displayed only if user has one the `[131001,131002,131003,131004,131005,131006,131007,131008,131009,131010]` rights.

  **Policy Renewals** (`tools.menu.renewals` translation key), pointing to `/PolicyRenewal.aspx` legacy openIMIS (via proxy page). Displayed only if user has the  right `101205`.

  **Feedback Prompts** (`tools.menu.feedbacks` translation key), pointing to `/FeedbackPrompt.aspx` legacy openIMIS (via proxy page). Displayed only if user has one the right `111008`.

  **Extracts** (`tools.menu.extracts` translation key), pointing to `/IMISExtracts.aspx` legacy openIMIS (via proxy page). Displayed only if user has one the `[131101,131102,131103,131104,131105,131106]` rights.

  **Reports** (`tools.menu.reports` translation key), pointing to `/Reports.aspx` legacy openIMIS (via proxy page). Displayed only if user has one the `[131201,131202,131203,131204,131205,131206,131207,131208,131209,131210,131211,131212,131213,131214,131215,131216,131217,131218,131219,131220,131221,131222,131223]` rights.

  **Utilities** (`tools.menu.utilities` translation key), pointing to `/Utilities.aspx` legacy openIMIS (via proxy page). Displayed only if user has one the `[131301,131302,131303,131304]` rights.

  **Funding** (`tools.menu.funding` translation key), pointing to `/ChangePassword.aspx` legacy openIMIS (via proxy page). Displayed only if user has one the right `131401`.

  **Email Settings** (`tools.menu.emails` translation key), pointing to `/EmailSettings.aspx` legacy openIMIS (via proxy page). Displayed only if user has one the right `131304`.

## Other Contributions
* `core.Router`, registering `tools/registers`, `tools/policyRenewals`, `tools/feedbackPrompts`, `tools/extracts`, `tools/reports`, `tools/utilities`, `tools/funding` and `tools/emailSettings` routes in openIMIS client-side router

## Available Contribution Points
None

## Published Components
None

## Dispatched Redux Actions
None

## Other Modules Listened Redux Actions
None

## Other Modules Redux State Bindings
* `state.core.user`, to access user info (rights,...)

## Configurations Options
None
