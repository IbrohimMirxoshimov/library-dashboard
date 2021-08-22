import Icons from "configs/Icons";
import React, { Component } from "react";

export class Icon extends Component {
	render() {
		const { type, className } = this.props;
		return <>{React.createElement(Icons[type], { className: className })}</>;
	}
}

export default Icon;
