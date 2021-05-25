import React, { useEffect } from "react";
import ArrowPress from "../sounds/arrowkey.mp3";
import "../css/GameBoy1.css";
function GameBoy1() {
	const handleKeyDown = (event) => {
		if (event.key === "ArrowUp") {
			document.getElementById("uparrow").className =
				"gameboy__uparrow1__active";
		} else if (event.key === "ArrowRight") {
			document.getElementById("rightarrow").className =
				"gameboy__uparrow1__active";
		} else if (event.key === "ArrowDown") {
			document.getElementById("downarrow").className =
				"gameboy__uparrow1__active";
		} else if (event.key === "ArrowLeft") {
			document.getElementById("leftarrow").className =
				"gameboy__uparrow1__active";
		}
	};
	const handleKeyUp = (event) => {
		if (event.key === "ArrowUp") {
			document.getElementById("uparrow").className = "gameboy__uparrow1";
		} else if (event.key === "ArrowRight") {
			document.getElementById("rightarrow").className = "gameboy__uparrow1";
		} else if (event.key === "ArrowDown") {
			document.getElementById("downarrow").className = "gameboy__uparrow1";
		} else if (event.key === "ArrowLeft") {
			document.getElementById("leftarrow").className = "gameboy__uparrow1";
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return (
		<div>
			<div className="gameboy__outer__shell">
				<div className="gameboy__inner__shell">
					<div className="gameboy__upperhalf">
						<div className="gameboy__display__wrapper">
							&nbsp;
							<div class="gameboy__display__circle">&nbsp;</div>
							<div className="gameboy__display__borderwrapper">
								<div className="gameboy__display">&nbsp;</div>
							</div>
						</div>
					</div>
					<div className="gameboy__lowerhalf">
						<div className="gameboy__lowerhalf__left">
							<div className="gameboy__lowerhalf__left__top">
								<div className="gameboy__buttons">
									<div className="gameboy__start__wrapper">
										<button className="gameboy__start"></button>
										<div className="gameboy__start__borderwrapper">
											<div className="gameboy__start__label">Start</div>
										</div>
									</div>
									<div className="gameboy__start__wrapper">
										<button className="gameboy__restart"></button>
										<div className="gameboy__restart__borderwrapper">
											<div className="gameboy__restart__label">Restart</div>
										</div>
									</div>
								</div>
							</div>
							<div className="gameboy__lowerhalf__left__bottom">
								<div className="gameboy__pause__wrapper">
									<button className="gameboy__pause"></button>
									<div className="gameboy__pause__borderwrapper">
										<div className="gameboy__pause__label">Pause</div>
									</div>
								</div>
							</div>
						</div>

						<div className="gameboy__lowerhalf__right">
							<div className="gameboy__controls__wrapper">
								<div className="gameboy__controls__row1">
									<button id="uparrow" className="gameboy__uparrow1"></button>
								</div>
								<div className="gameboy__controls__row2">
									<button id="leftarrow" className="gameboy__uparrow1"></button>
									<div className="gameboy__arrows__wrapper">
										<div className="gameboy__arrows__row1">
											<button className="gameboy__arrow__up"></button>
										</div>
										<div className="gameboy__arrows__row2">
											<button className="gameboy__arrow__left"></button>
											&nbsp;
											<button className="gameboy__arrow__right"></button>
										</div>
										<div className="gameboy__arrows__row3">
											<button className="gameboy__arrow__down"></button>
										</div>
									</div>
									<button
										id="rightarrow"
										className="gameboy__uparrow1"
									></button>
								</div>
								<div className="gameboy__controls__row3">
									<button id="downarrow" className="gameboy__uparrow1"></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameBoy1;
