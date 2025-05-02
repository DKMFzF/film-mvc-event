import { View } from '../../base/View';

import { IModalData, IModalSettings } from '@/types/components/view/common/Modal';

/**
 * Отображение модального окна
 */
export class ModalView<H, C> extends View<IModalData<H, C>, IModalSettings<H, C>> {
	// модальное окно, которое сейчас открыто, оно всегда одно
	protected static _openedModal: ModalView<unknown, unknown> | null;

	protected init() {
		// слушаем клик по иконке закрыть
		this.ensure(this.settings.close).addEventListener('click', this.onCloseHandler.bind(this));
		// клик по оверлею тоже закрывает модальное окно
		this.element.addEventListener('click', this.onCloseHandler.bind(this));
		// добавляем в подвал кнопки из настроек
		this.ensure(this.settings.footer).prepend(...this.settings.actions);
	}

	protected onCloseHandler(event?: MouseEvent) {
		if (
			event &&
			// при повторном вызове ensure возвращает элемент из кеша
			![this.ensure(this.settings.close), this.element].includes(
				event.target as HTMLElement
			)
		)
			return;
		this.element.remove();
		this.element.classList.remove(this.settings.activeClass);
		if (event) {
			this.settings.onClose?.();
		}
		if (ModalView._openedModal === this) {
			// если закрывается текущее модальное окно, то обнуляем статическое поле
			ModalView._openedModal = null;
		}
	}

	protected onOpenHandler() {
		if (ModalView._openedModal) {
			ModalView._openedModal.isActive = false;
		}
		ModalView._openedModal = this;
		this.element.classList.add(this.settings.activeClass);
		document.body.append(this.element);
		this.settings.onOpen?.();
	}

	// Проброс данных во вложенные отображения
	set header(data: H | undefined) {
		console.log(`ModalView -> set header(${data})`);
		if (data) {
			this.setValue(
				this.settings.header,
				this.settings.headerView.render(data)
			);
			this.setVisibility(this.settings.header, true);
		} else {
			this.setVisibility(this.settings.header, false);
		}
	}

	// срабатывает когда включается рендер
	set content(data: C) {
		this.setValue(
			this.settings.content,
			this.settings.contentView.render(data)
		);
	}

	// Установка сообщения в модальное окно
	set message(value: string | undefined) {
		if (value) {
			this.setValue(this.settings.message, value);
			this.setVisibility(this.settings.message, true);
		} else {
			this.setVisibility(this.settings.message, false);
		}
	}

	set isError(state: boolean) {
		this.ensure(this.settings.message).classList.toggle(
			this.settings.messageErrorClass,
			!!state
		);
	}

	// Открытие и закрытие модального окна
	set isActive(state: boolean) {
		if (state) {
			this.element.classList.add(this.settings.activeClass);
			this.onOpenHandler();
		} else {
			this.element.classList.remove(this.settings.activeClass);
			this.onCloseHandler();
		}
	}
}
