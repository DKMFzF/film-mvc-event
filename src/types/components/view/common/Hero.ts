import { IClickable } from '../../base/View';
import { IView } from '../../base/View';

export interface IHeroData<T> {
	cover: string;
	content: T;
}

export interface IHeroSettings<T> extends IClickable<T> {
	action: string;
	background: string;
	content: string;
	contentView: IView<T>;
}
