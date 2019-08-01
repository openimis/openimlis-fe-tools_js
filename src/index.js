import ToolsMainMenu from "./components/ToolsMainMenu";
import { RegistersPage } from "./components/RegistersPage";
import { PolicyRenewalsPage } from "./components/PolicyRenewalsPage";
import { FeedbackPromptsPage } from "./components/FeedbackPromptsPage";
import { ExtractsPage } from "./components/ExtractsPage";
import { ReportsPage } from "./components/ReportsPage";
import { UtilitiesPage } from "./components/UtilitiesPage";
import { FundingPage } from "./components/FundingPage";
import { EmailSettingsPage } from "./components/EmailSettingsPage";
import messages_en from "./translations/en.json";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
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

export const ToolsModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}