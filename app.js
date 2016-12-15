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
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage = function(totalIncome) {
		if(totalIncome > 0) {
			this.percentage = Math.round((this.value / totalIncome) * 100);
		} else {
			this.percentage = -1;
		}

	};

	Expense.prototype.getPercentage = function() {
		return this.percentage
	}

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var calculateTotal = function(type) {
		var sum = 0;
		data.allItems[type].forEach(function(current) {
			sum += current.value;
		});
		data.totals[type] = sum;
	};

	var data = {
		allItems: {
			expense: [],
			income: []
		},
		totals: {
			expense: 0,
			income: 0
		},
		budget: 0,
		percentage: -1
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

		deleteItem: function(type, id) {
			var ids, index;

			var ids = data.allItems[type].map(function(current) {
				return current.id;
			});

			index = ids.indexOf(id);

			if (index !== -1) {
				data.allItems[type].splice(index, 1);
			}

		},

		calculateBudget: function() {
			
			// calculate total income and expenses
			calculateTotal('expense');
			calculateTotal('income');
			// calculate the budget: income - expenses
			data.budget = data.totals.income - data.totals.expense
			// calculate the percentage of income that we spent
			if (data.totals.income > 0) {
				data.percentage = Math.round((data.totals.expense / data.totals.income) * 100)
			} else {
				data.percentage = -1;
			}
			
		},

		calculatePercentages: function() {
			data.allItems.expense.forEach(function(current) {
				current.calcPercentage(data.totals.income);
			});
		},

		getPercentages: function() {
			var allPerc = data.allItems.expense.map(function(current) {
				return current.getPercentage();
			});
			return allPerc;
		},

		getBudget: function() {
			return {
				budget: data.budget,
				totalIncome: data.totals.income,
				totalExpense: data.totals.expense,
				percentage: data.percentage
			}
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
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage',
		dateLabel: '.budget__title--month'
	};

	var formatNumber = function(num, type) {

		var numSplit, int, dec, type;

		num = Math.abs(num);
		num = num.toFixed(2);

		numSplit = num.split('.');

		int = numSplit[0];

		if (int.length > 3) {
				int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //in 2333
			}

			dec = numSplit[1];

			return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + dec;

		};

		return {
			getInput: function() {
				return {
				type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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
			newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
			// Insert the HTML
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);	
		},

		deleteListItem: function(selectorID) {

			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
		},

		clearFields: function() {

			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			});

			fieldsArr[0].focus();
		},

		displayBudget: function(obj) {
			var type;

			obj.budget > 0 ? type = 'income' : type = 'expense';
			
			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
			document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'income');
			document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExpense, 'expense');
			
			
			if (obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
		},

		displayPercentages: function(percentages) {

			var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
			
			var nodeListForEach = function(list, callback) {
				for (var i = 0; i < list.length; i++) {
					callback(list[i], i);
				}
			};

			nodeListForEach(fields, function(current, index) {

				if(percentages[index] > 0) {
					current.textContent = percentages[index] + '%';
				} else {
					current.textContent = '---';
				}
			});
		},

		displayMonth: function() {
			var now, year, month;

			now = new Date();
			
			months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

			month = now.getMonth();

			year = now.getFullYear();

			document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
			// var christmas = new Date(2016, 11, 25)

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
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
	};
	var updateBudget = function() {
		
		// Calculate budget
		budgetCtrl.calculateBudget();
		// Return the budget
		var budget = budgetCtrl.getBudget();
		// Display the budget on UI
		UICtrl.displayBudget(budget);
	};

	var updatePercentages = function() {

		// calculate percentages
		budgetCtrl.calculatePercentages();
		// read percentages from budget controller
		var percentages = budgetCtrl.getPercentages();
		// update the UI with the new percentages
		UICtrl.displayPercentages(percentages);

	};

	var ctrlAddItem = function() {
		var input, newItem;
		// Get field input data
		input = UICtrl.getInput();

		if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
			// add item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);
			// add the item to UI
			UICtrl.addListItem(newItem, input.type);
			// clear the fields
			UICtrl.clearFields();
			// calculate and update budget
			updateBudget();
			// calculate and update the percentages
			updatePercentages();
		}
		
	};

	var ctrlDeleteItem = function(event) {
		var itemID, splitID, type, ID;

		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id

		if (itemID) {
			
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);

			// Delete item from the data structure
			budgetCtrl.deleteItem(type, ID);
			// Delete the item from the UI
			UICtrl.deleteListItem(itemID);
			// Update and show the new budget
			updateBudget();

		}
	};

	return {
		init: function() {
			console.log('Application has started');
			UICtrl.displayMonth();
			UICtrl.displayBudget({
				budget: 0,
				totalIncome: 0,
				totalExpense: 0,
				percentage: 0});
			setupEventListeners();

		}
	}
})(budgetController, UIController);

controller.init();

















