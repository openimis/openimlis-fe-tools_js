import React, { Component } from "react";
import { ProxyPage } from "@openimis/fe-core";


class ExtractsPage extends Component {
    render() {
        return <ProxyPage url="/IMISExtracts.aspx" />
    }
}

export { ExtractsPage };