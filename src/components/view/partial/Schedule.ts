import { View } from '../../base/View';
import {
	TDaySchedule,
	THallSessions,
	IScheduleData,
	TScheduleSession,
	IScheduleSettings,
} from '@/types/components/view/partial/Schedule';

/**
 * Отображение сеансов для выбранного фильма и их выбора
 */
export class ScheduleView extends View<IScheduleData, IScheduleSettings> {
	// Список сеансов
	protected _selected: TScheduleSession | null = null;
	// Список элементов для всех сеансов
	protected _times: Record<string, HTMLElement> = {};

	init() {
		this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
	}

	onSubmitHandler(event: SubmitEvent) {
		event.preventDefault();
		this.selected = {
			id: event.submitter.dataset.id,
			day: event.submitter.dataset.day,
			time: event.submitter.dataset.time,
		};
		this.settings.onSelect({ event, value: this._selected });
		return false;
	}

	protected _dayTimeKey(day: string, time: string) {
		return [day, time].join(':');
	}

	protected _createTimes(day: string, times: TDaySchedule): HTMLElement[] {
		return Object.keys(times).map((time) => {
			const timeElement = this.create(this.settings.time, {
				textContent: time,
				dataset: { day, time, id: times[time].id },
			});
			this._times[this._dayTimeKey(day, time)] = timeElement;
			return timeElement;
		});
	}

	protected _createDays(data: THallSessions): HTMLElement[] {
		return Object.keys(data).map((day) =>
			this.create(this.settings.day, {}, [
				this.create(this.settings.label, {
					textContent: day,
				}),
				...this._createTimes(day, data[day]),
			])
		);
	}

	set sessions(value: TScheduleSession[]) {
		this._times = {};
		this.setValue(this.element, this._createDays(ScheduleView.group(value)));
	}

	set selected(item: TScheduleSession) {
		Object.values(this._times).forEach((timeElement) =>
			timeElement.classList.remove(this.settings.activeClass)
		);
		if (item) {
			this._selected = item;
			this._times[this._dayTimeKey(item.day, item.time)].classList.add(
				this.settings.activeClass
			);
		} else {
			this._selected = null;
		}
	}

	render(data: IScheduleData) {
		this.sessions = data.sessions;
		this.selected = data.selected;
		return this.element;
	}

	static group(data: TScheduleSession[]) {
		return data.reduce<THallSessions>((a, c) => {
			if (!a[c.day]) a[c.day] = {};
			a[c.day][c.time] = c;
			return a;
		}, {});
	}
}
