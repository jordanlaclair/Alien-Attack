import React from "react";
import HeartChalk from "../images/chalk__heart.png";
import ScribbleChalk from "../images/chalk__scribble.png";
import CrossChalk from "../images/chalk__cross.png";
import CrossChalk1 from "../images/chalk__cross1.png";
import MathChalk from "../images/chalk__math.png";
import EquationsChalk from "../images/chalk__equations.png";
import CLetterChalk from "../images/chalk__c.png";

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
					className="chalk__letter__c"
					src={CLetterChalk}
					alt="chalk of letter c"
				/>
				<img
					draggable="false"
					className="chalk__equations"
					src={EquationsChalk}
					alt="chalk of equations"
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
				<div className="chalk__hate__school__outer__wrapper">
					<div className="chalk__hate__school__wrapper1">
						<div className="rotate1">f</div>
						<div className="rotate2">r</div>
						<div className="rotate3">i</div>
						<div className="rotate4">c</div>
						<div className="rotate5">k</div>
					</div>
					<div className="chalk__hate__school__wrapper2">
						<div className="rotate1">s</div>
						<div className="rotate2">c</div>
						<div className="rotate3">h</div>
						<div className="rotate4">o</div>
						<div className="rotate5">o</div>
						<div className="rotate6">l</div>
					</div>
				</div>
			</div>
			<div className="chalk__holder"></div>
		</div>
	);
}

export default Chalk;
