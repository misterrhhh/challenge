import { useState } from "react";
import "./other.scss"

const Controller = () => {
	const [hidden, setHidden] = useState(false);

	const toggleBackground = () => {
		if (!hidden) {
			document.body.classList.add("hide");
		} else {
			document.body.classList.remove("hide");
		}
        
		setHidden(!hidden);
	};

	return (
		<div className="controller">
			<button onClick={toggleBackground}>
				{hidden ? "Show Background" : "Hide Background"}
			</button>
		</div>
	);
};

export default Controller;
