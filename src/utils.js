/**
 * Shuffle an array randomly
 * @param {Array} array 
 * @returns {Array} - The source array shuffled
 */
function shuffleArray(array) {
	let totalIndex = array.length;

	while (totalIndex > 0) {
		const randomIndex = Math.floor(Math.random() * totalIndex);
	
		totalIndex--;

		const temp = array[totalIndex];

		array[totalIndex] = array[randomIndex];
		array[randomIndex] = temp;
	}
	return array;
}

module.exports = shuffleArray;