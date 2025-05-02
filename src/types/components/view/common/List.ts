import { IView } from '../../base/View';

export type TElementsMap = Record<string, HTMLElement>;

export interface IItemData {
	id: string;
}

export interface IListData<T> {
	items: T[];
}

export interface IListSettings<T> {
	item: IView<T, unknown>;
	activeItemClass: string;
	itemClass: string;
}
