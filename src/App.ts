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

type ModalScreens = Exclude<AppStateModals, AppStateModals.none>;

interface IApp {
  api: FilmAPI;
  appState: AppStateEmitter;
  mainScreen: MainScreen;
  modals: Record<ModalScreens, any>;
}

/**
 * Запускаюший класс приложения
 */
export class App implements IApp {
    public readonly api;
    public readonly appState;
    public readonly mainScreen;
    public readonly modals: Record<ModalScreens, any>;

    constructor() {
        this.api = new FilmAPI(CDN_URL, API_URL);
        this.appState = new AppStateEmitter(this.api, SETTINGS.appState, AppStateModel);
        this.mainScreen = new MainScreen(new MainController(this.appState.model));
        this.modals = {
            [AppStateModals.session]: new SelectSessionScreen(
                new SessionController(this.appState.model)
            ),
            [AppStateModals.place]: new SelectPlacesScreen(
                new PlacesController(this.appState.model)
            ),
            [AppStateModals.basket]: new BasketScreen(new BasketController(this.appState.model)),
            [AppStateModals.contacts]: new OrderFormScreen(
                new OrderController(this.appState.model)
            ),
            [AppStateModals.success]: new SuccessScreen(new ModalController(this.appState.model)),
        };

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.appState.on(AppStateChanges.movies, () => {
            this.mainScreen.items = Array.from(this.appState.model.movies.values());
        });

        this.appState.on(AppStateChanges.selectedMovie, () => {
            this.mainScreen.selected = this.appState.model.selectedMovie;
        });

        this.appState.on(AppStateChanges.modal, ({ previous, current }: TModalChange) => {
            this.mainScreen.page.isLocked = current !== AppStateModals.none;
            if (previous !== AppStateModals.none) {
                this.modals[previous].render({ isActive: false });
            }
        });

        this.appState.on(AppStateChanges.modalMessage, () => {
            if (this.appState.model.openedModal !== AppStateModals.none) {
                this.modals[this.appState.model.openedModal].render({
                    message: this.appState.model.modalMessage,
                    isError: this.appState.model.isError,
                });
            }
        });

        this.appState.on(AppStateModals.session, () => {
            this.modals[AppStateModals.session].render({
                film: this.appState.model.selectedMovie,
                schedule: {
                    sessions: Array.from(this.appState.model.movieSessions.values()),
                    selected: null,
                },
                isActive: true,
                isDisabled: !this.appState.model.selectedSession,
            });
        });

        this.appState.on(AppStateChanges.selectedSession, () => {
            this.modals[AppStateModals.session].isDisabled = !this.appState.model.selectedSession;
        });

        this.appState.on(AppStateModals.place, () => {
            this.modals[AppStateModals.place].render({
                header: {
                    title: SETTINGS.placesModal.headerTitle,
                    description: this.appState.model.formatMovieDescription({
                        title: this.appState.model.selectedMovie.title,
                        day: this.appState.model.selectedSession.day,
                        time: this.appState.model.selectedSession.time,
                    }),
                },
                places: {
                    hall: {
                        rows: this.appState.model.selectedSession.rows,
                        seats: this.appState.model.selectedSession.seats,
                    },
                    selected: Array.from(this.appState.model.basket.values()),
                    taken: this.appState.model.selectedSession.taken,
                },
                isActive: true,
                isDisabled: this.appState.model.basket.size === 0,
            });
        });

        this.appState.on(AppStateChanges.basket, () => {
            this.mainScreen.counter = this.appState.model.basket.size;
            
            this.modals[AppStateModals.place].render({
                places: {
                    selected: Array.from(this.appState.model.basket.values()),
                },
                isDisabled: this.appState.model.basket.size === 0,
            });

            this.modals[AppStateModals.basket].tickets = Array.from(this.appState.model.basket.values()).map((ticket) => {
                return this.appState.model.formatTicketDescription(ticket);
            });
        });

        this.appState.on(AppStateModals.basket, () => {
            this.modals[AppStateModals.basket].render({
                header: {
                    title: SETTINGS.basketModal.headerTitle,
                    description: this.appState.model.basket.size
                        ? this.appState.model.formatMovieDescription(this.appState.model.getBasketMovie())
                        : '',
                },
                tickets: Array.from(this.appState.model.basket.values()).map((ticket) => {
                    return this.appState.model.formatTicketDescription(ticket);
                }),
                total: this.appState.model.formatCurrency(this.appState.model.basketTotal),
                isDisabled: this.appState.model.basket.size === 0,
                isActive: true,
            });
        });

        this.appState.on(AppStateModals.contacts, () => {
            this.modals[AppStateModals.contacts].render({
                header: {
                    title: SETTINGS.orderModal.headerTitle,
                    description: this.appState.model.formatMovieDescription(this.appState.model.getBasketMovie()),
                },
                contacts: this.appState.model.contacts,
                total: this.appState.model.formatCurrency(this.appState.model.basketTotal),
                isDisabled: !this.appState.model.contacts.email && !this.appState.model.contacts.phone,
                isActive: true,
            });
        });

        this.appState.on(AppStateChanges.order, () => {
            this.modals[AppStateModals.contacts].render({
                contacts: this.appState.model.contacts,
                isDisabled: !this.appState.model.contacts.email && !this.appState.model.contacts.phone,
            });
        });

        this.appState.on(AppStateModals.success, () => {
            this.modals[AppStateModals.success].render({
                content: SETTINGS.successModal,
                isActive: true,
            });
        });
    }

    public async init(): Promise<void> {
        try {
            await this.appState.model.loadMovies();
            this.appState.model.restoreState();
            this.appState.model.selectMovie(Array.from(this.appState.model.movies.values())[0].id);
        } catch (error) {
            console.error('Error initializing app:', error);
            throw error;
        }
    }
}
