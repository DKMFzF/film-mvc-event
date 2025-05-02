import { View } from '../../base/View';
import { IFilmData, IFilmSettings } from '@/types/components/view/partial/Film';

/**
 * Подробное описание фильма
 */
export class FilmView extends View<IFilmData, IFilmSettings> {
	init() {
		this.isCompact = this.settings.isCompact;
	}

	set rating(value: number) {
		this.setValue(this.settings.rating, String(value));
	}

	set director(value: string) {
		this.setValue(this.settings.director, value);
	}

	set tags(value: string[]) {
		this.setValue(this.settings.tags, value.join(this.settings.tagsSeparator));
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
	}

	set description(value: string) {
		this.setValue(this.settings.description, value);
	}

	set isCompact(value: boolean) {
		this.element.classList.toggle(this.settings.compactClass, value);
	}
}
