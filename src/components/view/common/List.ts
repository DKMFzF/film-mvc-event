import { View } from '../../base/View';

import {
	TElementsMap,
	IItemData,
	IListData,
	IListSettings,
} from '@/types/components/view/common/List';

/**
 * Класс для отображения списка элементов
 */
export class ListView<T extends IItemData> extends View<IListData<T>, IListSettings<T>> {
	// Сохраняем элементы в объекте, где ключ - id элемента
	protected _elements: TElementsMap;

	/**
	 * Устанавливаем активный элемент
	 */
	setActiveElement(element: HTMLElement) {
		const elements = Object.values(this._elements);
		if (elements.includes(element)) {
			elements.map((element) =>
				element.classList.remove(this.settings.activeItemClass)
			);
			element.classList.add(this.settings.activeItemClass);
		}
	}

	/**
	 * Устанавливаем активный элемент по id
	 */
	setActiveItem(id: string) {
		if (this._elements[id]) {
			this.setActiveElement(this._elements[id]);
		}
	}

	/**
	 * Обновляем отображение списка элементов
	 */
	set items(items: T[]) {
		this._elements = items.reduce<TElementsMap>((result, item) => {
			// Копируем заранее настроенное отображение
			const el = this.settings.item.copy();
			
			// console.log(this.settings.item.copy());
			
			// Добавляем класс элемента
			el.element.classList.add(this.settings.itemClass);
			
			// Заполняем нужными данными и сохраняем в объекте
			result[item.id] = el.render(item); // важно: сюда передаётся item (как модель)
			return result;
		}, {});
		// console.log(this._elements); // тут уже готовый список элементов
		this.setValue(this.element, Object.values(this._elements));
	}
}
