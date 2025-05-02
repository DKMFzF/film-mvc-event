import {
	TElementChild,
	TElementProps,
	TElementValue,
	TSelectorElement,
} from '@/types/html';
import {
	createElement,
	ensureElement,
	setElementChildren,
	setElementProps,
} from '@/utils/html';
import { isChildElement, isPlainObject, isSelector } from '@/utils';
import { IView } from '@/types/components/base/View';

/**
 * Базовое отображение для вьюшек
 */
export abstract class View<T, S extends object> implements IView<T, S> {
	// при копировании создавать дочерний класс, не зная его имени
	['constructor']!: new (root: HTMLElement, settings: S) => this;
	// кеш чтобы не пересоздавать и не искать повторно элементы
	protected cache: Record<string, HTMLElement> = {};

	constructor(public element: HTMLElement, protected readonly settings: S) {
		this.init();
		if (!this.element) {
			throw new Error('Element is not defined');
		}
	}

	// копирующий конструктор, чтобы настроить один раз
	// и дальше использовать копии отображения везде
	copy(settings?: S) {
		return new this.constructor(
			this.element.cloneNode(true) as HTMLElement,
			Object.assign({}, this.settings, settings ?? {})
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected init() {} // метод жизненного цикла

	// рендер, вызывается когда надо обновить отображение с данными
	render(data: Partial<T>): HTMLElement {
		if (typeof data === 'object') {
			Object.assign(this, data);
		}
		return this.element;
	}

	protected ensure<T extends HTMLElement>(
		query?: TSelectorElement<T>,
		root: HTMLElement = this.element
	): T {
		if (!isSelector(query)) {
			return ensureElement(query);
		} else {
			if (!this.cache[query]) {
				this.cache[query] = ensureElement(query, root);
			}
			return this.cache[query] as T;
		}
	}

	// замена элемента на другой или его обновлённую версию
	// с проверкой существования обоих
	protected setElement<T extends HTMLElement>(
		query: TSelectorElement<T>,
		value: HTMLElement
	) {
		const el = this.ensure(query);
		el.replaceWith(value);
	}

	// полезные методы которые упрощают дизнь вьюшки
	
	protected ensureTemplate(query: string) {
		const el = this.ensure(query);
		el.remove();
		return el.cloneNode(true) as HTMLElement;
	}

	protected create<T extends HTMLElement>(
		settings:
			| [keyof HTMLElementTagNameMap, TElementProps<T>]
			| keyof HTMLElementTagNameMap,
		props?: TElementProps<T>,
		children?: TElementChild
	): T {
		if (typeof settings === 'string')
			return createElement<T>(settings, props, children);
		else if (Array.isArray(settings)) {
			return createElement<T>(
				settings[0],
				{
					...settings[1],
					...(props ?? {}),
				},
				children
			);
		} else throw new Error('Unknown create settings');
	}

	setVisibility<T extends HTMLElement>(
		query: TSelectorElement<T>,
		isVisible: boolean
	) {
		const el = this.ensure(query);
		if (isVisible) el.style.removeProperty('display');
		else el.style.setProperty('display', 'none');
	}

	protected setValue<T extends HTMLElement>(
		query: TSelectorElement<T>,
		value: TElementValue<T>
	) {
		const el = query instanceof HTMLElement ? query : this.ensure(query);
		if (typeof value === 'string') el.textContent = value;
		else if (isChildElement(value)) setElementChildren(el, value);
		else if (isPlainObject(value)) {
			setElementProps<T>(el, value as TElementProps<T>);
		} else {
			throw new Error('Unknown value type');
		}
	}
}
