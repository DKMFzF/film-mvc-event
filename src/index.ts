import './scss/styles.scss';
import { API_URL, CDN_URL, SETTINGS } from './utils/constants';
import { FilmAPI } from './components/model/FilmApi';
import { AppStateModel } from './components/model/AppState';
import { AppStateEmitter } from '@/components/model/AppStateEmitter';
import { MainController } from '@/components/controller/Main';
import { MainScreen } from '@/components/view/screen/Main';
import {
	AppStateChanges,
	AppStateModals,
} from '@/types/components/model/AppState';
import { SelectSessionScreen } from '@/components/view/screen/SelectSession';
import { SessionController } from '@/components/controller/Session';
import { SelectPlacesScreen } from '@/components/view/screen/SelectPlaces';
import { PlacesController } from '@/components/controller/Places';
import { ModalController } from '@/components/controller/Modal';
import { SuccessScreen } from '@/components/view/screen/Success';
import { OrderController } from '@/components/controller/Order';
import { OrderFormScreen } from '@/components/view/screen/OrderForm';
import { BasketController } from '@/components/controller/Basket';
import { BasketScreen } from '@/components/view/screen/Basket';
import { TModalChange } from '@/types/components/model/AppStateEmitter';

const api = new FilmAPI(CDN_URL, API_URL);
const app = new AppStateEmitter(api, SETTINGS.appState, AppStateModel);
const main = new MainScreen(new MainController(app.model));
const modal = {
	[AppStateModals.session]: new SelectSessionScreen(
		new SessionController(app.model)
	),
	[AppStateModals.place]: new SelectPlacesScreen(
		new PlacesController(app.model)
	),
	[AppStateModals.basket]: new BasketScreen(new BasketController(app.model)),
	[AppStateModals.contacts]: new OrderFormScreen(
		new OrderController(app.model)
	),
	[AppStateModals.success]: new SuccessScreen(new ModalController(app.model)),
};

// Накидываем слушатели

app.on(AppStateChanges.movies, () => {
	main.items = Array.from(app.model.movies.values());
});

app.on(AppStateChanges.selectedMovie, () => {
	main.selected = app.model.selectedMovie;
});

app.on(AppStateChanges.modal, ({ previous, current }: TModalChange) => {
	main.page.isLocked = current !== AppStateModals.none;
	if (previous !== AppStateModals.none) {
		modal[previous].render({ isActive: false });
	}
});

app.on(AppStateChanges.modalMessage, () => {
	if (app.model.openedModal !== AppStateModals.none) {
		modal[app.model.openedModal].render({
			message: app.model.modalMessage,
			isError: app.model.isError,
		});
	}
});

app.on(AppStateModals.session, () => {
	modal[AppStateModals.session].render({
		film: app.model.selectedMovie,
		schedule: {
			sessions: Array.from(app.model.movieSessions.values()),
			selected: null,
		},
		isActive: true,
		isDisabled: !app.model.selectedSession,
	});
});

app.on(AppStateChanges.selectedSession, () => {
	modal[AppStateModals.session].isDisabled = !app.model.selectedSession;
});

app.on(AppStateModals.place, () => {
	modal[AppStateModals.place].render({
		header: {
			title: SETTINGS.placesModal.headerTitle,
			description: app.model.formatMovieDescription({
				title: app.model.selectedMovie.title,
				day: app.model.selectedSession.day,
				time: app.model.selectedSession.time,
			}),
		},
		places: {
			hall: {
				rows: app.model.selectedSession.rows,
				seats: app.model.selectedSession.seats,
			},
			selected: Array.from(app.model.basket.values()),
			taken: app.model.selectedSession.taken,
		},
		isActive: true,
		isDisabled: app.model.basket.size === 0,
	});
});

app.on(AppStateChanges.basket, () => {
	main.counter = app.model.basket.size;
	
	modal[AppStateModals.place].render({
		places: {
			selected: Array.from(app.model.basket.values()),
		},
		isDisabled: app.model.basket.size === 0,
	});

	modal[AppStateModals.basket].tickets = Array.from(app.model.basket.values()).map((ticket) => {
		return app.model.formatTicketDescription(ticket);
	});
});

app.on(AppStateModals.basket, () => {
	modal[AppStateModals.basket].render({
		header: {
			title: SETTINGS.basketModal.headerTitle,
			description: app.model.basket.size
				? app.model.formatMovieDescription(app.model.getBasketMovie())
				: '',
		},
		tickets: Array.from(app.model.basket.values()).map((ticket) => {
			return app.model.formatTicketDescription(ticket);
		}),
		total: app.model.formatCurrency(app.model.basketTotal),
		isDisabled: app.model.basket.size === 0,
		isActive: true,
	});
});

app.on(AppStateModals.contacts, () => {
	modal[AppStateModals.contacts].render({
		header: {
			title: SETTINGS.orderModal.headerTitle,
			description: app.model.formatMovieDescription(app.model.getBasketMovie()),
		},
		contacts: app.model.contacts,
		total: app.model.formatCurrency(app.model.basketTotal),
		isDisabled: !app.model.contacts.email && !app.model.contacts.phone,
		isActive: true,
	});
});

app.on(AppStateChanges.order, () => {
	modal[AppStateModals.contacts].render({
		contacts: app.model.contacts,
		isDisabled: !app.model.contacts.email && !app.model.contacts.phone,
	});
});

app.on(AppStateModals.success, () => {
	modal[AppStateModals.success].render({
		content: SETTINGS.successModal,
		isActive: true,
	});
});

app.model
	.loadMovies()
	.then(() => {
		app.model.restoreState();
		app.model.selectMovie(Array.from(app.model.movies.values())[0].id);
	})
	.catch((err: string) => console.log(`Error: `, err));
