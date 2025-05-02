import { View } from '../../base/View';
import { IPageData, IPageSettings } from '@/types/components/view/partial/Page';

/**
 * Глобальный layout страницы
 */
export class PageView extends View<IPageData, IPageSettings> {
	init() {
		this.ensure(this.settings.basket).addEventListener('click', this.onClickHandler.bind(this));
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event });
	}

	// Метод для установки значения счетчика товаров в корзине
	set counter(value: number) {
		this.setValue(this.settings.counter, String(value));
	}

	// Метод для блокировки/разблокировки прокрутки страницы
	// при открытии модального окна
	set isLocked(value: boolean) {
		this.ensure(this.settings.wrapper).classList.toggle(
			this.settings.lockedClass,
			value
		);
	}
}
