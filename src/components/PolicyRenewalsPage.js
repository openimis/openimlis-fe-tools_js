import React, { Component } from "react";
import { ProxyPage } from "@openimis/fe-core";


class PolicyRenewalsPage extends Component {
    render() {
        return <ProxyPage url="/PolicyRenewal.aspx" />
    }
}

export { PolicyRenewalsPage };