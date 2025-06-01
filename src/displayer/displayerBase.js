export default class DisplayerBase {
	_container;

	constructor(container) {
		this._container = container;
	}

	_invokeListener(listener, ...args) {
		if (listener !== null) {
			listener(...args);
		}
	}

	_resetContainer() {
		while (this._container.firstChild) {
			this._container.removeChild(this._container.lastChild);
		}
	}

	show() {
		this._resetContainer();
	}
}
