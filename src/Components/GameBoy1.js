import React from "react";
import "../css/GameBoy1.css";
function GameBoy1() {
	return (
		<div>
			<div className="gameboy__outer__shell">
				<div className="gameboy__inner__shell">
					<div class="gameboy__upperhalf">
						<div class="gameboy__display__wrapper">
							&nbsp;
							<div class="gameboy__display__circle">&nbsp;</div>
							<div className="gameboy__display__borderwrapper">
								<div class="gameboy__display">&nbsp;</div>
							</div>
						</div>
					</div>
					<div class="gameboy__lowerhalf"></div>
				</div>
			</div>
		</div>
	);
}

export default GameBoy1;
