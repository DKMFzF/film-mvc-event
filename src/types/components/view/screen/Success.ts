import { IHeaderData } from '@/types/components/view/common/Header';

export interface ISuccessData {
	content: IHeaderData;
	isActive: boolean;
}

export interface ISuccessSettings {
	onClose: () => void;
}
