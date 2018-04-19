/**
 * Shuffle an array randomly
 * @param {Array} array 
 * @returns {Array} - The source array shuffled
 */
function shuffleArray(array) {
	let counter = array.length;
	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);
		counter--;
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}

module.exports = shuffleArray;
