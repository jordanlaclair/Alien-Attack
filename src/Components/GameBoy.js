import React, { useEffect, useRef, useReducer } from "react";
import Bullets from "../Components/Bullets";
import ArrowPress from "../sounds/gameboy_arrowkey.mp3";
import Restart from "../sounds/gameboy_restart.mp3";
import Start from "../sounds/gameboy_start.mp3";
import UFO from "../images/gameboy__ufo.png";
import ButtonPress from "../sounds/gameboy__buttonclick.mp3";
import $ from "jquery";
import { Fragment } from "react";

import "../css/GameBoy.css";

function GameBoy() {
	var bullet;
	var barrier;
	const buttonClickSoundRef = useRef(new Audio(ButtonPress));
	const muteSoundRef = useRef(new Audio(ButtonPress));
	const startSoundRef = useRef(new Audio(Start));
	const restartSoundRef = useRef(new Audio(Restart));
	const moveSoundRef = useRef(new Audio(ArrowPress));

	const handleKeyDown = (event) => {
		if (event.key === "ArrowUp") {
			moveSoundRef.current.load();
			moveSoundRef.current.play();
			document.getElementById("uparrow").className =
				"gameboy__uparrow1__active";
		} else if (event.key === "ArrowRight") {
			moveSoundRef.current.load();
			moveSoundRef.current.play();
			document.getElementById("rightarrow").className =
				"gameboy__uparrow1__active";
		} else if (event.key === "ArrowDown") {
			moveSoundRef.current.load();
			moveSoundRef.current.play();
			document.getElementById("downarrow").className =
				"gameboy__uparrow1__active";
		} else if (event.key === "ArrowLeft") {
			moveSoundRef.current.load();
			moveSoundRef.current.play();
			document.getElementById("leftarrow").className =
				"gameboy__uparrow1__active";
		} else if (event.key === "s" || event.key === "S") {
			if (!state.startButtonActivated) {
				startSoundRef.current.play();
				dispatch({ type: "start" });
			} else {
				buttonClickSoundRef.current.load();
				buttonClickSoundRef.current.play();
			}

			document.getElementById("start").className = "gameboy__start__active";
		} else if (event.key === "r" || event.key === "R") {
			if (!state.startButtonActivated) {
				buttonClickSoundRef.current.load();
				buttonClickSoundRef.current.play();
			} else {
				restartSoundRef.current.play();
				dispatch({ type: "restart" });
			}

			document.getElementById("restart").className = "gameboy__restart__active";
		} else if (event.key === "p" || event.key === "P") {
			moveSoundRef.current.load();
			moveSoundRef.current.play();
			document.getElementById("pause").className = "gameboy__pause__active";
		} else if (event.key === "m" || event.key === "M") {
			buttonClickSoundRef.current.load();
			buttonClickSoundRef.current.play();
			document.getElementById("mute").className = "gameboy__mute__active";
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
		} else if (event.key === "M" || event.key === "m") {
			document.getElementById("mute").className = "gameboy__mute";
		}
	};

	const handleButtonPress = (e) => {
		moveSoundRef.current.load();
		moveSoundRef.current.play();
	};

	const handleStartButtonPress = (e) => {
		if (!state.startButtonActivated) {
			startSoundRef.current.play();
			dispatch({ type: "start" });
		} else {
			buttonClickSoundRef.current.load();
			buttonClickSoundRef.current.play();
		}
	};
	const handleRestartButtonPress = (e) => {
		if (!state.startButtonActivated) {
			buttonClickSoundRef.current.load();
			buttonClickSoundRef.current.play();
		} else {
			restartSoundRef.current.play();
			dispatch({ type: "restart" });
			setNewLengths(state.spaceShipsLengths);
			resetBoard();
		}
	};

	const handleMuteButtonPress = (e) => {
		muteSoundRef.current.load();
		muteSoundRef.current.play();

		startSoundRef.current.muted = !startSoundRef.current.muted;
		restartSoundRef.current.muted = !restartSoundRef.current.muted;
		buttonClickSoundRef.current.muted = !buttonClickSoundRef.current.muted;
		moveSoundRef.current.muted = !moveSoundRef.current.muted;
	};

	function loginReducer(state, action) {
		switch (action.type) {
			case "start":
				return {
					...state,
					start: true,
					startButtonActivated: true,
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
			case "setNewArr":
				return {
					...state,
					spaceShipsLengths: [action.value],
				};
			case "renderNewBullet":
				return {
					...state,
					bulletCountArr: [...state.bulletCountArr, action.value + 1],
				};

			default:
				break;
		}
		return state;
	}

	const initialState = {
		start: false,
		startButtonActivated: false,
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
		bulletCountArr: [],
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
				value: getRandomArbitrary(80, 120),
			});
		}
	}

	function randomMargin() {
		$(".bullet__left").each(function () {
			randomizeLeftBullet(this);
		});
		$(".bullet__right").each(function () {
			randomizeRightBullet(this);
		});
		$(".bullet__middle").each(function () {
			randomizeMiddleBullet(this);
		});
	}

	function moveElementsDown() {
		let row1 = $(".bullets__wrapper__row1");
		let row2 = $(".bullets__wrapper__row2");
		let row3 = $(".bullets__wrapper__row3");
		let row4 = $(".bullets__wrapper__row4");
		let row5 = $(".bullets__wrapper__row5");

		if (row1.length > 0) {
			moveElementDown(row1);
		}
		if (row2.length > 0) {
			moveElementDown(row2);
		}
		if (row3.length > 0) {
			moveElementDown(row3);
		}
		if (row4.length > 0) {
			moveElementDown(row4);
		}
		if (row5.length > 0) {
			moveElementDown(row5);
		}
	}

	function moveElementDown(el) {
		let previousTopPosition = el.css("top");
		//console.log("original top", previousTopPosition);
		let newPosition;

		previousTopPosition = previousTopPosition.slice(
			0,
			previousTopPosition.length - 2
		);
		newPosition = parseInt(previousTopPosition) + 10;
		//console.log("new top", newPosition);
		$(el).css({
			top: newPosition + "px",
		});
	}

	function resetBoard() {
		$(".bullet__left").each(function () {
			bringElementToTop(this);
		});
		$(".bullet__right").each(function () {
			bringElementToTop(this);
		});
		$(".bullet__middle").each(function () {
			bringElementToTop(this);
		});
	}

	function bringElementToTop(el) {
		$(el).css({
			"margin-top": "0px",
		});
	}

	function randomizeLeftBullet(el) {
		var randomnumber2 = Math.floor(Math.random() * 3);

		$(el).css({
			"margin-left": randomnumber2 + "px",
		});
	}
	function randomizeRightBullet(el) {
		var randomnumber2 = Math.floor(Math.random() * 3);

		$(el).css({
			"margin-right": randomnumber2 + "px",
		});
	}

	function randomizeMiddleBullet(el) {
		var randomnumber2 = Math.floor(Math.random() * 3);

		$(el).css({
			"margin-right": randomnumber2 + "px",
			"margin-left": randomnumber2 + "px",
		});
	}

	function checkCollision($div1, $div2) {
		var x1 = $div1.offset().left;
		var y1 = $div1.offset().top;
		var h1 = $div1.outerHeight(true);
		var w1 = $div1.outerWidth(true);
		var b1 = y1 + h1;
		var r1 = x1 + w1;
		var x2 = $div2.offset().left;
		var y2 = $div2.offset().top;
		var h2 = $div2.outerHeight(true);
		var w2 = $div2.outerWidth(true);
		var b2 = y2 + h2;
		var r2 = x2 + w2;
		if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
		return true;
	}

	function shuffle(array) {
		var currentIndex = array.length,
			randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	}

	function createNewBullets() {
		dispatch({ type: "renderNewBullet", value: 0 });
	}
	function setNewLengths(arr) {
		let newArr = shuffle(arr);
		dispatch({ type: "setNewArray", value: newArr });
	}

	function getRandomHeight(arr) {
		var item = arr[Math.floor(Math.random() * arr.length)];
		return item;
	}

	useEffect(() => {
		console.log(state.bulletsArray);
	}, [state.bulletsArray]);

	useEffect(() => {
		let interval;
		let bulletInterval;
		if (state.start) {
			interval = setInterval(() => {
				updateTimer();
				updateTime();
				randomMargin();
				moveElementsDown();
				barrier = $(".bullets__barrier");
				bullet = $(
					".bullets__wrapper__row1, .bullets__wrapper__row2, .bullets__wrapper__row3, .bullets__wrapper__row4, .bullets__wrapper__row5"
				);

				let bool;
				bullet.each(function () {
					bool = checkCollision($(this), $(barrier));
					if (bool) {
						$(this).css({ top: "0px" });
					}
				});
			}, 1000);
			createNewBullets();
			bulletInterval = setInterval(() => {
				createNewBullets();
			}, 5000);
			renderRandom();
		}

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
			clearInterval(interval);
			clearInterval(bulletInterval);
		};
	}, [state.start]);

	useEffect(() => {
		console.log(state.bulletCountArr);
	}, [state.bulletCountArr]);

	return (
		<div className="gameboy__outer__shell">
			<div className="gameboy__inner__shell">
				<div className="gameboy__upperhalf">
					<div className="gameboy__display__wrapper">
						<div className="gameboy__display__circle">&nbsp;</div>
						<div className="gameboy__display__borderwrapper">
							<div className="gameboy__display">
								&nbsp;
								{state.start ? (
									<>
										<div className="gameboy__display__top__start">
											{state.bulletCountArr.map((count, index) => {
												return (
													<Fragment key={index}>
														<div
															className={`bullets__wrapper__row${index + 1}`}
														>
															{state.spaceShipsLengths.length === 10
																? state.spaceShipsLengths.map(
																		(height, index) => {
																			let randomHeight = getRandomHeight(
																				state.spaceShipsLengths
																			);
																			if (index === 0) {
																				return (
																					<div
																						key={index}
																						style={{
																							height: `${randomHeight}%`,
																						}}
																						className="bullet__left"
																					></div>
																				);
																			} else if (
																				index ===
																				state.spaceShipsLengths.length - 1
																			) {
																				return (
																					<div
																						key={index}
																						style={{
																							height: `${randomHeight}%`,
																						}}
																						className="bullet__right"
																					></div>
																				);
																			} else {
																				return (
																					<div
																						key={index}
																						style={{
																							height: `${randomHeight}%`,
																						}}
																						className="bullet__middle"
																					></div>
																				);
																			}
																		}
																  )
																: null}
														</div>
													</Fragment>
												);
											})}
										</div>
										<div className="gameboy__display__bottom__start">
											{state.showTimer ? (
												<div className="gameboy__timer">
													<div className="timer__minutes">{state.minutes}</div>
													<div className="timer__colon">:</div>
													<div className="timer__seconds">{state.seconds}</div>
												</div>
											) : null}
											{state.showTimer ? (
												<div className="gameboy__time">
													<div className="time__hours">
														{getHours(state.time)}
													</div>
													<div className="timer__colon">:</div>
													<div className="time__minutes">
														{getMinutes(state.time) + " " + getAMPM(state.time)}
													</div>
												</div>
											) : null}
											<div className="bullets__barrier">&nbsp;</div>
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
						<div className="lowerhalf__right__top">
							<div className="gameboy__start__wrapper">
								<button
									id="mute"
									onMouseDown={handleMuteButtonPress}
									className="gameboy__mute"
								></button>
								<div className="gameboy__start__borderwrapper">
									<div className="gameboy__start__label">Mute</div>
								</div>
							</div>
						</div>
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
	);
}

export default GameBoy;
