import React, { Component } from "react";
import { ProxyPage } from "@openimis/fe-core";


class UtilitiesPage extends Component {
    render() {
        return <ProxyPage url="/Utilities.aspx" />
    }
}

export { UtilitiesPage };