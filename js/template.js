/*jshint laxbreak:true */
(window => {
	'use strict';

	const htmlEscapes = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'\'': '&#x27;',
		'`': '&#x60;'
	};

	const escapeHtmlChar = (chr) => htmlEscapes[chr];

	const reUnescapedHtml = /[&<>"'`]/g;
	const reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

	const escape = (string) => {
		return (string && reHasUnescapedHtml.test(string))
			? string.replace(reUnescapedHtml, escapeHtmlChar)
			: string;
	};

	/**
	 * Sets up defaults for all the Template methods such as a default template
	 *
	 * @constructor
	 */
	class Template {
		constructor() {
			this.defaultTemplate
				= '<li data-id="{{id}}" class="{{completed}}">'
				+ '<div class="view">'
				+ '<input class="toggle" type="checkbox" {{checked}}>'
				+ '<label data-id="{{id}}">{{title}}</label>'
				+ '<button class="destroy"></button>'
				+ '</div>'
				+ '</li>';
		}
		/**
			* Creates an <li> HTML string and returns it for placement in your app.
			*
			* NOTE: In real life you should be using a templating engine such as Mustache
			* or Handlebars, however, this is a vanilla JS example.
			*
			* @param {object} data The object containing keys you want to find in the
			*                      template to replace.
			* @returns {string} HTML String of an <li> element
			*
			* @example
			* view.show({
			*	id: 1,
			*	title: "Hello World",
			*	completed: 0,
			* });
			*/
		show = (datas) => {
			let view = '';

			datas.forEach(data => {
				let template = this.defaultTemplate;
				let completed = '';
				let checked = '';

				if(data.completed) {
					completed = 'completed';
					checked = 'checked';
				}

				template = template.replaceAll('{{id}}', data.id);
				template = template.replace('{{title}}', escape(data.title));
				template = template.replace('{{completed}}', completed);
				template = template.replace('{{checked}}', checked);

				view = view + template;
			})
			return view;
		}
		/**
			* Displays a counter of how many to dos are left to complete
			*
			* @param {number} activeTodos The number of active todos.
			* @returns {string} String containing the count
			*/
		itemCounter = (activeTodos) => {
			const plural = activeTodos === 1 ? '' : 's';
			return '<strong>' + activeTodos + '</strong> item' + plural + ' left';
		}
		/**
			* Updates the text within the "Clear completed" button
			*
			* @param  {[type]} completedTodos The number of completed todos.
			* @returns {string} String containing the count
			*/
		clearCompletedButton = (completedTodos) => {
			return completedTodos > 0 ? 'Clear completed' : "";
		}
	}

	// Export to window
	window.app = window.app || {};
	window.app.Template = Template;
})(window);
