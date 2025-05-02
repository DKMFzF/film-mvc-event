import {
	IContacts,
	IFilmAPI,
	IMovie,
	Order,
	OrderResult,
	ISession,
	ITicket,
} from '@/types/components/model/FilmApi';
import {
	IAppState,
	AppStateChanges,
	AppStateModals,
	IAppStateSettings,
	TBasketTicket,
	THallPlace,
	TMovieDescription,
	TPersistedState,
	TTicketData,
	TTicketDescription,
} from '@/types/components/model/AppState';

export class AppStateModel implements IAppState {
	private _selectedMovie: string | null = null;
	private _selectedSession: string | null = null;
	basket: Map<string, TBasketTicket> = new Map<string, TBasketTicket>();

	movies: Map<string, IMovie> = new Map<string, IMovie>();
	movieSessions: Map<string, ISession> = new Map<string, ISession>();
	contacts: IContacts = {
		email: '',
		phone: '',
	};

	openedModal: AppStateModals = AppStateModals.none;
	modalMessage: string | null = null;
	isError = false;

	constructor(protected api: IFilmAPI, protected settings: IAppStateSettings) {}

	get basketTotal(): number {
		return Array.from(this.basket.values()).reduce<number>(
			(acc, ticket) => acc + ticket.price,
			0
		);
	}

	get isOrderReady(): boolean {
		return (
			this.basket.size > 0 && !!this.contacts.email && !!this.contacts.phone
		);
	}

	get selectedMovie(): IMovie | null {
		return this._selectedMovie && this.movies.has(this._selectedMovie)
			? this.movies.get(this._selectedMovie)
			: null;
	}

	get selectedSession(): ISession | null {
		return this._selectedSession &&
			this.movieSessions.has(this._selectedSession)
			? this.movieSessions.get(this._selectedSession)
			: null;
	}

	get tickets(): ITicket[] {
		return Array.from(this.basket.values()).map((ticket) => {
			return {
				film: ticket.film,
				session: ticket.session,
				daytime: ticket.daytime,
				day: ticket.day,
				time: ticket.time,
				row: ticket.row,
				seat: ticket.seat,
				price: ticket.price,
			};
		});
	}

	get order(): Order {
		return {
			...this.contacts,
			tickets: this.tickets,
		};
	}

	// api actions
	async loadMovies(): Promise<void> {
		this.movies.clear();
		const movies = await this.api.getFilms();
		for (const movie of movies) {
			this.movies.set(movie.id, movie);
		}
		this.notifyChanged(AppStateChanges.movies);
	}

	async loadSchedule(id: string): Promise<void> {
		if (!this.movies.has(id)) {
			throw new Error(`Invalid movie id: ${id}`);
		}
		this.movieSessions.clear();
		for (const session of await this.api.getFilmSchedule(id)) {
			this.movieSessions.set(session.id, session);
		}
		this.notifyChanged(AppStateChanges.sessions);
	}

	async orderTickets(): Promise<OrderResult[]> {
		try {
			const result = await this.api.orderTickets(this.order);
			this.basket.clear();
			this.selectSession(null);
			this.movieSessions.clear();
			this.persistState();
			this.notifyChanged(AppStateChanges.basket);
			return result;
		} catch (err: unknown) {
			if (err instanceof Error) {
				this.setMessage(err.message, true);
			}
			if (typeof err === 'string') {
				this.setMessage(err, true);
			}
			return [];
		}
	}

	// user actions
	selectMovie(id: string | null): void {
		if (!id) {
			this._selectedMovie = null;
			this.notifyChanged(AppStateChanges.selectedMovie);
			return;
		}
		if (this.movies.has(id)) {
			this._selectedMovie = id;
			this.notifyChanged(AppStateChanges.selectedMovie);
		} else {
			throw new Error(`Invalid movie id: ${id}`);
		}
	}

	selectSession(id: string | null): void {
		if (!id) {
			this._selectedSession = null;
			this.notifyChanged(AppStateChanges.selectedSession);
			return;
		}
		if (this.movieSessions.has(id)) {
			this._selectedSession = id;
			this.notifyChanged(AppStateChanges.selectedSession);
		} else {
			throw new Error(`Invalid session id: ${id}`);
		}
	}

	selectPlaces(selected: THallPlace[]): void {
		if (!this.selectedSession) {
			throw new Error(`No selected session`);
		}
		const session = this.selectedSession;
		const movie = this.movies.get(session.film);
		const price = session.price;
		const nextTickets: TBasketTicket[] = [];
		for (const place of selected) {
			const id = this.formatTicketKey({
				film: this.selectedSession.film,
				session: this.selectedSession.id,
				row: place.row,
				seat: place.seat,
			});
			const key = `${place.row}:${place.seat}`;
			if (this.selectedSession.taken.includes(key)) {
				throw new Error(`Place already taken: ${key}`);
			}
			nextTickets.push({
				id,
				price,
				film: this.selectedSession.film,
				session: this.selectedSession.id,
				row: place.row,
				seat: place.seat,
				title: movie.title,
				daytime: this.selectedSession.daytime,
				day: this.selectedSession.day,
				time: this.selectedSession.time,
			});
		}
		this.basket.clear();
		for (const ticket of nextTickets) {
			this.basket.set(ticket.id, ticket);
		}
		this.notifyChanged(AppStateChanges.basket);
	}

	removeTicket(id: string): void {
		if (!this.basket.has(id)) {
			throw new Error(`Invalid ticket key: ${id}`);
		}
		this.basket.delete(id);
		this.notifyChanged(AppStateChanges.basket);
	}

	fillContacts(contacts: Partial<IContacts>): void {
		this.contacts = {
			...this.contacts,
			...contacts,
		};
		this.notifyChanged(AppStateChanges.order);
	}

	isValidContacts(): boolean {
		const error = this.validateContacts(this.contacts);
		if (error) {
			this.setMessage(error, true);
			return false;
		} else {
			this.setMessage(null);
			return true;
		}
	}

	// UI methods
	openModal(modal: AppStateModals): void {
		switch (modal) {
			case AppStateModals.session:
				if (this.movieSessions.size === 0) {
					throw new Error(`No sessions loaded`);
				}
				break;
			case AppStateModals.place:
				if (!this.selectedSession) {
					throw new Error(`No selected session`);
				}
				break;
			case AppStateModals.contacts:
				if (this.basket.size === 0) {
					throw new Error(`No tickets selected`);
				}
				break;
		}
		if (this.openedModal !== modal) {
			this.openedModal = modal;
			this.notifyChanged(AppStateChanges.modal);
		}
	}

	setMessage(message: string | null, isError = false): void {
		this.modalMessage = message;
		this.isError = isError;
		this.notifyChanged(AppStateChanges.modalMessage);
	}

	// helpers
	getBasketMovie(): TMovieDescription | null {
		if (this.basket.size === 0) {
			return null;
		}
		const ticket = Array.from(this.basket.values())[0];
		return {
			title: ticket.title,
			day: ticket.day,
			time: ticket.time,
		};
	}

	formatMovieDescription(movie: TMovieDescription): string {
		return `${movie.title}, ${movie.day} ${movie.time}`;
	}

	// Маппинг
	formatTicketDescription(ticket: TBasketTicket): TTicketDescription {
		return {
			id: ticket.id,
			session: `${ticket.day} ${ticket.time}`,
			place: `Ряд ${ticket.row}, место ${ticket.seat}`,
			price: this.formatCurrency(ticket.price),
		};
	}

	formatCurrency(value: number): string {
		return this.settings.formatCurrency(value);
	}

	restoreState(): void {
		if (!localStorage || !this.settings.storageKey) {
			return;
		}

		try {
			const state = localStorage.getItem(this.settings.storageKey);
			if (!state) return;
			const { tickets, contacts } = JSON.parse(state) as TPersistedState;
			this.contacts = contacts;
			this.basket.clear();
			for (const ticket of tickets) {
				this.basket.set(ticket.id, ticket);
			}
			this.notifyChanged(AppStateChanges.basket);
			this.notifyChanged(AppStateChanges.order);
		} catch (err) {
			console.error('Failed to restore state:', err);
		}
	}

	persistState(): void {
		const state: TPersistedState = {
			contacts: this.contacts,
			tickets: Array.from(this.basket.values()),
		};
		if (localStorage && this.settings.storageKey) {
			localStorage.setItem(this.settings.storageKey, JSON.stringify(state));
		}
	}

	protected notifyChanged(changed: AppStateChanges): void {
		this.settings.onChange(changed);
	}

	protected formatTicketKey(selected: TTicketData): string {
		return `${selected.film}:${selected.session}:${selected.row}:${selected.seat}`;
	}

	protected validateContacts(contacts: Partial<IContacts>): string | null {
		const errors: string[] = [];
		if (!contacts.email || !contacts.phone) {
			errors.push('Email и телефон обязательные поля');
		}
		if (
			contacts.email &&
			!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(contacts.email)
		) {
			errors.push('Некорректный email');
		}
		if (contacts.phone && !/^\+?[0-9]{10,14}$/.test(contacts.phone)) {
			errors.push('Некорректный телефон');
		}
		if (errors.length) {
			return errors.join('. ') + '.';
		}
		return null;
	}
}
