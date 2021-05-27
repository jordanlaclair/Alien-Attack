import React, { useEffect, useReducer } from "react";
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
		} else if (event.key === "s" || event.key === "S") {
			start.play();
			dispatch({ type: "start" });

			document.getElementById("start").className = "gameboy__start__active";
		} else if (event.key === "r" || event.key === "R") {
			restart.play();
			document.getElementById("restart").className = "gameboy__restart__active";
		} else if (event.key === "p" || event.key === "P") {
			move.load();
			move.play();
			document.getElementById("pause").className = "gameboy__pause__active";
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
		} else if (event.key === "S" || event.key === "s") {
			document.getElementById("start").className = "gameboy__start";
		} else if (event.key === "R" || event.key === "r") {
			document.getElementById("restart").className = "gameboy__restart";
		} else if (event.key === "P" || event.key === "p") {
			document.getElementById("pause").className = "gameboy__pause";
		}
	};

	const handleButtonPress = (e) => {
		move.load();
		move.play();
	};

	const handleStartButtonPress = (e) => {
		start.play();
		dispatch({ type: "start" });
	};
	const handleRestartButtonPress = (e) => {
		restart.play();
	};

	function loginReducer(state, action) {
		switch (action.type) {
			case "start":
				return {
					...state,
					start: true,
					menu: false,
					showTimer: true,
					showTime: true,
					time: new Date().toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}),
				};
			case "update":
				return {
					...state,
					[action.field]: action.value,
				};

			default:
				break;
		}
		return state;
	}

	const initialState = {
		start: false,
		restart: false,
		menu: true,
		pause: false,
		time: "",
		minutes: 0,
		seconds: 0,
		score: 0,
		showTime: false,
		showTimer: false,
		totalSeconds: 0,
	};

	const [state, dispatch] = useReducer(loginReducer, initialState);

	function updateTime() {
		dispatch({
			type: "update",
			field: "totalSeconds",
			value: (prevValue) => prevValue + 1,
		});
		dispatch({
			type: "update",
			field: "seconds",
			value: pad(state.totalSeconds % 60),
		});
		dispatch({
			type: "update",
			field: "minutes",
			value: pad(parseInt(state.totalSeconds / 60)),
		});
	}

	function pad(val) {
		var valString = val + "";
		if (valString.length < 2) {
			return "0" + valString;
		} else {
			return valString;
		}
	}

	useEffect(() => {
		let interval = setInterval(() => {
			if (state.start) {
				updateTime();

				dispatch({
					type: "update",
					field: "time",
					value: new Date().toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}),
				});
			}
			/* dispatch({
				type: "start",
				field: "time",
				value: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
			});  */

			/* dispatch({
				type: "start",
				field: "timer",
				value: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
			}); */
			//console.log(date.slice(0, date.length - 2));
		}, 1000);

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		console.log(state);
	}, [state]);
	return (
		<div>
			<div className="gameboy__outer__shell">
				<div className="gameboy__inner__shell">
					<div className="gameboy__upperhalf">
						<div className="gameboy__display__wrapper">
							<div class="gameboy__display__circle">&nbsp;</div>
							<div className="gameboy__display__borderwrapper">
								<div className="gameboy__display">
									&nbsp;
									<div className="gameboy__display__top"></div>
									<div className="gameboy__display__bottom">
										<div className="gameboy__timer">
											<div className="timer__minutes">
												{state.showTimer == true ? state.minutes : null}
											</div>
											<div className="timer__seconds">
												{state.showTimer == true ? state.seconds : null}
											</div>
										</div>
										<div className="gameboy__time">{state.time}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="gameboy__lowerhalf">
						<div className="gameboy__lowerhalf__left">
							<div className="gameboy__lowerhalf__left__top">
								<div className="gameboy__buttons">
									<div className="gameboy__start__wrapper">
										<button
											id="start"
											onMouseDown={handleStartButtonPress}
											className="gameboy__start"
										></button>
										<div className="gameboy__start__borderwrapper">
											<div className="gameboy__start__label">Start</div>
										</div>
									</div>
									<div className="gameboy__start__wrapper">
										<button
											id="restart"
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
										id="pause"
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
