import React from "react";
import gameboy from "../images/gameboy.png";
import "../css/GameBoy.css";
function GameBoy() {
	return (
		<div>
			<div className="image__container">
				<img className="gameboy__image" src={gameboy} alt="gameboy device" />
			</div>
		</div>
	);
}

export default GameBoy;
