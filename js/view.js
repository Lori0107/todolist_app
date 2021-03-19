/*global qs, qsa, $on, $parent, $delegate */

(window => {
	'use strict';

	/**
	 * View that abstracts away the browser's DOM completely.
	 * It has two simple entry points:
	 *
	 *   - bind(eventName, handler)
	 *     Takes a todo application event and registers the handler
	 *   - render(command, parameterObject)
	 *     Renders the given command with the options
	 */
	class View {
		constructor(template) {
			this.template = template;

			this.ENTER_KEY = 13;
			this.ESCAPE_KEY = 27;

			this.$todoList = document.querySelector('.todo-list');
			this.$todoItemCounter = document.querySelector('.todo-count');
			this.$clearCompleted = document.querySelector('.clear-completed');
			this.$main = document.querySelector('.main');
			this.$footer = document.querySelector('.footer');
			this.$toggleAll = document.querySelector('.toggle-all');
			this.$newTodo = document.querySelector('.new-todo');
		}
		_removeItem = (id) => {
			const elem = document.querySelector('[data-id="' + id + '"]');
			if(elem) this.$todoList.removeChild(elem);
		}
		_clearCompletedButton = (completedCount, visible) => {
			this.$clearCompleted.innerHTML = this.template.clearCompletedButton(completedCount);
			this.$clearCompleted.style.display = visible ? 'block' : 'none';
		}
		_setFilter = (currentPage) => {
			document.querySelector('.filters .selected').className = '';
			document.querySelector('.filters [href="#/' + currentPage + '"]').className = 'selected';
		}
		_elementComplete = (id, completed) => {
			const listItem = document.querySelector('[data-id="' + id + '"]');
			if(!listItem) return;
			listItem.className = completed ? 'completed' : '';

			// In case it was toggled from an event and not by clicking the checkbox
			document.querySelector('[data-id="' + id + '"] .toggle').checked = completed;
		}
		_editItem = (id, title) => {
			const listItem = document.querySelector('[data-id="' + id + '"]');

			if(!listItem) return;

			listItem.className = listItem.className + ' editing';

			const input = document.createElement('input');
			input.className = 'edit';

			listItem.appendChild(input);
			input.focus();
			input.value = title;
		}
		_editItemDone = (id, title) => {
			const listItem = document.querySelector(`[data-id="${id}"]`);

			if(!listItem) return;

			const input = document.querySelector('input.edit', listItem);
			listItem.removeChild(input);
			listItem.className = listItem.className.replace('editing', '');
			document.querySelector(`label[data-id="${id}"]`).textContent = title
		}
		render = (viewCmd, parameter) => {
			const viewCommands = {
				showEntries: () => {
					this.$todoList.innerHTML = this.template.show(parameter);
				},
				removeItem: () => {
					this._removeItem(parameter);
				},
				updateElementCount: () => {
					this.$todoItemCounter.innerHTML = this.template.itemCounter(parameter);
				},
				clearCompletedButton: () => {
					this._clearCompletedButton(parameter.completed, parameter.visible);
				},
				contentBlockVisibility: () => {
					this.$main.style.display = this.$footer.style.display = parameter.visible ? 'block' : 'none';
				},
				toggleAll: () => {
					this.$toggleAll.checked = parameter.checked;
				},
				setFilter: () => {
					this._setFilter(parameter);
				},
				clearNewTodo: () => {
					this.$newTodo.value = '';
				},
				elementComplete: () => {
					this._elementComplete(parameter.id, parameter.completed);
				},
				editItem: () => {
					this._editItem(parameter.id, parameter.title);
				},
				editItemDone: () => {
					this._editItemDone(parameter.id, parameter.title);
				}
			};
			viewCommands[viewCmd]();
		}
		_itemId = (element) => {
			const li = $parent(element, 'li');
			return li.dataset.id;
		}
		_bindItemEditDone = (handler) => {
			const self = this;
			
			$delegate(self.$todoList, 'li .edit', 'blur', function () {
				if (!this.dataset.iscanceled) {
					handler({
						id: self._itemId(this),
						title: this.value
					});
				}
			});

			$delegate(self.$todoList, 'li .edit', 'keypress', function (event) {
				if(event.keyCode === self.ENTER_KEY) {
					// Remove the cursor from the input when you hit enter just like ifit
					// were a real form
					this.blur();
				}
			});
		}
		_bindItemEditCancel(handler) {
			const self = this;

			$delegate(self.$todoList, 'li .edit', 'keyup', function (event) {
				if(event.keyCode === self.ESCAPE_KEY) {
					this.dataset.iscanceled = true;
					this.blur();
					handler({ id: self._itemId(this) });
				}
			});
		}
		bind = (event, handler) => {
			const self = this;
			switch(event) {
				case "newTodo":
					$on(this.$newTodo, 'change', () => {
						handler(this.$newTodo.value);
					});
					break;
				case "removeCompleted":
					$on(this.$clearCompleted, 'click', () => {
						handler();
					});
					break;
				case "toggleAll":
					$on(this.$toggleAll, 'click', function () {
						// Quand est-il utilisé ???
						handler({ completed: this.checked });
					});
					break;
				case "itemEdit":
					$delegate(this.$todoList, 'li label', 'dblclick', function () {
						handler({ id: self._itemId(this) });
					});
					break;
				case "itemRemove":
					$delegate(this.$todoList, '.destroy', 'click', function () {
						handler({ id: self._itemId(this) });
					});
					break;
				case "itemToggle":
					$delegate(this.$todoList, '.toggle', 'click', function () {
						handler({
							id: self._itemId(this),
							completed: this.checked
						});
					});
					break;
				case "itemEditDone":
					this._bindItemEditDone(handler);
					break;
				case "itemEditCancel":
					this._bindItemEditCancel(handler);
					break;
			}
		}
	}

	// Export to window
	window.app = window.app || {};
	window.app.View = View;
})(window);
