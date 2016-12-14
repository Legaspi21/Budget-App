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
	
	return {
		getInput: function() {
			return {
				type: document.querySelector('.add__type').value, // will be either inc or exp
				description: document.querySelector('.add__description').value,
				value: document.querySelector('.add__value').value
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



















