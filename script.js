// Creating a counter app
let saveEl = document.getElementById("save-el");
let countEl = document.getElementById("count-el");
let count = 0;
let saved;
let incrementBtn = document.getElementById("increment-btn");
let decrementBtn = document.getElementById("decrement-btn");
let saveBtn = document.getElementById("save-btn");

incrementBtn.addEventListener("click", function increment() {
  count += 1;
  if (count == 0) {
    countEl.style.color = "#000";
  } else if (count > 0) {
    countEl.style.color = "darkgreen";
  }
  displayCount();
});

decrementBtn.addEventListener("click", function decrement() {
  count -= 1;
  if (count == 0) {
    countEl.style.color = "#000";
  } else if (count < 0) {
    countEl.style.color = "darkred";
  }
  displayCount();
});

saveBtn.addEventListener("click", function save() {
  console.log(count);
  saved = count + " - ";
  saveEl.textContent += saved;
  count = 0;
  countEl.style.color = "#000"
  displayCount();
});


// const increment = () => {
//   count += 1;
//   if (count == 0) {
//     countEl.style.color = "#000";
//   } else if (count > 0) {
//     countEl.style.color = "darkgreen";
//   }
//   displayCount();
// }

// const decrement = () => {
//   count -= 1;
//   if (count == 0) {
//     countEl.style.color = "#000";
//   } else if (count < 0) {
//     countEl.style.color = "darkred";
//   }
//   displayCount();
// }

// const save = () => {
//   console.log(count);
//   saved = count + " - ";
//   saveEl.textContent += saved;
//   count = 0;
//   countEl.style.color = "#000"
//   displayCount();
// }

const displayCount = () => {
  countEl.textContent = count;
}

// // Rendering an error message
// let renderError = document.getElementById("error");
// const error = () => {
//     renderError.textContent = "Something went wrong, please try again.";
// }