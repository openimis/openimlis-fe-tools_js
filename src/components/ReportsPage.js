import React, { Component } from "react";
import { ProxyPage } from "@openimis/fe-core";


class ReportsPage extends Component {
    render() {
        return <ProxyPage url="/Reports.aspx" />
    }
}

export { ReportsPage };