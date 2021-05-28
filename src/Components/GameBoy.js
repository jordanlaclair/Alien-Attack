import React, { useEffect, useReducer } from "react";
import ArrowPress from "../sounds/gameboy_arrowkey.mp3";
import Restart from "../sounds/gameboy_restart.mp3";
import Start from "../sounds/gameboy_start.mp3";
import UFO from "../images/gameboy__ufo.png";
import $ from "jquery";

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
			dispatch({ type: "restart" });

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
		dispatch({ type: "restart" });
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
			case "restart":
				if (state.start) {
					return {
						...state,
						restart: true,
						time: "",
						minutes: 0,
						seconds: 0,
						score: 0,
						totalSeconds: 0,
					};
				} else {
					return { ...state };
				}

			case "update":
				return {
					...state,
					[action.field]: action.value,
				};
			case "updateTotalSeconds":
				return {
					...state,
					totalSeconds: state.totalSeconds + 1,
				};
			case "updateSeconds":
				return {
					...state,
					seconds: pad(state.totalSeconds % 60),
				};
			case "updateMinutes":
				return {
					...state,
					minutes: pad(parseInt(state.totalSeconds / 60)),
				};
			case "updateSpaceShipsLengths":
				return {
					...state,
					spaceShipsLengths: [...state.spaceShipsLengths, action.value],
				};
			case "setNewSpaceShipsLengths":
				return {
					...state,
					spaceShipsLengths: [action.value],
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
		showTimer: false,
		showTime: false,
		totalSeconds: 0,
		spaceShipsLengths: [],
	};

	const [state, dispatch] = useReducer(loginReducer, initialState);

	function updateTimer() {
		dispatch({
			type: "updateTotalSeconds",
		});

		dispatch({
			type: "updateSeconds",
		});

		dispatch({
			type: "updateMinutes",
		});
	}

	function updateTime() {
		dispatch({
			type: "update",
			field: "time",
			value: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		});
	}

	function pad(val) {
		var valString = val + "";
		if (valString.length < 2) {
			return "0" + valString;
		} else {
			return parseInt(valString);
		}
	}

	function getHours(time) {
		return time.slice(0, 2);
	}

	function getMinutes(time) {
		return time.slice(3, 5);
	}

	function getAMPM(time) {
		return time.slice(time.length - 2);
	}

	function getRandomArbitrary(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	function renderRandom() {
		for (let i = 0; i < 10; i++) {
			dispatch({
				type: "updateSpaceShipsLengths",
				value: getRandomArbitrary(10, 30),
			});
		}
	}

	function shuffle(array) {
		var newArray = [...array];
		var currentIndex = newArray.length,
			temporaryValue,
			randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			//swaps
			temporaryValue = newArray[currentIndex];
			newArray[currentIndex] = newArray[randomIndex];
			newArray[randomIndex] = temporaryValue;
		}

		dispatch({ type: "setNewSpaceShipsLengths", value: newArray });
	}

	function randomMargin() {
		$(".bullet__left").each(function () {
			randomizeLeftBullet(this);
		});
		$(".bullet__right").each(function () {
			randomizeRightBullet(this);
		});
	}

	function randomizeLeftBullet(el) {
		var randomnumber1 = Math.floor(Math.random() * 11);
		console.log(randomnumber1);
		var randomnumber2 = Math.floor(Math.random() * 11);
		console.log(randomnumber2);
		$(el).css({
			"margin-left": randomnumber2 + "px",
		});
	}
	function randomizeRightBullet(el) {
		var randomnumber1 = Math.floor(Math.random() * 11);
		console.log(randomnumber1);
		var randomnumber2 = Math.floor(Math.random() * 11);
		console.log(randomnumber2);
		$(el).css({
			"margin-right": randomnumber2 + "px",
		});
	}

	useEffect(() => {
		let interval;
		if (state.start) {
			interval = setInterval(() => {
				updateTimer();
				updateTime();
				randomMargin();
			}, 1000);
			renderRandom();
		}

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
			clearInterval(interval);
		};
	}, [state.start]);

	useEffect(() => {
		console.log(state.spaceShipsLengths);
	}, [state.spaceShipsLengths]);

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
									{state.start ? (
										<>
											<div className="gameboy__display__top__start">
												{state.spaceShipsLengths.length == 10 ? (
													<>
														<div
															style={{ height: "10%" }}
															className="bullet__left"
														></div>

														<div className="bullet__right"></div>
													</>
												) : null}
											</div>
											<div className="gameboy__display__bottom__start">
												{state.showTimer ? (
													<div className="gameboy__timer">
														<div className="timer__minutes">
															{state.minutes}
														</div>
														<div className="timer__colon">:</div>
														<div className="timer__seconds">
															{state.seconds}
														</div>
													</div>
												) : null}
												{state.showTimer ? (
													<div className="gameboy__time">
														<div className="time__hours">
															{getHours(state.time)}
														</div>
														<div className="timer__colon">:</div>
														<div className="time__minutes">
															{getMinutes(state.time) +
																" " +
																getAMPM(state.time)}
														</div>
													</div>
												) : null}
											</div>
										</>
									) : (
										<div className="gameboy__display__inner">
											<div className="gameboy__display__top__menu">
												<div className="gameboy__title">Alien Attack</div>
												<div className="gameboy__UFO__wrapper">
													<img className="ufo" src={UFO} alt="ufo" />
												</div>
												<div className="start__wrapper">Push Start</div>
											</div>
											<div className="mountain__wrapper">
												<div className="mountain1"></div>
												<div className="mountain2"></div>
												<div className="mountain3"></div>
												<div className="mountain4"></div>
												<div className="mountain5"></div>
												<div className="mountain6"></div>
												<div className="mountain7"></div>
												<div className="mountain8"></div>
												<div className="mountain9"></div>
												<div className="mountain10"></div>
												<div className="mountain11"></div>
												<div className="mountain12"></div>
												<div className="mountain13"></div>
												<div className="mountain14"></div>
												<div className="mountain15"></div>
												<div className="mountain16"></div>
												<div className="mountain17"></div>
												<div className="mountain18"></div>
												<div className="mountain19"></div>
												<div className="mountain20"></div>
												<div className="mountain21"></div>
												<div className="mountain22"></div>
												<div className="mountain23"></div>
												<div className="mountain24"></div>
												<div className="mountain25"></div>
												<div className="mountain26"></div>
												<div className="mountain27"></div>
												<div className="mountain28"></div>
												<div className="mountain29"></div>
												<div className="mountain30"></div>
												<div className="mountain31"></div>
												<div className="mountain32"></div>
												<div className="mountain33"></div>
												<div className="mountain34"></div>
												<div className="mountain35"></div>
												<div className="mountain36"></div>
												<div className="mountain37"></div>
												<div className="mountain38"></div>
												<div className="mountain39"></div>
												<div className="mountain40"></div>
												<div className="mountain41"></div>
												<div className="mountain42"></div>
												<div className="mountain43"></div>
												<div className="mountain44"></div>
												<div className="mountain45"></div>
												<div className="mountain46"></div>
											</div>

											<div className="gameboy__display__bottom__line1"></div>
											<div className="gameboy__display__bottom__line2"></div>

											<div className="gameboy__display__bottom__line3"></div>

											<div className="gameboy__display__bottom__menu">
												<div className="year">1993 </div>
												<div className="year1">&copy;</div>
											</div>
										</div>
									)}
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
