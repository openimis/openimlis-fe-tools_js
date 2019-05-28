import { ToolsMainMenu } from "./components/ToolsMainMenu";

const ToolsModule = {
  "core.Router": [
    { path: "tools/registers", component: RegistersPage },
    { path: "tools/policyRenewals", component: PolicyRenewalsPage },
    { path: "tools/feedbackPrompts", component: FeedbackPromptsPage },
    { path: "tools/extracts", component: ExtractsPage },
    { path: "tools/reports", component: ReportsPage },
    { path: "tools/utilities", component: UtilitiesPage },
    { path: "tools/funding", component: FundingPage },
    { path: "tools/emailSettings", component: EmailSettingsPage }
  ],
  "core.MainMenu": [ToolsMainMenu]
}

export { ToolsModule };
