import { IOrderData } from '../partial/Order';
import { IHeaderData } from '../common/Header';

export interface IOrderFormData {
	contacts: IOrderData;
	header: IHeaderData;
	isActive: boolean;
	isDisabled: boolean;
	message: string;
	total: string;
	isError: boolean;
}

export interface IOrderFormSettings {
	onChange: (data: IOrderData) => void;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
}
