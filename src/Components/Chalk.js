import React from "react";
import HeartChalk from "../images/chalk__heart.png";
import ScribbleChalk from "../images/chalk__scribble.png";
import CrossChalk from "../images/chalk__cross.png";
import CrossChalk1 from "../images/chalk__cross1.png";
import MathChalk from "../images/chalk__math.png";
import EquationsChalk from "../images/chalk__equations.png";

import "../css/Chalk.css";
function Chalk() {
	return (
		<div className="chalk__wrapper">
			<div className="chalk__images__wrapper">
				<img
					draggable="false"
					className="chalk__heart"
					src={HeartChalk}
					alt="chalk of heart"
				/>
				<img
					draggable="false"
					className="chalk__scribble1"
					src={ScribbleChalk}
					alt="chalk of scribble"
				/>
				<img
					draggable="false"
					className="chalk__scribble2"
					src={ScribbleChalk}
					alt="chalk of scribble"
				/>
				<img
					draggable="false"
					className="chalk__cross"
					src={CrossChalk}
					alt="chalk of cross"
				/>
				<img
					draggable="false"
					className="chalk__cross1"
					src={CrossChalk1}
					alt="chalk of cross"
				/>
				<img
					draggable="false"
					className="chalk__math"
					src={MathChalk}
					alt="chalk of math"
				/>

				<img
					draggable="false"
					className="chalk__equations"
					src={EquationsChalk}
					alt="chalk of equations"
				/>
			</div>
			<div className="chalk__holder"></div>
		</div>
	);
}

export default Chalk;
