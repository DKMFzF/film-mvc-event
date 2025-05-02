import { TEventHandler, TEventsMap } from '@/types/components/base/EventEmitter';

export class EventEmitter {
	protected events: TEventsMap;

	constructor() {
		this.events = new Map();
	}

	on(eventName: string, handler: TEventHandler) {
		if (!this.events.has(eventName)) {
			this.events.set(eventName, new Set());
		}
		this.events.get(eventName).add(handler);
	}

	off(eventName: string, handler: TEventHandler) {
		if (this.events.has(eventName)) {
			this.events.get(eventName).delete(handler);
		}
	}

	emit(eventName: string, data: object) {
		if (this.events.has(eventName)) {
			this.events.get(eventName).forEach((handler) => {
				return handler(data);
			});
		}
	}

	reset() {
		this.events.clear();
	}

	bindEmitter(events: TEventsMap) {
		this.events = events;
	}
}
