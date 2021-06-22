import React, { useEffect, useState, useRef, useReducer } from "react";
import UFO from "../images/gameboy__ufo.png";
import $ from "jquery";
import { Fragment } from "react";

import "../css/GameBoy.css";

function GameBoy({
	moveSoundRef,
	restartSoundRef,
	muteSoundRef,
	startSoundRef,
	buttonClickSoundRef,
	crashSoundRef,
}) {
	var bulletRows;
	var barrier;
	var gameBoy;
	const [shipState, setShipState] = useState(0);

	const [immune, setImmune] = useState(false);
	const [highScore, setHighScore] = useStickyState(0, "totalScore");
	const menu = useRef(null);

	function useStickyState(defaultValue, key) {
		const [value, setValue] = useState(() => {
			const stickyValue = window.localStorage.getItem(key);
			return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
		});
		//keeps local storage in sync
		React.useEffect(() => {
			window.localStorage.setItem(key, JSON.stringify(value));
		}, [key, value]);
		return [value, setValue];
	}

	function loginReducer(state, action) {
		switch (action.type) {
			case "start":
				return {
					...state,
					start: true,
					startButtonActivated: true,
					menu: false,
					showMenu: true,
					time: new Date().toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}),
				};
			case "restart":
				if (state.start) {
					return {
						...state,
						restarted: state.restarted + 1,
						shrinkScreen: false,
						gameOver: false,
						minutes: 0,
						seconds: 0,
						score: 0,
						totalSeconds: 0,
						lives: 3,
						paused: false,
					};
				} else {
					return { ...state };
				}
			case "pause":
				if (state.start) {
					return {
						...state,
						paused: !state.paused,
					};
				}

			case "GameOver":
				return {
					...state,
					gameOver: true,
					shrinkScreen: true,
				};

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

			case "renderNewBullet":
				return {
					...state,
					bulletCountArr: [...state.bulletCountArr, action.value + 1],
				};
			case "increaseScore":
				return {
					...state,
					score: state.score + 11,
				};
			case "toggleMenuInterval":
				if (state.start) {
					return {
						...state,
						menuInterval: action.value,
					};
				}
			case "toggleBulletInterval":
				if (state.start) {
					return {
						...state,
						bulletInterval: action.value,
					};
				}
			case "toggleCrashInterval":
				if (state.start) {
					return {
						...state,
						crashInterval: action.value,
					};
				}

			case "shipSpeed":
				if (state.start) {
					return {
						...state,
						shipSpeedInterval: action.value,
					};
				}
			case "setTimeInterval":
				return {
					...state,
					timeInterval: action.value,
				};

			case "shipCollision":
				if (!immune) {
					return {
						...state,
						immuneBullets: false,
						lives: state.lives - 1,
					};
				} else {
					return {
						...state,
						immuneBullets: true,
					};
				}

			default:
				break;
		}
		return state;
	}

	const initialState = {
		start: false,
		restarted: 0,
		startButtonActivated: false,
		menu: true,
		paused: false,
		time: "",
		minutes: 0,
		seconds: 0,
		score: 0,
		showMenu: false,
		totalSeconds: 0,
		spaceShipsLengths: [],
		bulletCountArr: [],
		menuInterval: 0,
		timeInterval: 0,
		bulletInterval: 0,
		restart: 0,
		lives: 3,
		gameOver: false,
		shrinkScreen: false,
		immuneBullets: false,
		shipSpeedInterval: 0,
		crashInterval: 0,
	};

	const [state, dispatch] = useReducer(loginReducer, initialState);

	const handleKeyDown = (event) => {
		if (event.key === "ArrowUp") {
			if (state.paused == false && state.start == true) {
				moveSoundRef.current.play();
			} else {
				buttonClickSoundRef.current.play();
			}

			document.getElementById("uparrow").className =
				"gameboy__uparrow1__active";
		} else if (event.key === "ArrowRight") {
			buttonClickSoundRef.current.play();
			if (state.paused == false && state.start == true) {
				moveSoundRef.current.play();
			} else {
				buttonClickSoundRef.current.play();
			}
			document.getElementById("rightarrow").className =
				"gameboy__uparrow1__active__1";
		} else if (event.key === "ArrowDown") {
			if (state.paused == false && state.start == true) {
				moveSoundRef.current.play();
			} else {
				buttonClickSoundRef.current.play();
			}
			document.getElementById("downarrow").className =
				"gameboy__uparrow1__active";
		} else if (event.key === "ArrowLeft") {
			if (state.paused == false && state.start == true) {
				moveSoundRef.current.play();
			} else {
				buttonClickSoundRef.current.play();
			}
			document.getElementById("leftarrow").className =
				"gameboy__uparrow1__active__1";
		} else if (event.key === "s" || event.key === "S") {
			if (!state.startButtonActivated) {
				startSoundRef.current.play();
				dispatch({ type: "start" });
			} else {
				buttonClickSoundRef.current.play();
			}

			document.getElementById("start").className = "gameboy__start__active";
		} else if (event.key === "r" || event.key === "R") {
			if (!state.startButtonActivated) {
				buttonClickSoundRef.current.play();
			} else {
				restartSoundRef.current.play();
				dispatch({ type: "restart" });
			}

			document.getElementById("restart").className = "gameboy__restart__active";
		} else if (event.key === "p" || event.key === "P") {
			if (!state.gameOver) {
				dispatch({ type: "pause" });
				moveSoundRef.current.play();
			} else {
				buttonClickSoundRef.current.play();
			}

			document.getElementById("pause").className = "gameboy__pause__active";
		} else if (event.key === "m" || event.key === "M") {
			buttonClickSoundRef.current.load();
			buttonClickSoundRef.current.play();
			document.getElementById("mute").className = "gameboy__mute__active";
			startSoundRef.current.muted = !startSoundRef.current.muted;
			restartSoundRef.current.muted = !restartSoundRef.current.muted;
			buttonClickSoundRef.current.muted = !buttonClickSoundRef.current.muted;
			moveSoundRef.current.muted = !moveSoundRef.current.muted;
			crashSoundRef.current.muted = !crashSoundRef.current.muted;
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

	const handleButtonPress = () => {
		if (
			state.paused == false &&
			state.start == true &&
			state.gameOver == false
		) {
			moveSoundRef.current.play();
		} else {
			buttonClickSoundRef.current.play();
		}
	};

	const handlePauseButtonPress = () => {
		if (!state.gameOver) {
			dispatch({ type: "pause" });
			moveSoundRef.current.play();
		} else {
			buttonClickSoundRef.current.play();
		}
	};

	const handleStartButtonPress = (e) => {
		if (!state.startButtonActivated) {
			startSoundRef.current.play();
			dispatch({ type: "start" });
		} else {
			buttonClickSoundRef.current.play();
		}
	};
	const handleRestartButtonPress = (e) => {
		if (!state.startButtonActivated) {
			buttonClickSoundRef.current.play();
		} else {
			restartSoundRef.current.play();
			dispatch({ type: "restart" });
			resetBoard();
		}
	};

	const handleMuteButtonPress = (e) => {
		muteSoundRef.current.load();
		muteSoundRef.current.play();

		startSoundRef.current.muted = !startSoundRef.current.muted;
		restartSoundRef.current.muted = !restartSoundRef.current.muted;
		crashSoundRef.current.muted = !crashSoundRef.current.muted;
		buttonClickSoundRef.current.muted = !buttonClickSoundRef.current.muted;
		moveSoundRef.current.muted = !moveSoundRef.current.muted;
	};

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

	useEffect(() => {
		if (state.score > highScore) {
			setHighScore(state.score);
		}
	}, [state.score]);

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
	function updateScore() {
		dispatch({ type: "increaseScore" });
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
		for (let i = 0; i < 5; i++) {
			dispatch({
				type: "updateSpaceShipsLengths",
				value: getRandomArbitrary(50, 100),
			});
		}
	}

	function randomMargin(el) {
		$(el)
			.children(".bullet__left")
			.each(function () {
				randomizeLeftBullet(this);
			});
		$(el)
			.children(".bullet__middle")
			.each(function () {
				randomizeMiddleBullet(this);
			});
		$(el)
			.children(".bullet__right")
			.each(function () {
				randomizeRightBullet(this);
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
		let newPosition;

		previousTopPosition = previousTopPosition.slice(
			0,
			previousTopPosition.length - 2
		);
		newPosition = parseInt(previousTopPosition) + 20;
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
		var randomnumber2 = getRandomArbitrary(5, 10);

		$(el).css({
			left: randomnumber2 + "%",
		});
	}
	function randomizeRightBullet(el) {
		var randomnumber2 = getRandomArbitrary(5, 10);

		$(el).css({
			right: randomnumber2 + "%",
		});
	}

	function randomizeMiddleBullet(el) {
		var randomnumber2 = Math.floor(Math.random() * 15);

		$(el).css({
			left: randomnumber2 + "%",
			right: randomnumber2 + "%",
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

	


	function createNewBullets() {
		dispatch({ type: "renderNewBullet", value: 0 });
	}

	function getRandomHeight(arr) {
		var item = arr[Math.floor(Math.random() * arr.length)];
		return item;
	}
	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		if (state.paused == false) {
			$(function () {
				var pane = $("#ship__container"),
					box = $("#ship"),
					wh = pane.width() - box.width(),
					wv = pane.height() - box.height(),
					d = {},
					x = 2;

				function newh(v, a, b) {
					var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
					return n < 0 ? 0 : n > wh ? wh : n;
				}

				function newv(v, a, b) {
					var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
					return n < 0 ? 0 : n > wv ? wv : n;
				}

				$(window).keydown(function (e) {
					d[e.which] = true;
				});
				$(window).keyup(function (e) {
					d[e.which] = false;
				});
				let interval;
				setShipState(
					setInterval(function () {
						box.css({
							left: function (i, v) {
								return newh(v, 37, 39);
							},
							top: function (i, v) {
								return newv(v, 38, 40);
							},
						});
						wh = pane.width() - box.width();
						wv = pane.height() - box.height();
					}, 20)
				);
			});
		} else {
			setShipState(clearInterval(shipState));
		}

		//(state.start);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, [state.start, state.paused]);

	function menuOnUnPause() {
		updateTimer();
		updateScore();
	}

	function bulletOnUnPause() {
		createNewBullets();
	}

	function reCheckCollisions() {
		let hitBarrier;
		let hitShip;

		barrier = $(".bullets__barrier");

		bulletRows = $(
			".bullets__wrapper__row1, .bullets__wrapper__row2, .bullets__wrapper__row3, .bullets__wrapper__row4, .bullets__wrapper__row5"
		);

		bulletRows.each(function () {
			hitBarrier = checkCollision($(this), $(barrier));

			$(this.children).each(function () {
				hitShip = checkCollision($(this), $(".ship"));
				if (hitShip) {
					dispatch({ type: "shipCollision" });
					$(this).hide();

					if (!state.muted) {
						crashSoundRef.current.play();
					}
				}
				if (hitBarrier) {
					$(this).show();
				}
			});

			if (hitBarrier) {
				$(this).css({ top: "0px" });
				randomMargin(this);
			}
		});
	}

	useEffect(() => {
		if (state.lives == 3) {
			if (
				$("#life1.lives__wrapper__ship").length > 0 &&
				$("#life2.lives__wrapper__ship").length > 0 &&
				$("#life3.lives__wrapper__ship").length > 0
			) {
				return;
			} else {
				if ($("#life1.lives__wrapper__ship").length > 0) {
					document.getElementById("life1").remove();
				}
				if ($("#life2.lives__wrapper__ship").length > 0) {
					document.getElementById("life2").remove();
				}
				if ($("#life3.lives__wrapper__ship").length > 0) {
					document.getElementById("life3").remove();
				}

				$(".lives__wrapper").append(
					'<div class="lives__wrapper__ship" id="life1">&nbsp;</div>'
				);
				$(".lives__wrapper").append(
					'<div class="lives__wrapper__ship" id="life2">&nbsp;</div>'
				);
				$(".lives__wrapper").append(
					'<div class="lives__wrapper__ship" id="life3">&nbsp;</div>'
				);

				$("#life1.lives__wrapper__ship").prepend(
					'<div className="ship-item1">&nbsp;</div><div class="ship-item2">&nbsp;</div><div class="ship-item3">&nbsp;</div><div class="ship-item4">&nbsp;</div><div class="ship-item5">&nbsp;</div><div class="ship-item6">&nbsp;</div><div class="ship-item7">&nbsp;</div><div class="ship-item8">&nbsp;</div><div class="ship-item9">&nbsp;</div><div class="ship-item10">&nbsp;</div><div class="ship-item11">&nbsp;</div><div class="ship-item12">&nbsp;</div><div class="ship-item13">&nbsp;</div><div class="ship-item14">&nbsp;</div><div class="ship-item15">&nbsp;</div>'
				);
				$("#life2.lives__wrapper__ship").prepend(
					'<div className="ship-item1">&nbsp;</div><div class="ship-item2">&nbsp;</div><div class="ship-item3">&nbsp;</div><div class="ship-item4">&nbsp;</div><div class="ship-item5">&nbsp;</div><div class="ship-item6">&nbsp;</div><div class="ship-item7">&nbsp;</div><div class="ship-item8">&nbsp;</div><div class="ship-item9">&nbsp;</div><div class="ship-item10">&nbsp;</div><div class="ship-item11">&nbsp;</div><div class="ship-item12">&nbsp;</div><div class="ship-item13">&nbsp;</div><div class="ship-item14">&nbsp;</div><div class="ship-item15">&nbsp;</div>'
				);
				$("#life3.lives__wrapper__ship").prepend(
					'<div className="ship-item1">&nbsp;</div><div class="ship-item2">&nbsp;</div><div class="ship-item3">&nbsp;</div><div class="ship-item4">&nbsp;</div><div class="ship-item5">&nbsp;</div><div class="ship-item6">&nbsp;</div><div class="ship-item7">&nbsp;</div><div class="ship-item8">&nbsp;</div><div class="ship-item9">&nbsp;</div><div class="ship-item10">&nbsp;</div><div class="ship-item11">&nbsp;</div><div class="ship-item12">&nbsp;</div><div class="ship-item13">&nbsp;</div><div class="ship-item14">&nbsp;</div><div class="ship-item15">&nbsp;</div>'
				);
			}
		}

		if (state.lives == 2) {
			document.getElementById("life1").remove();
		}
		if (state.lives == 1) {
			document.getElementById("life2").remove();
		}
		if (state.lives == 0) {
			document.getElementById("life3").remove();

			dispatch({ type: "pause" });
			dispatch({ type: "GameOver" });
		}
	}, [state.lives]);

	useEffect(() => {
		if (state.start) {
			startPause();

			dispatch({
				type: "setTimerInterval",
				value: setInterval(updateTime, 1000),
			});
			createNewBullets();
			renderRandom();
		}

		return () => {
			clearInterval(state.menuInterval);
			clearInterval(state.timeInterval);
		};
	}, [state.start]);

	useEffect(() => {
		if (state.gameOver === true) {
			menu.current = $("#ship__container").detach();
		} /* else {
			$(".gameboy__display").append(menu.current);
			$("#ship").hide();

			setTimeout(() => {
				$("#ship").css({
					top: "50%",
					left: "50%",
					margin:
						"-" +
						$("#ship").height() / 2 +
						"px 0 0 -" +
						$("#ship").width() / 2 +
						"px",
				});
				$("#ship").show();
			}, 100);

			setTimeout(() => {
				$("#ship").addClass("ship-remove-class");
				setImmune(false);
			}, 5000);
		} */
	}, [state.gameOver]);

	useEffect(() => {
		if (state.restarted > 0) {
			setImmune(true);
			$(".gameboy__display").append(menu.current);
			$("#ship").hide();

			setTimeout(() => {
				$("#ship").css({
					top: "50%",
					left: "50%",
					margin:
						"-" +
						$("#ship").height() / 2 +
						"px 0 0 -" +
						$("#ship").width() / 2 +
						"px",
				});
				$("#ship").show();
				$("#ship").removeClass("ship-remove-class");
				$("#ship").addClass("ship-add-class");
			}, 100);

			setTimeout(() => {
				$("#ship").addClass("ship-remove-class");
				setImmune(false);
			}, 5000);
		}
	}, [state.restarted]);

	function startPause() {
		if (!state.paused && state.start) {
			dispatch({
				type: "shipSpeed",
				value: setInterval(moveElementsDown, 400),
			});
			dispatch({
				type: "toggleMenuInterval",
				value: setInterval(menuOnUnPause, 1000),
			});
			dispatch({
				type: "toggleCrashInterval",
				value: setInterval(reCheckCollisions, 200),
			});

			dispatch({
				type: "toggleBulletInterval",
				value: setInterval(bulletOnUnPause, 1000),
			});
		} else {
			clearInterval(state.menuInterval);
			clearInterval(state.bulletInterval);
			clearInterval(state.shipSpeedInterval);
			clearInterval(state.crashInterval);
		}
	}

	useEffect(() => {
		startPause();
	}, [state.paused]);

	return (
		<div className="gameboy__outer__shell">
			<div className="gameboy__inner__shell">
				<div className="gameboy__upperhalf">
					<div className="gameboy__display__wrapper">
						<div className="gameboy__display__circle">&nbsp;</div>
						<div className="gameboy__display__borderwrapper">
							<div className="gameboy__display">
								{state.gameOver ? (
									<div className="gameboy__display__top__gameover">
										<>
											<div className="gameboy__display__top__gameover__title">
												GAME OVER!
											</div>
											<div className="gameboy__display__top__gameover__score">
												Score: {state.score}
											</div>
											<div className="gameboy__display__top__gameover__highscore">
												High Score: {highScore}
											</div>
										</>
									</div>
								) : null}
								&nbsp;
								{state.start ? (
									<>
										<div
											id="ship__container"
											className="gameboy__display__top__start"
										>
											<div
												style={
													state.paused
														? { animationPlayState: "paused" }
														: { animationPlayState: "running" }
												}
												className="star__wrapper3"
											>
												<div className="star5"></div>
												<div className="star"></div>
												<div className="star5"></div>
												<div className="star6"></div>
												<div className="star6"></div>
												<div className="star5"></div>
												<div className="star6"></div>
												<div className="star5"></div>
												<div className="star5"></div>
												<div className="star6"></div>
												<div className="star6"></div>
												<div className="star"></div>
											</div>
											<div
												style={
													state.paused
														? { animationPlayState: "paused" }
														: { animationPlayState: "running" }
												}
												className="star__wrapper"
											>
												<div className="star5"></div>
												<div className="star"></div>
												<div className="star5"></div>
												<div className="star6"></div>
												<div className="star6"></div>
												<div className="star5"></div>
												<div className="star6"></div>
												<div className="star5"></div>
												<div className="star5"></div>
												<div className="star6"></div>
												<div className="star6"></div>
												<div className="star"></div>
											</div>
											<div
												style={
													state.paused
														? { animationPlayState: "paused" }
														: { animationPlayState: "running" }
												}
												className="star__wrapper4"
											>
												<div className="star5"></div>
												<div className="star"></div>
												<div className="star5"></div>
												<div className="star6"></div>
												<div className="star6"></div>
												<div className="star5"></div>
												<div className="star6"></div>
												<div className="star5"></div>
												<div className="star5"></div>
												<div className="star6"></div>
												<div className="star6"></div>
												<div className="star"></div>
											</div>
											<div
												style={
													state.paused
														? { animationPlayState: "paused" }
														: { animationPlayState: "running" }
												}
												className="star__wrapper5"
											>
												<div className="star5"></div>
												<div className="star"></div>
												<div className="star5"></div>
												<div className="star6"></div>
												<div className="star6"></div>
												<div className="star5"></div>
												<div className="star6"></div>
												<div className="star5"></div>
												<div className="star5"></div>
												<div className="star6"></div>
												<div className="star6"></div>
												<div className="star"></div>
											</div>
											<div id="ship" className="ship">
												<div className="ship-item1">&nbsp;</div>
												<div className="ship-item2">&nbsp;</div>
												<div className="ship-item3">&nbsp;</div>
												<div className="ship-item4">&nbsp;</div>
												<div className="ship-item5">&nbsp;</div>
												<div className="ship-item6">&nbsp;</div>
												<div className="ship-item7">&nbsp;</div>
												<div className="ship-item8">&nbsp;</div>
												<div className="ship-item9">&nbsp;</div>
												<div className="ship-item10">&nbsp;</div>
												<div className="ship-item11">&nbsp;</div>
												<div className="ship-item12">&nbsp;</div>
												<div className="ship-item13">&nbsp;</div>
												<div className="ship-item14">&nbsp;</div>
												<div className="ship-item15">&nbsp;</div>
											</div>
											{state.bulletCountArr.map((count, index1) => {
												return (
													<Fragment key={index1}>
														<div
															className={`bullets__wrapper__row${index1 + 1}`}
														>
															{state.spaceShipsLengths.length === 5
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
											{state.showMenu ? (
												<div className="gameboy__menu">
													<div id="lives__wrapper" className="lives__wrapper">
														<div id="life1" className="lives__wrapper__ship">
															<div id="ship-item1" className="ship-item1">
																&nbsp;
															</div>

															<div id="ship-item2" className="ship-item2">
																&nbsp;
															</div>
															<div id="ship-item3" className="ship-item3">
																&nbsp;
															</div>
															<div id="ship-item4" className="ship-item4">
																&nbsp;
															</div>
															<div id="ship-item5" className="ship-item5">
																&nbsp;
															</div>
															<div id="ship-item6" className="ship-item6">
																&nbsp;
															</div>
															<div id="ship-item7" className="ship-item7">
																&nbsp;
															</div>
															<div id="ship-item8" className="ship-item8">
																&nbsp;
															</div>
															<div id="ship-item9" className="ship-item9">
																&nbsp;
															</div>
															<div id="ship-item10" className="ship-item10">
																&nbsp;
															</div>
															<div id="ship-item11" className="ship-item11">
																&nbsp;
															</div>
															<div id="ship-item12" className="ship-item12">
																&nbsp;
															</div>
															<div id="ship-item13" className="ship-item13">
																&nbsp;
															</div>
															<div id="ship-item14" className="ship-item14">
																&nbsp;
															</div>
															<div id="ship-item15" className="ship-item15">
																&nbsp;
															</div>
														</div>
														<div id="life2" className="lives__wrapper__ship">
															<div id="ship-item1" className="ship-item1">
																&nbsp;
															</div>

															<div id="ship-item2" className="ship-item2">
																&nbsp;
															</div>
															<div id="ship-item3" className="ship-item3">
																&nbsp;
															</div>
															<div id="ship-item4" className="ship-item4">
																&nbsp;
															</div>
															<div id="ship-item5" className="ship-item5">
																&nbsp;
															</div>
															<div id="ship-item6" className="ship-item6">
																&nbsp;
															</div>
															<div id="ship-item7" className="ship-item7">
																&nbsp;
															</div>
															<div id="ship-item8" className="ship-item8">
																&nbsp;
															</div>
															<div id="ship-item9" className="ship-item9">
																&nbsp;
															</div>
															<div id="ship-item10" className="ship-item10">
																&nbsp;
															</div>
															<div id="ship-item11" className="ship-item11">
																&nbsp;
															</div>
															<div id="ship-item12" className="ship-item12">
																&nbsp;
															</div>
															<div id="ship-item13" className="ship-item13">
																&nbsp;
															</div>
															<div id="ship-item14" className="ship-item14">
																&nbsp;
															</div>
															<div id="ship-item15" className="ship-item15">
																&nbsp;
															</div>
														</div>
														<div id="life3" className="lives__wrapper__ship">
															<div id="ship-item1" className="ship-item1">
																&nbsp;
															</div>

															<div id="ship-item2" className="ship-item2">
																&nbsp;
															</div>
															<div id="ship-item3" className="ship-item3">
																&nbsp;
															</div>
															<div id="ship-item4" className="ship-item4">
																&nbsp;
															</div>
															<div id="ship-item5" className="ship-item5">
																&nbsp;
															</div>
															<div id="ship-item6" className="ship-item6">
																&nbsp;
															</div>
															<div id="ship-item7" className="ship-item7">
																&nbsp;
															</div>
															<div id="ship-item8" className="ship-item8">
																&nbsp;
															</div>
															<div id="ship-item9" className="ship-item9">
																&nbsp;
															</div>
															<div id="ship-item10" className="ship-item10">
																&nbsp;
															</div>
															<div id="ship-item11" className="ship-item11">
																&nbsp;
															</div>
															<div id="ship-item12" className="ship-item12">
																&nbsp;
															</div>
															<div id="ship-item13" className="ship-item13">
																&nbsp;
															</div>
															<div id="ship-item14" className="ship-item14">
																&nbsp;
															</div>
															<div id="ship-item15" className="ship-item15">
																&nbsp;
															</div>
														</div>
													</div>
													<div className="score__wrapper">
														{state.score >= 100000 ? null : (
															<div className="placeholder__hundred__thousands">
																0
															</div>
														)}
														{state.score >= 10000 ? null : (
															<div className="placeholder__ten__thousands">
																0
															</div>
														)}
														{state.score >= 1000 ? null : (
															<div className="placeholder__thousands">0</div>
														)}

														{state.score >= 100 ? null : (
															<div className="placeholder__hundreds">0</div>
														)}

														{state.score >= 10 ? null : (
															<div className="placeholder__tenths">0</div>
														)}

														<div className="score">{state.score}</div>
													</div>
													<div className="score__wrapper">
														{highScore >= 100000 ? null : (
															<div className="placeholder__hundred__thousands">
																0
															</div>
														)}
														{highScore >= 10000 ? null : (
															<div className="placeholder__ten__thousands">
																0
															</div>
														)}
														{highScore >= 1000 ? null : (
															<div className="placeholder__thousands">0</div>
														)}

														{highScore >= 100 ? null : (
															<div className="placeholder__hundreds">0</div>
														)}

														{highScore >= 10 ? null : (
															<div className="placeholder__tenths">0</div>
														)}

														<div className="score">{highScore}</div>
													</div>
													<div className="gameboy__time">
														<div className="time__hours">
															{getHours(state.time)}
														</div>
														<div className="colon__wrapper1">
															<div className="timer__colon">:</div>
															<div className="timer__colon__off">:</div>
														</div>

														<div className="time__minutes">
															{getMinutes(state.time) +
																" " +
																getAMPM(state.time)}
														</div>
													</div>
												</div>
											) : null}

											<div id="bullets__barrier" className="bullets__barrier">
												&nbsp;
											</div>
										</div>
									</>
								) : (
									<div className="gameboy__display__inner">
										<div className="gameboy__display__top__menu">
											<div className="star__wrapper1">
												<div className="star4"></div>

												<div className="star1"></div>
												<div className="star3"></div>
											</div>
											<div className="star__wrapper2">
												<div className="star3"></div>
												<div className="star1"></div>

												<div className="star4"></div>
											</div>

											<div className="star__wrapper1">
												<div className="star2"></div>
											</div>
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
										name="start"
										id="start"
										aria-label="start"
										onMouseDown={handleStartButtonPress}
										className="gameboy__start"
									></button>
									<div className="gameboy__start__borderwrapper">
										<div className="gameboy__start__label">Start</div>
									</div>
								</div>
								<div className="gameboy__start__wrapper">
									<button
										name="restart"
										aria-label="restart"
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
									name="pause"
									id="pause"
									aria-label="pause"
									onMouseDown={handlePauseButtonPress}
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
									name="mute"
									id="mute"
									aria-label="mute"
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
									name="up arrow"
									aria-label="arrow up"
									id="uparrow"
									onMouseDown={handleButtonPress}
									className="gameboy__uparrow1"
								></button>
							</div>
							<div className="gameboy__controls__row2">
								<button
									name="left arrow"
									aria-label="left arrow"
									id="leftarrow"
									onMouseDown={handleButtonPress}
									className="gameboy__uparrow1"
								></button>
								<div className="gameboy__arrows__wrapper">
									<div className="gameboy__arrows__row1">
										<div
											name="uparrow1"
											aria-label="up arrow"
											className="gameboy__arrow__up"
										></div>
									</div>
									<div className="gameboy__arrows__row2">
										<div
											name="arrow left"
											aria-label="arrow left"
											className="gameboy__arrow__left"
										></div>
										&nbsp;
										<div
											name="arrow right"
											aria-label="arrow right"
											className="gameboy__arrow__right"
										></div>
									</div>
									<div className="gameboy__arrows__row3">
										<div
											name="arrow down"
											aria-label="down arrow1"
											className="gameboy__arrow__down"
										></div>
									</div>
								</div>
								<button
									id="rightarrow"
									name="right arrow"
									aria-label="right arrow"
									onMouseDown={handleButtonPress}
									className="gameboy__uparrow1"
								></button>
							</div>
							<div className="gameboy__controls__row3">
								<button
									name="down arrow"
									aria-label="down arrow"
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
