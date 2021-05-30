import React from "react";
import "../css/Bullets.css";
function Bullets({ bulletState, row }) {
	return (
		<div className={`bullets__wrapper__row${row}`}>
			{bulletState.length === 15
				? bulletState.map((height, index) => {
						if (index === 0) {
							return (
								<div
									style={{ height: `${height}%` }}
									className="bullet__left"
								></div>
							);
						} else if (index === bulletState.length - 1) {
							return (
								<div
									style={{ height: `${height}%` }}
									className="bullet__right"
								></div>
							);
						} else {
							return (
								<div
									style={{ height: `${height}%` }}
									className="bullet__middle"
								></div>
							);
						}
				  })
				: null}
		</div>
	);
}

export default Bullets;
