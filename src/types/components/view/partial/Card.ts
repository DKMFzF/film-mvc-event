import { IClickable } from '../../base/View';

export interface ICardData {
	id: string;
	image: string;
	title: string;
}

export interface ICardSettings extends IClickable<string> {
	text: string;
	image: string;
}
