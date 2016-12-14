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
	
	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}

})();

// UI CONTROLLER
var UIController = (function() {
	
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	};

	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value
			};
		},
		getDOMstrings: function() {
			return DOMstrings;
		}
	}

})();



//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

	var setupEventListeners = function() {

		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event){

			if (event.keycode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
	};

	var ctrlAddItem = function() {
		// Get field input data
		var input = UICtrl.getInput();
		// add item to the budget controller

		// add the item to UI

		// Calculate budget

		// Display the budget on UI
	};

	return {
		init: function() {
			console.log('Application has started');
			setupEventListeners();
		}
	}
})(budgetController, UIController);

controller.init();

















