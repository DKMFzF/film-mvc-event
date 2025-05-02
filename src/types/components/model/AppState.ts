import {
	IContacts,
	IFilmAPI,
	IMovie,
	Order,
	OrderResult,
	ISession,
	ITicket,
} from './FilmApi';

// Такие данные нам нужны, чтобы сформировать временный уникальный ключ билета
export type TTicketData = {
	film: string;
	session: string;
	row: number;
	seat: number;
};

// Полное описание билета, которое будет храниться в корзине и в localStorage
export type TBasketTicket = TTicketData & {
	id: string;
	title: string;
	daytime: string;
	day: string;
	time: string;
	price: number;
};

// Форматированные данные билета для отображения в корзине
export type TTicketDescription = {
	id: string;
	place: string;
	session: string;
	price: string;
};

// Краткое описание фильма для отображения в модальных окнах
export type TMovieDescription = {
	title: string;
	day: string;
	time: string;
};

// Место в зале
export type THallPlace = {
	row: number;
	seat: number;
};

// Какие модальные окна у нас есть
export enum AppStateModals {
	session = 'modal:session',
	place = 'modal:place',
	basket = 'modal:basket',
	contacts = 'modal:contacts',
	success = 'modal:success',
	none = 'modal:none',
}

// Какие изменения состояния приложения могут происходить
export enum AppStateChanges {
	movies = 'change:movie',
	modal = 'change:modal',
	modalMessage = 'change:modalMessage',
	selectedMovie = 'change:selectedMovie',
	sessions = 'change:sessions',
	selectedSession = 'change:selectedSession',
	basket = 'change:basket',
	order = 'change:order',
}

// Состояние приложения, которое мы будем хранить в localStorage
export type TPersistedState = {
	tickets: TBasketTicket[];
	contacts: IContacts;
};

// Модель данных приложения
export interface IAppState {
	// Загружаемые с сервера данные
	movies: Map<string, IMovie>;
	movieSessions: Map<string, ISession>;

	// Заполняемые пользователем данные
	selectedMovie: IMovie | null;
	selectedSession: ISession | null;
	basket: Map<string, TBasketTicket>;
	basketTotal: number;
	contacts: IContacts;
	tickets: ITicket[];
	order: Order;

	// Состояние интерфейса
	openedModal: AppStateModals;
	isOrderReady: boolean;
	modalMessage: string | null;
	isError: boolean;

	// Действия с API
	loadMovies(): Promise<void>;
	loadSchedule(id: string): Promise<void>;
	orderTickets(): Promise<OrderResult[]>;

	// Действия с localStorage
	restoreState(): void;
	persistState(): void;

	// Пользовательские действия
	selectMovie(id: string): void;
	selectSession(id: string): void;
	selectPlaces(selected: THallPlace[]): void;
	removeTicket(id: string): void;
	fillContacts(contacts: Partial<IContacts>): void;
	isValidContacts(): boolean;

	// Вспомогательные методы
	getBasketMovie(): TMovieDescription | null;
	formatMovieDescription(movie: TMovieDescription): string;
	formatTicketDescription(ticket: TBasketTicket): TTicketDescription;
	formatCurrency(value: number): string;

	// Методы для работы с модальными окнами
	openModal(modal: AppStateModals): void;
	setMessage(message: string | null, isError: boolean): void;
}

// Настройки модели данных
export interface IAppStateSettings {
	formatCurrency: (value: number) => string;
	storageKey: string;
	// Функция, которая будет вызываться при изменении состояния
	onChange: (changed: AppStateChanges) => void;
}

// Конструктор модели данных
export interface IAppStateConstructor {
	new (api: IFilmAPI, settings: IAppStateSettings): IAppState;
}
