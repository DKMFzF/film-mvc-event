import { IClickable } from '../../base/View';

export interface IPageData {
	counter: number;
	isLocked: boolean;
}

export interface IPageSettings extends IClickable<never> {
	wrapper: string;
	counter: string;
	basket: string;
	lockedClass: string;
}
