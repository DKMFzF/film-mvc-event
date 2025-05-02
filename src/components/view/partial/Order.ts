import { View } from '../../base/View';
import {
	IOrderData,
	IOrderSettings,
} from '@/types/components/view/partial/Order';

/**
 * Форма заказа
 */
export class OrderView extends View<IOrderData, IOrderSettings> {
	init() {
		this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
		this.element.addEventListener('change', this.onSubmitHandler.bind(this));
	}

	onSubmitHandler(event: SubmitEvent) {
		event.preventDefault();
		this.settings.onChange({ event, value: this.data });
		return false;
	}

	set email(value: string) {
		this.setValue<HTMLInputElement>(this.settings.email, {
			value,
		});
	}

	set phone(value: string) {
		this.setValue<HTMLInputElement>(this.settings.phone, {
			value,
		});
	}

	get data() {
		return {
			email: this.ensure<HTMLInputElement>(this.settings.email).value,
			phone: this.ensure<HTMLInputElement>(this.settings.phone).value,
		};
	}
}
