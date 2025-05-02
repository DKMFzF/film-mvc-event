import { IHeaderData } from '@/types/components/view/common/Header';
import { ITicketData } from '@/types/components/view/partial/Ticket';

export interface IBasketData {
	tickets: ITicketData[];
	header: IHeaderData;
	isActive: boolean;
	isDisabled: boolean;
	total: string;
}

export interface IBasketSettings {
	onRemove: (id: string) => void;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
}
