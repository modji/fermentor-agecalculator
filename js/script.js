// grabbing the events
const submit = document.querySelectorAll(".submitButton"); // grabbing both buttons
submit.forEach((button) => {
	button.addEventListener("click", function (event) {
		event.preventDefault(); // Prevent form submission
		if (validateForm()) {
			calculateAge();
		}
	});
});

function validateForm() {
	const day = document.getElementById("day");
	const month = document.getElementById("month");
	const year = document.getElementById("year");
	let isValid = true;

	// Reset previous error messages
	resetErrorMessages();

	// Check if day is empty
	if (day.value.trim() === "") {
		displayErrorMessage(day, "This field is required");
		isValid = false;
	}

	// Check if month is empty
	if (month.value.trim() === "") {
		displayErrorMessage(month, "This field is required");
		isValid = false;
	}

	// Check if year is empty
	if (year.value.trim() === "") {
		displayErrorMessage(year, "This field is required");
		isValid = false;
	}

	return isValid;
}

function displayErrorMessage(element, message) {
	const errorElement = document.createElement("span");
	errorElement.className = "error-message block";
	errorElement.textContent = message;
	errorElement.style.color = "red";
	errorElement.style.fontSize = "0.8em";
	element.parentNode.appendChild(errorElement);
	element.style.borderColor = "red";

	// Target and style the label
	const label = document.querySelector(`label[for="${element.id}"]`);
	if (label) {
		label.style.color = "red";
	}
}

function resetErrorMessages() {
	const errorMessages = document.querySelectorAll(".error-message");
	errorMessages.forEach((msg) => msg.remove());

	const inputs = [document.getElementById("day"), document.getElementById("month"), document.getElementById("year")];
	inputs.forEach((input) => (input.style.borderColor = ""));

	const labels = [
		document.querySelector("label[for='day']"),
		document.querySelector("label[for='month']"),
		document.querySelector("label[for='year']"),
	];
	labels.forEach((label) => (label.style.color = ""));
}

function calculateAge() {
	const date = new Date();
	const currentYear = date.getFullYear();
	const currentMonth = date.getMonth() + 1;
	const currentDay = date.getDate();

	// grabbing the elements
	const day = document.getElementById("day");
	const month = document.getElementById("month");
	const year = document.getElementById("year");

	let ageYear = currentYear - year.value;
	let ageMonth = currentMonth - month.value;
	let ageDay = currentDay - day.value;

	// Adjust the age if the birthday has already yet to occuer this year
	if (currentMonth < month.value || (currentMonth === month.value && currentDay < day.value)) {
		ageYear--;
	}

	// Adjust for negative days
	if (ageDay < 0) {
		ageMonth--;
		// Get the last day of the previous month
		const lastMonth = new Date(currentYear, currentMonth - 1, 0);
		ageDay += lastMonth.getDate();
	}

	// Adjust for negative months
	if (ageMonth < 0) {
		ageYear--;
		ageMonth += 12;
	}

	document.getElementById("ageYear").innerHTML = ageYear;
	document.getElementById("ageMonth").innerHTML = ageMonth;
	document.getElementById("ageDay").innerHTML = ageDay;
}
