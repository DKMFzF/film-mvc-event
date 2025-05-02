import { AppStateModals } from '@/types/components/model/AppState';

// Для корректной обработки событий открытия и закрытия модальных окон
// нам нужно знать предыдущее и текущее состояние.
export type TModalChange = {
	previous: AppStateModals;
	current: AppStateModals;
};
