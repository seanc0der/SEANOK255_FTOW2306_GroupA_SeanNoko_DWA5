/**
 * Converts a string literal to a number and checks if it's a valid number.
 *
 * @param {string} value - A string representing user input for dividend and divider fields.
 * @returns {boolean} `true` if the value is a valid number, `false` if it's `NaN`.
 */
const isNumber = (value) => {
	const valueAsNumber = Number(value);
	return !Number.isNaN(valueAsNumber);
};

/**
 * Performs division on the `dividend` and `divider` arguments and and displays
 * the result on the parsed HTML Element (`resultsElement`). The function also
 * performs custom error checks and handles them appropriately should the
 * division operands (`dividend` and `divider`) not conform to specific rules.
 * If the user's parsed values trigger any of the custom errors, the respective
 * error message will be displayed to the user instead of the quotient.
 * Additionally, for certain errors, call stacks will be printed to the console.
 * However, one specific error will halt the app and prevent the user from
 * performing any further division until they reload their page.
 *
 * @param {string} dividend - The user's input as a dividend.
 * @param {string} divider - The user's input as a divider.
 * @param {Element} resultsElement - The element wherein the quotient or error message will be displayed to the user.
 */
const divisionCalc = (dividend, divider, resultsElement) => {
	const error = {
		noInput:
			"Divison not performed. Both values are required in inputs. Try again",
		invalidInput: "Division not performed. Invalid number provided. Try Again",
		critical: "Something critical went wrong. Please reload the page",
	};

	try {
		if (dividend === "" || divider === "") {
			throw new Error(error.noInput);
		}

		if (Number(dividend) < 0 || Number(divider) < 0) {
			throw new Error(error.invalidInput);
		}

		if (!isNumber(dividend) || !isNumber(divider)) {
			throw new Error(error.critical);
		}

		resultsElement.innerText = Math.floor(dividend / divider);
	} catch (err) {
		const isNoInputError = err.message === error.noInput;
		const isInvalidInputError = err.message === error.invalidInput;
		const isCriticalError = err.message === error.critical;

		if (isNoInputError || isInvalidInputError) {
			result.textContent = err.message;
		}

		if (isInvalidInputError || isCriticalError) console.log(err);

		if (isCriticalError) {
			document.body.innerHTML = error.critical;
		}
	}
};

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const entries = new FormData(event.target);
	const { dividend, divider } = Object.fromEntries(entries);
	divisionCalc(dividend, divider, result);
});
