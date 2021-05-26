import React, { useEffect } from "react";
import ArrowPress from "../sounds/gameboy_arrowkey.mp3";
import Restart from "../sounds/gameboy_restart.mp3";
import Start from "../sounds/gameboy_start.mp3";

import "../css/GameBoy.css";

function GameBoy() {
	var move = new Audio(ArrowPress);
	var restart = new Audio(Restart);
	var start = new Audio(Start);

	const handleKeyDown = (event) => {
		if (event.key === "ArrowUp") {
			move.load();
			move.play();
			document.getElementById("uparrow").className =
				"gameboy__uparrow1__active";
		} else if (event.key === "ArrowRight") {
			move.load();
			move.play();
			document.getElementById("rightarrow").className =
				"gameboy__uparrow1__active";
		} else if (event.key === "ArrowDown") {
			move.load();
			move.play();
			document.getElementById("downarrow").className =
				"gameboy__uparrow1__active";
		} else if (event.key === "ArrowLeft") {
			move.load();
			move.play();
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

	const handleButtonPress = (e) => {
		move.load();
		move.play();
	};

	const handleStartButtonPress = (e) => {
		start.play();
	};
	const handleRestartButtonPress = (e) => {
		restart.play();
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
										<button
											onMouseDown={handleStartButtonPress}
											className="gameboy__start"
										></button>
										<div className="gameboy__start__borderwrapper">
											<div className="gameboy__start__label">Start</div>
										</div>
									</div>
									<div className="gameboy__start__wrapper">
										<button
											onMouseDown={handleRestartButtonPress}
											className="gameboy__restart"
										></button>
										<div className="gameboy__restart__borderwrapper">
											<div className="gameboy__restart__label">Restart</div>
										</div>
									</div>
								</div>
							</div>
							<div className="gameboy__lowerhalf__left__bottom">
								<div className="gameboy__pause__wrapper">
									<button
										onMouseDown={handleButtonPress}
										className="gameboy__pause"
									></button>
									<div className="gameboy__pause__borderwrapper">
										<div className="gameboy__pause__label">Pause</div>
									</div>
								</div>
							</div>
						</div>

						<div className="gameboy__lowerhalf__right">
							<div className="gameboy__controls__wrapper">
								<div className="gameboy__controls__row1">
									<button
										id="uparrow"
										onMouseDown={handleButtonPress}
										className="gameboy__uparrow1"
									></button>
								</div>
								<div className="gameboy__controls__row2">
									<button
										id="leftarrow"
										onMouseDown={handleButtonPress}
										className="gameboy__uparrow1"
									></button>
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
										onMouseDown={handleButtonPress}
										className="gameboy__uparrow1"
									></button>
								</div>
								<div className="gameboy__controls__row3">
									<button
										id="downarrow"
										onMouseDown={handleButtonPress}
										className="gameboy__uparrow1"
									></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameBoy;
