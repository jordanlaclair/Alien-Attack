import React, { useRef } from "react";
import Notepad from "./Components/Notepad";
import GameBoy from "./Components/GameBoy";
import Chalk from "./Components/Chalk";
import Restart from "./sounds/gameboy_restart.mp3";
import Start from "./sounds/gameboy_start.mp3";
import ButtonPress from "./sounds/gameboy__buttonclick.mp3";
import Crash from "./sounds/gameboy__crash.mp3";

import "./App.css";

function App() {
	const buttonClickSoundRef = useRef(new Audio(ButtonPress));
	const muteSoundRef = useRef(new Audio(ButtonPress));
	const crashSoundRef = useRef(new Audio(Crash));
	const startSoundRef = useRef(new Audio(Start));
	const restartSoundRef = useRef(new Audio(Restart));
	return (
		<div className="App">
			<Chalk />
			<Notepad />
			<GameBoy
				restartSoundRef={restartSoundRef}
				startSoundRef={startSoundRef}
				muteSoundRef={muteSoundRef}
				buttonClickSoundRef={buttonClickSoundRef}
				crashSoundRef={crashSoundRef}
			/>
		</div>
	);
}

export default App;
