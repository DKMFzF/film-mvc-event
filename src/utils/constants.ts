import { ISettings } from '@/types/settings';

export const API_URL = `${process.env.API_ORIGIN}/api/afisha`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/afisha`;

export const DEVELOPMENT = process.env.NODE_ENV === 'development';

export const SETTINGS: ISettings = {
	gallerySelector: '.gallery',
	gallerySettings: {
		activeItemClass: 'gallery__item_active',
		itemClass: 'gallery__item',
	},
	cardSettings: {
		text: '.card__text',
		image: '.card__image',
	},
	cardTemplate: '#film-card',

	filmTemplate: '#film-info',
	filmSettings: {
		rating: '.film__rating',
		director: '.film__director',
		tags: '.film__tags',
		title: '.film__title',
		description: '.film__description',
		compactClass: 'film_compact',
		tagsSeparator: ', ',
	},
	heroSelector: '.hero',
	heroSettings: {
		action: '.hero__action',
		background: '.hero__background',
		content: '.hero__content',
	},
	pageSelector: '.page',
	pageSettings: {
		wrapper: '.page__wrapper',
		counter: '.header__basket-counter',
		basket: '.header__basket',
		lockedClass: 'page__wrapper_locked',
	},
	scheduleElement: ['form', { className: 'schedule' }],
	scheduleSettings: {
		day: ['div', { className: 'schedule__day' }],
		label: ['div', { className: 'schedule__label' }],
		time: ['button', { className: 'schedule__time' }],
		activeClass: 'schedule__time_active',
	},
	placesElement: ['form', { className: 'places' }],
	placesSettings: {
		seat: ['button', { className: 'places__seat' }],
		seatsContainer: ['div', { className: 'places__seats' }],
		label: ['div', { className: 'places__label' }],
		rowContainer: ['div', { className: 'places__row' }],
		rowLabel: 'Ряд',
		rowSeparator: ' ',
		takenSeparator: ':',
		activeClass: 'places__seat_active',
	},
	ticketTemplate: '#ticket',
	ticketSettings: {
		place: '.ticket__place',
		session: '.ticket__session',
		price: '.ticket__price',
		delete: '.ticket__delete',
	},
	headerTemplate: '#film-head',
	headerSettings: {
		action: '.film__back',
		title: '.film__title',
		description: '.film__description',
	},
	modalTemplate: '#modal',
	modalSettings: {
		close: '.modal__close',
		header: '.modal__header',
		content: '.modal__content',
		footer: '.modal__footer',
		message: '.modal__message',
		activeClass: 'modal_active',
		messageErrorClass: 'modal__message_error',
	},
	scheduleModal: {
		nextLabel: 'Далее',
		nextSettings: ['button', { className: 'button' }],
	},
	placesModal: {
		headerTitle: 'Выберите место',
		nextLabel: 'Далее',
		nextSettings: ['button', { className: 'button' }],
	},
	basketModal: {
		headerTitle: 'Корзина',
		nextLabel: 'Оформить',
		nextSettings: ['button', { className: 'button' }],
		totalLabel: 'Итого:',
	},
	basketTemplate: '#basket',
	basketSettings: {
		activeItemClass: '',
		itemClass: 'basket__item',
	},
	orderModal: {
		headerTitle: 'Оформление заказа',
		nextLabel: 'Оплатить',
		totalLabel: 'Итого:',
		nextSettings: ['button', { className: 'button' }],
	},
	orderTemplate: '#order',
	orderSettings: {
		email: 'input[name=email]',
		phone: 'input[name=phone]',
	},
	messageTemplate: '#success',
	messageSettings: {
		title: '.film__title',
		description: '.film__description',
		action: '.order-success__close',
	},
	successModal: {
		title: 'Заказ оформлен',
		description: 'Билеты уже у вас на почте',
		action: 'На главную',
	},
	appState: {
		formatCurrency: (value: number) => `${value} руб.`,
		storageKey: '__filmTickets',
	},
};
