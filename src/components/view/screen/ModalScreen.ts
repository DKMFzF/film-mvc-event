import { Screen } from '@/components/base/Screen';
import { cloneTemplate } from '@/utils/html';
import { SETTINGS } from '@/utils/constants';
import { TElementCreator } from '@/types/html';

import { ModalView } from '@/components/view/common/Modal';
import { ButtonView } from '@/components/view/common/Button';
import { IView } from '@/types/components/base/View';
import { IModalScreenSettings } from '@/types/components/view/screen/ModalScreen';

/**
 * Общая логика и структура модальных окон
 */
export abstract class ModalScreen<
	Header, // данные для заголовка
	Main, // внутренние данные для контента модального окна
	C, // внешние данные для экрана
	S extends IModalScreenSettings // настройки экрана (обработчики событий
> extends Screen<C, S> {
	// модальное окно
	protected declare modal: ModalView<Header, Main>;
	// кнопка "Далее"
	protected declare nextButton: HTMLButtonElement;

	// Абстрактные методы для реализации в дочерних классах

	abstract initHeader(): IView<Header>;

	abstract initContent(): IView<Main>;

	// Переопределенный init() для инициализации модального окна
	protected init() {
		this.nextButton = this.getNextButton(SETTINGS.basketModal, this.settings.onNext);

		this.modal = this.getModalView({ headerView: this.initHeader(), contentView: this.initContent() }, this.settings.onClose);

		// console.log(this.modal);

		this.element = this.modal.element;
		console.log(this.element)
	}

	// Вспомогательные методы

	protected getNextButton(
		settings: { 
			nextLabel: string; 
			nextSettings: TElementCreator 
		},
		onClick: () => void
	) {
		return ButtonView.make<HTMLButtonElement>(
			settings.nextLabel,
			settings.nextSettings,
			onClick
		);
	}

	protected getModalView(
		settings: { headerView: IView<Header>; contentView: IView<Main> },
		onClose: () => void
	) {
		return new ModalView<Header, Main>(cloneTemplate(SETTINGS.modalTemplate), {
			...SETTINGS.modalSettings,
			...settings,
			actions: [this.nextButton],
			onClose,
		});
	}

	// Методы установки данных

	set header(value: Header) {
		this.modal.header = value;
	}

	set content(value: Main) {
		this.modal.content = value;
	}

	set isActive(value: boolean) {
		this.modal.isActive = value;
	}

	set message(value: string) {
		this.modal.message = value;
	}

	set isError(value: boolean) {
		this.modal.isError = value;
	}

	set isDisabled(state: boolean) {
		this.nextButton.disabled = state;
	}
}
