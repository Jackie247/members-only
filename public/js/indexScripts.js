const addMessageBtn = document.getElementById("add-msg");
const modal = document.getElementById("add-msg-form");
const overlay = document.getElementById("overlay");
const closeModalBtn = document.getElementById("close-msg-btn");
const submitModalBtn = document.getElementById("submit-msg-btn");
// Function to open the modal
function openModal() {
  modal.classList.remove("hidden");
  overlay.style.display = "block";
  document.body.classList.add("modal-open");
}

// Function to close the modal
function closeModal() {
  modal.classList.add("hidden");
  overlay.style.display = "none";
  document.body.classList.remove("modal-open");
}

document.getElementById("add-msg").addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
submitModalBtn.addEventListener("click", closeModal);
// Close modal when clicking the overlay (optional)
overlay.addEventListener("click", closeModal);
