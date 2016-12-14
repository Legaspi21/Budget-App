// UI Module
	// Get input values
	// add the new item to UI
	// update UI

//Data Module
	// calculate budget
	// add the new item to our data structure

// Controller Module
	// Add event handler

//BUDGET CONTROLLER
var budgetController = (function(){

})();




// UI CONTROLLER
var UIController = (function() {
	
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value'
	}

	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value
			}
		}
	}

})();



//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

	var ctrlAddItem = function() {
		// Get field input data
			var input = UICtrl.getInput();
			console.log(input);
		// add item to the budget controller

		// add the item to UI

		// Calculate budget

		// Display the budget on UI
		console.log('it works')
	}

	document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

	document.addEventListener('keypress', function(event){

		if (event.keycode === 13 || event.which === 13) {
			ctrlAddItem();
		}
		
	})

})(budgetController, UIController);



















