import React from "react";
import HeartChalk from "../images/chalk__heart.png";
import "../css/Chalk.css";
function Chalk() {
	return (
		<div className="chalk__wrapper">
			<div className="chalk__images__wrapper">
				<img
					draggable="false"
					className="chalk__heart"
					src={HeartChalk}
					alt="heart chalk"
				/>
			</div>
			<div className="chalk__holder"></div>
		</div>
	);
}

export default Chalk;
