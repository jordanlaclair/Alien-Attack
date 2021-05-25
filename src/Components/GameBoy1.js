import React from "react";
import "../css/GameBoy1.css";
function GameBoy1() {
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

						<div className="gameboy__lowerhalf__right">sfsddf</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameBoy1;
