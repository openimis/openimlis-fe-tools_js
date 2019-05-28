import React, { Component } from "react";
import { ProxyPage } from "@openimis/fe-core";


class FeedbackPromptsPage extends Component {
    render() {
        return <ProxyPage url="/FeedbackPrompt.aspx" />
    }
}

export { FeedbackPromptsPage };