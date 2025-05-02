import { ICardData } from '../partial/Card';
import { IFilmData } from '../partial/Film';

export interface IFilmItem extends IFilmData {
	id: string;
	cover: string;
}

export interface IMainData {
	counter: number;
	items: ICardData[];
	selected: IFilmItem;
}

export interface IMainSettings {
	onOpenBasket: () => void;
	onSelectFilm: (id: string) => void;
	onOpenFilm: (id: string) => void;
}
