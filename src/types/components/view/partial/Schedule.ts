import { TElementCreator } from '@/types/html';
import { ISelectable } from '../../base/View';

export type TScheduleSession = {
	id: string;
	day: string;
	time: string;
};

export type TDaySchedule = {
	[key: string]: TScheduleSession;
};

export type THallSessions = {
	[key: string]: TDaySchedule;
};

export interface IScheduleData {
	sessions: TScheduleSession[];
	selected: TScheduleSession | null;
}

export interface IScheduleSettings extends ISelectable<TScheduleSession> {
	time: TElementCreator;
	label: TElementCreator;
	day: TElementCreator;
	activeClass: string;
}
