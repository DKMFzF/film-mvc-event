import { ElementCreator } from '@/types/html';

export interface ViewSettings {
    gallerySelector: string;
    gallerySettings: {
        activeItemClass: string;
        itemClass: string;
    };
}

export interface CardSettings {
    cardSettings: {
        text: string;
        image: string;
    };
    cardTemplate: string;
}

export interface FilmSettings {
    filmTemplate: string;
    filmSettings: {
        rating: string;
        director: string;
        tags: string;
        title: string;
        description: string;
        compactClass: string;
        tagsSeparator: string;
    };
}

export interface HeroSettings {
    heroSelector: string;
    heroSettings: {
        action: string;
        background: string;
        content: string;
    };
}

export interface PageSettings {
    pageSelector: string;
    pageSettings: {
        wrapper: string;
        counter: string;
        basket: string;
        lockedClass: string;
    };
}

export interface ScheduleSettings {
    scheduleElement: ElementCreator;
    scheduleSettings: {
        day: ElementCreator;
        label: ElementCreator;
        time: ElementCreator;
        activeClass: string;
    };
}

export interface PlacesSettings {
    placesElement: ElementCreator;
    placesSettings: {
        seat: ElementCreator;
        seatsContainer: ElementCreator;
        label: ElementCreator;
        rowContainer: ElementCreator;
        rowLabel: string;
        rowSeparator: string;
        takenSeparator: string;
        activeClass: string;
    };
}

export interface TicketSettings {
    ticketTemplate: string;
    ticketSettings: {
        place: string;
        session: string;
        price: string;
        delete: string;
    };
}

export interface HeaderSettings {
    headerTemplate: string;
    headerSettings: {
        action: string;
        title: string;
        description: string;
    };
}

export interface BasketSettings {
    basketTemplate: string;
    basketSettings: {
        activeItemClass: string;
        itemClass: string;
    };
}

export interface OrderSettings {
    orderTemplate: string;
    orderSettings: {
        email: string;
        phone: string;
    };
}

export interface MessageSettings {
    messageTemplate: string;
    messageSettings: {
        title: string;
        description: string;
        action: string;
    };
}

export interface ModalSettings {
    modalTemplate: string;
    modalSettings: {
        close: string;
        header: string;
        content: string;
        footer: string;
        message: string;
        activeClass: string;
        messageErrorClass: string;
    };
}

export interface ScheduleModalSettings {
    scheduleModal: {
        nextLabel: string;
        nextSettings: ElementCreator;
    };
}

export interface PlacesModalSettings {
    placesModal: {
        headerTitle: string;
        nextLabel: string;
        nextSettings: ElementCreator;
    };
}

export interface BasketModalSettings {
    basketModal: {
        headerTitle: string;
        nextLabel: string;
        nextSettings: ElementCreator;
        totalLabel: string;
    };
}

export interface OrderModalSettings {
    orderModal: {
        headerTitle: string;
        nextLabel: string;
        totalLabel: string;
        nextSettings: ElementCreator;
    };
}

export interface SuccessModalSettings {
    successModal: {
        title: string;
        description: string;
        action: string;
    };
}

export interface AppStateSettings {
    appState: {
        formatCurrency: (value: number) => string;
        storageKey: string;
    };
}

export interface Settings extends ViewSettings, CardSettings, FilmSettings, HeroSettings, 
    PageSettings, ScheduleSettings, PlacesSettings, TicketSettings, HeaderSettings, 
    BasketSettings, OrderSettings, MessageSettings, ModalSettings, ScheduleModalSettings, 
    PlacesModalSettings, BasketModalSettings, OrderModalSettings, SuccessModalSettings, 
    AppStateSettings {}
