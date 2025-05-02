import { IChangeable } from '../../base/View';

export interface IOrderData {
	email: string;
	phone: string;
}

export interface IOrderSettings extends IChangeable<IOrderData> {
	email: string;
	phone: string;
}
