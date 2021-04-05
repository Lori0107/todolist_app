/*global NodeList */
(window => {
	'use strict';

	// Get element(s) by CSS selector:
	// Refacto pour ne plus utiliser le scope de l'élément
	window.qs = (selector, scope) => {
		if(scope) console.log("SCOPE - ", scope);
		return (scope || document).querySelector(selector);
	};
	window.qsa = (selector, scope) => (scope || document).querySelectorAll(selector);

	// addEventListener wrapper:
	window.$on = (target, type, callback, useCapture) => {
		target.addEventListener(type, callback, !!useCapture)
	};

	// Attach a handler to event for all elements that match the selector,
	// now or in the future, based on a root element
	window.$delegate = (target, selector, type, handler) => {
		const dispatchEvent = (event) => {
			const targetElement = event.target;
			const potentialElements = window.qsa(selector, target);
			const hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if(hasMatch) handler.call(targetElement, event);
		}

		// https://developer.mozilla.org/en-US/docs/Web/Events/blur
		const useCapture = type === 'blur' || type === 'focus';

		window.$on(target, type, dispatchEvent, useCapture);
	};

	// Find the element's parent with the given tag name:
	window.$parent = (element, tagName) => {
		if(!element.parentNode) {
			return
		} else if(element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		} else {
			return window.$parent(element.parentNode, tagName);
		}
	};

	// Allow for looping on nodes by chaining:
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
