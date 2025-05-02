import { IFilmData } from '@/types/components/view/partial/Film';
import { IScheduleData } from '@/types/components/view/partial/Schedule';

export interface ISelectSessionData {
	film: IFilmData;
	schedule: Partial<IScheduleData>;
	isActive: boolean;
	isDisabled: boolean;
}

export interface ISelectSessionSettings {
	onSelect: (id: string) => void;
	onNext: () => void;
	onClose: () => void;
}
