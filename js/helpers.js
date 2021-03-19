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
	// $parent(qs('a'), 'div');
	window.$parent = (element, tagName) => {
		// console.log('Element found: ', element);
		// console.log('Tagname found: ', tagName);

		if(!element.parentNode) {
			// console.log('helper 1st');
			return
		} else if(element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			// console.log('helper 2nd: ', element.parentNode);
			return element.parentNode;
		} else {
			// console.log('helper 3rd: ', element.parentNode, ', ', tagName);
			return window.$parent(element.parentNode, tagName);
		}
		// if(!element.parentNode) return;
		// if(element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) return element.parentNode;
		// return window.$parent(element.parentNode, tagName);
	};

	// Allow for looping on nodes by chaining:
	// qsa('.foo').forEach(function () {})
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
