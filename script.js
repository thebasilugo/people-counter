// DOM Elements
const saveEl = document.getElementById("save-el");
const countEl = document.getElementById("count-el");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");
const saveBtn = document.getElementById("save-btn");
const resetBtn = document.getElementById("reset-btn");
const undoBtn = document.getElementById("undo-btn");
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// App State
let count = 0;
let saved = [];
let previousCount = 0;

// Sound Effects for User Interactions
const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");

// Event Listeners
incrementBtn.addEventListener("click", () => handleCounterAction("increment"));
decrementBtn.addEventListener("click", () => handleCounterAction("decrement"));
saveBtn.addEventListener("click", save);
resetBtn.addEventListener("click", reset);
undoBtn.addEventListener("click", undo);
themeToggleBtn.addEventListener("click", toggleDarkMode);

// Handle Counter Actions (Increment/Decrement)
function handleCounterAction(action) {
	previousCount = count;
	if (action === "increment") count++;
	if (action === "decrement") count--;
	updateCount();
	updateColor();
	saveState();
	playSound();
}

/**
 * Save the current count to history and reset.
 */
function save() {
	saved.push(count);
	saveEl.textContent = `Previous Entries: ${saved.join(" - ")}`;
	count = 0;
	updateCount();
	updateColor();
	playSound();
}

/**
 * Reset the counter and clear history.
 */
function reset() {
	saved = [];
	saveEl.textContent = "Previous Entries: ";
	count = 0;
	updateCount();
	updateColor();
	playSound();
}

/**
 * Undo to the previous count.
 */
function undo() {
	if (previousCount !== undefined) {
		count = previousCount;
		updateCount();
		updateColor();
		playSound();
	}
}

/**
 * Update the displayed count value.
 */
function updateCount() {
	countEl.textContent = count;
}

/**
 * Update the color of the count based on its value.
 */
function updateColor() {
	if (count === 0) {
		countEl.classList.remove("text-green-600", "text-red-600");
		countEl.classList.add("text-gray-900");
	} else if (count > 0) {
		countEl.classList.remove("text-red-600");
		countEl.classList.add("text-green-600");
	} else {
		countEl.classList.remove("text-green-600");
		countEl.classList.add("text-red-600");
	}
}

/**
 * Save the state of count and history in localStorage.
 */
function saveState() {
	localStorage.setItem("count", count);
	localStorage.setItem("saved", JSON.stringify(saved));
}

/**
 * Restore the previous saved state from localStorage.
 */
function restoreState() {
	count = parseInt(localStorage.getItem("count")) || 0;
	saved = JSON.parse(localStorage.getItem("saved")) || [];
	updateCount();
	updateColor();
	saveEl.textContent = `Previous Entries: ${saved.join(" - ")}`;
}

/**
 * Toggle between dark and light mode.
 */
function toggleDarkMode() {
	const body = document.body;
	body.classList.toggle("dark");

	// Toggle icons between sun and moon
	themeIcon.classList.toggle("sun");
	themeIcon.classList.toggle("moon");

	// Save the theme preference
	localStorage.setItem(
		"theme",
		body.classList.contains("dark") ? "dark" : "light"
	);
}

/**
 * Apply the saved theme from localStorage on page load.
 */
function applySavedTheme() {
	const savedTheme = localStorage.getItem("theme");
	const body = document.body;
	if (savedTheme === "dark") {
		body.classList.add("dark");
		themeIcon.classList.add("moon");
		themeIcon.classList.remove("sun");
	} else {
		body.classList.remove("dark");
		themeIcon.classList.add("sun");
		themeIcon.classList.remove("moon");
	}
}

/**
 * Play sound effect for user interaction
 */
function playSound() {
	audio.play();
}

// Apply saved state and theme on page load
window.onload = () => {
	restoreState();
	applySavedTheme();
};
