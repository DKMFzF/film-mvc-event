import { IView } from '../../base/View';

export interface IModalData<H, C> {
	header?: H;
	content: C;
	message?: string;
	isActive: boolean;
	isError?: boolean;
}

export interface IModalSettings<H, C> {
	close: string;
	header: string;
	content: string;
	footer: string;
	message: string;
	headerView: IView<H>;
	contentView: IView<C>;

	actions: HTMLElement[];
	
	activeClass: string;
	messageErrorClass: string;
	onOpen?: () => void;
	onClose?: () => void;
}
