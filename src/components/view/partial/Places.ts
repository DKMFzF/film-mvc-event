import { View } from '../../base/View';
import {
	THallSize,
	IPlacesData,
	IPlacesSettings,
	TSelectedPlace,
} from '@/types/components/view/partial/Places';

/**
 * Отображение мест в зале и их выбор
 */
export class PlacesView extends View<IPlacesData, IPlacesSettings> {
	// Список выбранных мест
	protected _selected: Set<string> = new Set();
	// Список элементов для всех мест в зале
	protected _seats: Record<string, HTMLButtonElement> = {};

	init() {
		// вместо обработчиков на всех кнопках слушаем один на форме
		this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
	}

	// Обработчик клика на место
	onSubmitHandler(event: SubmitEvent) {
		event.preventDefault();
		const key = this._getSeatKey(
			Number(event.submitter.dataset.row),
			Number(event.submitter.dataset.seat)
		);
		if (this._selected.has(key)) this._selected.delete(key);
		else this._selected.add(key);
		this.settings.onSelect({ event, value: this.selected });
		return false;
	}

	// Вспомогательные методы для построения сетки мест в зале

	protected _getSeatKey(row: number, seat: number) {
		return [row, seat].join(this.settings.takenSeparator);
	}

	protected _createSeat(row: number, seat: number) {
		const el = this.create<HTMLButtonElement>(this.settings.seat, {
			textContent: String(seat),
			dataset: {
				row,
				seat,
			},
		});
		this._seats[this._getSeatKey(row, seat)] = el;
		return el;
	}

	protected _createRow(row: number, seats: number) {
		return this.create(this.settings.rowContainer, {}, [
			this.create(this.settings.label, {
				textContent: [this.settings.rowLabel, row].join(
					this.settings.rowSeparator
				),
			}),
			this.create(
				this.settings.seatsContainer,
				{},
				Array(seats)
					.fill(0)
					.map((_, index) => this._createSeat(row, index + 1))
			),
		]);
	}

	// Методы для управления отображением мест в зале

	set hall({ rows, seats }: THallSize) {
		this.setValue(
			this.element,
			Array(rows)
				.fill(0)
				.map((_, index) => this._createRow(index + 1, seats))
		);
	}

	set taken(takenSeats: string[]) {
		Object.values(this._seats).forEach(
			(seatElement) => (seatElement.disabled = false)
		);
		takenSeats.forEach((key) => (this._seats[key].disabled = true));
	}

	set selected(seats: TSelectedPlace[]) {
		this._selected = new Set(seats.map((place) => this._getSeatKey(place.row, place.seat)));
		Object.values(this._seats).forEach((seatElement) =>
			seatElement.classList.remove(this.settings.activeClass)
		);
		this._selected.forEach((key) => {
			this._seats[key].classList.add(this.settings.activeClass);
		});
	}

	get selected() {
		return [...this._selected.values()].map((key) => {
			const [row, seat] = key.split(this.settings.takenSeparator);
			return {
				row: Number(row),
				seat: Number(seat),
			};
		});
	}

	render(data: IPlacesData) {
		// в этой реализации компонента важен порядок установки поэтому переопределяем метод
		if (data.hall) this.hall = data.hall;
		if (data.taken) this.taken = data.taken;
		if (data.selected && Object.keys(this._seats).length)
			this.selected = data.selected;
		return this.element;
	}
}
