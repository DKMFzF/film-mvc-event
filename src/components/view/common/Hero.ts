import { View } from '../../base/View';

import { IHeroData, IHeroSettings } from '@/types/components/view/common/Hero';

/**
 * Контейнер для контента с фоновым изображением и кнопкой
 */
export class HeroView<T> extends View<IHeroData<T>, IHeroSettings<T>> {
	protected declare _contentElement: HTMLElement;
	protected declare _item: T;

	init() {
		this._contentElement = this.settings.contentView.render();
		this.ensure(this.settings.content).prepend(this._contentElement);
		this.ensure(this.settings.action).addEventListener(
			'click',
			this.onClickHandler.bind(this)
		);
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event, item: this._item });
	}

	set cover(cover: string) {
		this.setValue<HTMLImageElement>(this.settings.background, {
			src: cover,
		});
	}

	set content(content: T) {
		this._item = content;
		this.setElement(
			this._contentElement,
			this.settings.contentView.render(content)
		);
	}
}
