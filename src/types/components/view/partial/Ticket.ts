import { IClickable } from '../../base/View';

export interface ITicketData {
	id: string;
	place: string;
	session: string;
	price: string;
}

export interface ITicketSettings extends IClickable<ITicketData> {
	place: string;
	session: string;
	price: string;
	delete: string;
}
