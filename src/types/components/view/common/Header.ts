import { IClickable } from '../../base/View';

export interface IHeaderData {
	title: string;
	description: string;
	action?: string;
}

export interface IHeaderSettings extends IClickable<never> {
	action: string;
	title: string;
	description: string;
}
