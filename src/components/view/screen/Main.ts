import { Screen } from '@/components/base/Screen';
import { TClickableEvent } from '@/types/components/base/View';
import { cloneTemplate, ensureElement } from '@/utils/html';
import { SETTINGS } from '@/utils/constants';

import {
	IFilmItem,
	IMainData,
	IMainSettings,
} from '@/types/components/view/screen/Main';
import { ListView } from '../common/List';
import { CardView } from '../partial/Card';
import { HeroView } from '../common/Hero';
import { FilmView } from '../partial/Film';
import { PageView } from '../partial/Page';
import { ICardData } from '@/types/components/view/partial/Card';

/**
 * Экран главной страницы
 */
export class MainScreen extends Screen<IMainData, IMainSettings> {
	protected declare gallery: ListView<ICardData>;
	protected declare hero: HeroView<IFilmItem>;
	public declare page: PageView;

	protected init() {
		this.page = new PageView(ensureElement(SETTINGS.pageSelector), {
			...SETTINGS.pageSettings,
			onClick: this.settings.onOpenBasket,
		});

		this.gallery = new ListView<ICardData>(ensureElement(SETTINGS.gallerySelector), {
				...SETTINGS.gallerySettings,
				item: new CardView(cloneTemplate(SETTINGS.cardTemplate), {
					...SETTINGS.cardSettings,
					onClick: this.onSelectFilmHandler.bind(this),
				}),
			}
		);


		this.hero = new HeroView<IFilmItem>(ensureElement(SETTINGS.heroSelector), {
			...SETTINGS.heroSettings,
			contentView: new FilmView(cloneTemplate(SETTINGS.filmTemplate), {
				...SETTINGS.filmSettings,
				isCompact: false,
			}),
			onClick: this.onOpenFilmHandler.bind(this),
		});

		this.element = this.page.element;
	}

	protected onSelectFilmHandler({ item }: TClickableEvent<string>) {
		this.settings.onSelectFilm(item);
	}

	protected onOpenFilmHandler({ item }: TClickableEvent<IFilmItem>) {
		this.settings.onOpenFilm(item.id);
	}

	set counter(value: number) {
		this.page.counter = value;
	}

	set items(value: ICardData[]) {
		this.gallery.items = value;
	}

	set selected(value: IFilmItem) {
		this.hero.content = value;
		this.hero.cover = value.cover;
		this.gallery.setActiveItem(value.id);
	}
}
