import React, { useRef, useEffect } from "react";
import Sketch from "react-p5";
import Notepad from "./Components/Notepad";
import GameBoy from "./Components/GameBoy";
import Chalk from "./Components/Chalk";
import ArrowPress from "./sounds/gameboy__arrowkey.mp3";
import Restart from "./sounds/gameboy_restart.mp3";
import Start from "./sounds/gameboy_start.mp3";
import ButtonPress from "./sounds/gameboy__buttonclick.mp3";

import "./App.css";

function App() {
	let stars = [];
	let gameBoyHeight;
	let gameBoyWidth;
	let gameBoyX;
	let gameBoyY;
	let canvas;
	const buttonClickSoundRef = useRef(new Audio(ButtonPress));
	const muteSoundRef = useRef(new Audio(ButtonPress));
	const startSoundRef = useRef(new Audio(Start));
	const restartSoundRef = useRef(new Audio(Restart));
	const moveSoundRef = useRef(new Audio(ArrowPress));

	let gameBoyDimensionsCallback = (
		heightFromChild,
		widthFromChild,
		xPosition,
		yPosition
	) => {
		gameBoyHeight = heightFromChild;
		gameBoyWidth = widthFromChild;
		gameBoyX = xPosition;
		gameBoyY = yPosition;
		console.log("heightFromChild: ", heightFromChild);
		console.log("widthFromChild", widthFromChild);
		console.log("x: ", gameBoyX);
		console.log("y", gameBoyY);
	};

	/* setInterval(() => {
		stars++;
		console.log(stars);
	}, 1000); */

	let setup = (p5) => {
		canvas = p5.createCanvas(gameBoyWidth, gameBoyHeight);
		canvas.position(gameBoyX, gameBoyY);
	};

	let draw = (p5) => {
		p5.background(0);

		if (stars.length <= 100) {
			stars.push(new Star(p5));
		}

		for (let i = 0; i < stars.length; i++) {
			stars[i].update();

			if (stars[i].isOffScreen()) {
				stars[i] = new Star(p5);
			}
		}
	};

	function Star(p5) {
		this.pos = p5.createVector(p5.random(p5.width), 0);
		this.vel = p5.createVector(0, 7);
		this.col = p5.color(255, 255, 255);
		this.r = 2;

		//this.history = [];

		this.update = function () {
			this.pos.add(this.vel);
			this.display();
			/*  if(this.history.length <= 2){
				this.history.push(this.pos.copy());
			}else{
				this.history.splice(0,1);
			}*/
		};

		this.display = function () {
			p5.push();
			p5.strokeWeight(0);

			/*for(var i = 0; i < this.history.length;i++){
				var size = this.r*2;//map(i,0,this.history.length,1,this.r);
				fill(0,255,0,15);
				ellipse(this.history[i].x,this.history[i].y,size*2,size*2);
			}*/

			p5.fill(this.col);

			p5.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
			p5.fill(255, 180);
			p5.ellipse(this.pos.x, this.pos.y, this.r * 2 + 0.1, this.r * 2 + 0.1);

			p5.pop();
		};

		this.isOffScreen = function () {
			return this.pos.y >= p5.height + 20;
		};
	}

	return (
		<div className="App">
			<Chalk />
			<Notepad />
			<GameBoy
				moveSoundRef={moveSoundRef}
				restartSoundRef={restartSoundRef}
				startSoundRef={startSoundRef}
				muteSoundRef={muteSoundRef}
				buttonClickSoundRef={buttonClickSoundRef}
				callbackFromParent={gameBoyDimensionsCallback}
			/>
			<div className="stars__wrapper">
				<Sketch setup={setup} draw={draw} star={Star} />
			</div>
		</div>
	);
}

export default App;
