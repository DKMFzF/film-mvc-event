import { IHeaderData } from '../common/Header';
import { IPlacesData, TSelectedPlace } from '../partial/Places';

export interface ISelectPlacesData {
	places: Partial<IPlacesData>;
	header: IHeaderData;
	isActive: boolean;
	isDisabled: boolean;
}

export interface ISelectPlacesSettings {
	onSelect: (places: TSelectedPlace[]) => void;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
}
