import { TElementCreator } from '@/types/html';
import { ISelectable } from '../../base/View';

export type TSelectedPlace = {
	row: number;
	seat: number;
};

export type THallSize = {
	rows: number;
	seats: number;
};

export interface IPlacesData {
	hall: THallSize;
	taken: string[];
	selected: TSelectedPlace[];
}

export interface IPlacesSettings extends ISelectable<TSelectedPlace[]> {
	seat: TElementCreator;
	seatsContainer: TElementCreator;
	label: TElementCreator;
	rowContainer: TElementCreator;
	rowLabel: string;
	rowSeparator: string;
	takenSeparator: string;
	activeClass: string;
}
