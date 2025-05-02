export type TApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export interface IMovie {
	id: string;
	rating: number;
	director: string;
	tags: string[];
	title: string;
	about: string;
	description: string;
	image: string;
	cover: string;
}

export interface ISession {
	id: string;
	film: string;
	daytime: string;
	day: string;
	time: string;
	hall: string;
	rows: number;
	seats: number;
	price: number;
	taken: string[];
}

export interface ITicket {
	film: string;
	session: string;
	daytime: string;
	day: string;
	time: string;
	row: number;
	seat: number;
	price: number;
}

// Создание тела для запроса в API
export interface IContacts {
	email: string;
	phone: string;
}

export interface Order extends IContacts {
	tickets: ITicket[];
}

// Что получим с API
export interface OrderResult extends ITicket {
	id: string;
}

// Методы работы с API
export interface IFilmAPI {
	getFilms: () => Promise<IMovie[]>;
	getFilmSchedule: (id: string) => Promise<ISession[]>;
	orderTickets: (order: Order) => Promise<OrderResult[]>;
}
