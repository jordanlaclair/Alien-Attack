import React, { useRef, useEffect } from "react";
import "../css/Notepad.css";
function Notepad1() {
	const ref = useRef();
	useEffect(() => {
		console.log(ref.current.clientHeight);
	}, []);
	return (
		<div className="notepad__wrapper">
			&nbsp;
			<div className="header__wrapper"> &nbsp;</div>
			<div className="redlines__wrapper">
				<div className="redlines__inner__wrapper">
					<div className="redline">&nbsp;</div>
					<div className="redline">&nbsp;</div>
					<div className="redline">&nbsp;</div>
				</div>
			</div>
			<div ref={ref} className="lines__wrapper">
				<div className="line"> &nbsp;</div>
				<div className="line"> &nbsp;</div>
				<div className="line"> &nbsp;</div>
				<div className="line"> &nbsp;</div>
				<div className="line"> &nbsp;</div>
				<div className="line"> &nbsp;</div>
				<div className="line"> &nbsp;</div>
				<div className="line"> &nbsp;</div>

				<div className="line"> sfssdfsf</div>

				<div className="line"> &nbsp;</div>

				<div className="line"> &nbsp;</div>

				<div className="line"> &nbsp;</div>

				<div className="line"> &nbsp;</div>

				<div className="line"> &nbsp;</div>

				<div className="line"> &nbsp;</div>

				<div className="line"> &nbsp;</div>
				<div className="line"> &nbsp;</div>
				<div className="line"> &nbsp;</div>
			</div>
		</div>
	);
}

export default Notepad1;
