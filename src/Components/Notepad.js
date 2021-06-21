import React, { useEffect, useState } from "react";
import "../css/Notepad.css";
function Notepad1() {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	const handleResize = () => {
		setWidth(window.innerWidth);
	};

	if (width > 1867) {
		return (
			<div className="notepad__wrapper">
				<div className="img-tape img-tape--3">
					<div className="header__wrapper"> &nbsp;</div>
					<div className="redlines__wrapper">
						<div className="redlines__inner__wrapper">
							<div className="redline">&nbsp;</div>
							<div className="redline">&nbsp;</div>
							<div className="redline">&nbsp;</div>
						</div>
					</div>
					<div className="lines__wrapper">
						<div className="line">
							Start =
							<span class="keycap">
								<span>S</span>
							</span>
						</div>
						<div className="line">
							Restart =
							<span className="keycap">
								<span>R</span>
							</span>
						</div>
						<div className="line">
							Pause =
							<span className="keycap">
								<span>P</span>
							</span>
						</div>
						<div className="line"> &nbsp;</div>
						<div className="line">
							{" "}
							Move Up =
							<span className="keycap">
								<span>&#94;</span>
							</span>
						</div>
						<div className="line">
							Move Right =
							<span className="keycap">
								<span className="right">&#94;</span>
							</span>
						</div>
						<div className="line">
							Move Down =
							<span className="keycap">
								<span className="down">&#94;</span>
							</span>
						</div>
						<div className="line">
							Move Left =
							<span className="keycap">
								<span className="left">&#94;</span>
							</span>
						</div>

						<div className="line"> </div>

						<div className="line"> </div>

						<div className="line"> </div>

						<div className="line"> </div>

						<div className="line"> </div>
					</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
}

export default Notepad1;
