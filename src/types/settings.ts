import { TElementCreator } from '@/types/html';

export interface IViewSettings {
    gallerySelector: string;
    gallerySettings: {
        activeItemClass: string;
        itemClass: string;
    };
}

export interface ICardSettings {
    cardSettings: {
        text: string;
        image: string;
    };
    cardTemplate: string;
}

export interface IFilmSettings {
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

export interface IHeroSettings {
    heroSelector: string;
    heroSettings: {
        action: string;
        background: string;
        content: string;
    };
}

export interface IPageSettings {
    pageSelector: string;
    pageSettings: {
        wrapper: string;
        counter: string;
        basket: string;
        lockedClass: string;
    };
}

export interface IScheduleSettings {
    scheduleElement: TElementCreator;
    scheduleSettings: {
        day: TElementCreator;
        label: TElementCreator;
        time: TElementCreator;
        activeClass: string;
    };
}

export interface IPlacesSettings {
    placesElement: TElementCreator;
    placesSettings: {
        seat: TElementCreator;
        seatsContainer: TElementCreator;
        label: TElementCreator;
        rowContainer: TElementCreator;
        rowLabel: string;
        rowSeparator: string;
        takenSeparator: string;
        activeClass: string;
    };
}

export interface ITicketSettings {
    ticketTemplate: string;
    ticketSettings: {
        place: string;
        session: string;
        price: string;
        delete: string;
    };
}

export interface IHeaderSettings {
    headerTemplate: string;
    headerSettings: {
        action: string;
        title: string;
        description: string;
    };
}

export interface IBasketSettings {
    basketTemplate: string;
    basketSettings: {
        activeItemClass: string;
        itemClass: string;
    };
}

export interface IOrderSettings {
    orderTemplate: string;
    orderSettings: {
        email: string;
        phone: string;
    };
}

export interface IMessageSettings {
    messageTemplate: string;
    messageSettings: {
        title: string;
        description: string;
        action: string;
    };
}

export interface IModalSettings {
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

export interface IScheduleModalSettings {
    scheduleModal: {
        nextLabel: string;
        nextSettings: TElementCreator;
    };
}

export interface IPlacesModalSettings {
    placesModal: {
        headerTitle: string;
        nextLabel: string;
        nextSettings: TElementCreator;
    };
}

export interface IBasketModalSettings {
    basketModal: {
        headerTitle: string;
        nextLabel: string;
        nextSettings: TElementCreator;
        totalLabel: string;
    };
}

export interface IOrderModalSettings {
    orderModal: {
        headerTitle: string;
        nextLabel: string;
        totalLabel: string;
        nextSettings: TElementCreator;
    };
}

export interface ISuccessModalSettings {
    successModal: {
        title: string;
        description: string;
        action: string;
    };
}

export interface IAppStateSettings {
    appState: {
        formatCurrency: (value: number) => string;
        storageKey: string;
    };
}

export interface ISettings extends IViewSettings, ICardSettings, IFilmSettings, IHeroSettings, 
    IPageSettings, IScheduleSettings, IPlacesSettings, ITicketSettings, IHeaderSettings, 
    IBasketSettings, IOrderSettings, IMessageSettings, IModalSettings, IScheduleModalSettings, 
    IPlacesModalSettings, IBasketModalSettings, IOrderModalSettings, ISuccessModalSettings, 
    IAppStateSettings {}
