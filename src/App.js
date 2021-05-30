import React from "react";
import Notepad from "./Components/Notepad";
import GameBoy from "./Components/GameBoy";
import Chalk from "./Components/Chalk";

import "./App.css";

function App() {
	return (
		<div className="App">
			<Chalk />
			<Notepad />
			<GameBoy />
		</div>
	);
}

export default App;
