import { View } from '../../base/View';
import {
	ITicketData,
	ITicketSettings,
} from '@/types/components/view/partial/Ticket';

/**
 * Отображение билета в корзине
 */
export class TicketView extends View<ITicketData, ITicketSettings> {
	protected _item!: ITicketData;

	init() {
		this.ensure(this.settings.delete).addEventListener(
			'click',
			this.onClickHandler.bind(this)
		);
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event, item: this._item });
	}

	set place(value: string) {
		this.setValue(this.settings.place, value);
	}

	set session(value: string) {
		this.setValue(this.settings.session, value);
	}

	set price(value: string) {
		this.setValue(this.settings.price, value);
	}

	render(data: ITicketData) {
		this._item = data;
		return super.render(data);
	}
}
