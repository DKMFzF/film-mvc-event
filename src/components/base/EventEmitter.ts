import { TEventHandler, TEventsMap } from '@/types/components/base/EventEmitter';

export class EventEmitter {
	protected events: TEventsMap;

	constructor() {
		this.events = new Map();
	}

	// подписка
	on(eventName: string, handler: TEventHandler) {
		if (!this.events.has(eventName)) {
			this.events.set(eventName, new Set());
		}
		this.events.get(eventName).add(handler);
	}

	// отписка
	off(eventName: string, handler: TEventHandler) {
		if (this.events.has(eventName)) {
			this.events.get(eventName).delete(handler);
		}
	}

	emit(eventName: string, data: object) {
		if (this.events.has(eventName)) {
			this.events.get(eventName).forEach((handler) => { // проходит по всем обработчикам
				return handler(data); // срабатывает обработчик
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
