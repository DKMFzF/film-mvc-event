import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru-ru');

import { Api } from '../base/Api';
import type {
	TApiListResponse,
	IMovie,
	ISession,
	Order,
	OrderResult,
	IFilmAPI,
} from '@/types/components/model/FilmApi';

/**
 * Класс для работы с API фильмов
 */
export class FilmAPI extends Api implements IFilmAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	/**
	 * Получить список сеансов фильма
	 * @param id
	 */
	async getFilmSchedule(id: string): Promise<ISession[]> {
		const data = await this._get<TApiListResponse<ISession>>(
			`/films/${id}/schedule`
		);
		return data.items.map((schedule) => {
			const daytime = dayjs(schedule.daytime);
			return {
				...schedule,
				film: id,
				day: daytime.format('D MMMM'),
				time: daytime.format('HH:mm'),
			};
		});
	}

	/**
	 * Получить список фильмов
	 */
	async getFilms(): Promise<IMovie[]> {
		const data = await this._get<TApiListResponse<IMovie>>('/films');
		return data.items.map((item) => ({
			...item,
			image: this.cdn + item.image,
			cover: this.cdn + item.cover,
		}));
	}

	/**
	 * Забронировать билеты
	 * @param order - данные для бронирования
	 * @param order.tickets - список билетов, для каждого требуются как минимум поля film, session, row, seat
	 * @param order.email - email пользователя
	 * @param order.phone - телефон пользователя
	 */
	async orderTickets(order: Order): Promise<OrderResult[]> {
		const data = await this._post<TApiListResponse<OrderResult>>(
			'/order',
			order
		);
		return data.items.map((ticket) => {
			const daytime = dayjs(ticket.daytime);
			return {
				...ticket,
				day: daytime.format('D MMMM'),
				time: daytime.format('HH:mm'),
			};
		});
	}
}
