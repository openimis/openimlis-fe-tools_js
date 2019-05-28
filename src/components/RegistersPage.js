import React, { Component } from "react";
import { ProxyPage } from "@openimis/fe-core";


class RegistersPage extends Component {
    render() {
        return <ProxyPage url="/Registers.aspx" />
    }
}

export { RegistersPage };