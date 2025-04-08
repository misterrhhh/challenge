export const getAmountOfMapsToWin = (seriesType: "bo1" | "bo2" | "bo3" | "bo5" | "bo7") => {
	const totalMaps = parseInt(seriesType.replace("bo", ""));
	return Math.ceil(totalMaps / 2);
};

export const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

