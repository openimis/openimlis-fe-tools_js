import React, { Component } from "react";
import { ProxyPage } from "@openimis/fe-core";


class FundingPage extends Component {
    render() {
        return <ProxyPage url="/AddFunding.aspx" />
    }
}

export { FundingPage };