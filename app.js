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
	};

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {
		allItems: {
			expense: [],
			income: []
		},
		totals: {
			expense: 0,
			income: 0
		}
	};

	return {
		addItem: function(type, des, val) {
			var newItem, ID;
			// create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}
			
			
			//Create new item
			if (type === 'expense') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'income') {
				newItem = new Income(ID, des, val);
			}
			
			// Push it into data structure
			data.allItems[type].push(newItem);
			return newItem;
		},
		testing:function() {
			console.log(data)
		}
	};

})();

// UI CONTROLLER
var UIController = (function() {
	
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	};

	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value
			};
		},

		addListItem: function(obj,type) {
			var html, newHtml,element, fields, fieldsArr;
			// Create html string with placeholder text
				if (type == 'income') {
					element = DOMstrings.incomeContainer;
					html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
				} else if (type === 'expense') {
					element = DOMstrings.expensesContainer;
					html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
				}     
			// Replace the placeholder text with some actual data
					newHtml = html.replace('%id%', obj.id);
					newHtml = newHtml.replace('%description%', obj.description);
					newHtml = newHtml.replace('%value%', obj.value);
			// Insert the HTML
				document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);	
		},

		clearFields: function() {
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			});

			fieldsArr[0].focus();
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
	var updateBudget = function() {
		
		// Calculate budget

		// Return the budget

		// Display the budget on UI

	};

	var ctrlAddItem = function() {
		var input, newItem;
		// Get field input data
		input = UICtrl.getInput();
		// add item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		// add the item to UI
		UICtrl.addListItem(newItem, input.type);
		// clear the fields
		UICtrl.clearFields();
		// calculate and update budget
		updateBudget();
		
	};

	return {
		init: function() {
			console.log('Application has started');
			setupEventListeners();
		}
	}
})(budgetController, UIController);

controller.init();

















