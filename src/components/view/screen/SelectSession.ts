import { ModalScreen } from '@/components/view/screen/ModalScreen';
import { cloneTemplate, createElement } from '@/utils/html';
import { SETTINGS } from '@/utils/constants';

import {
	IScheduleData,
	TScheduleSession,
} from '@/types/components/view/partial/Schedule';
import { IFilmData } from '@/types/components/view/partial/Film';
import { FilmView } from '@/components/view/partial/Film';
import { ScheduleView } from '@/components/view/partial/Schedule';
import {
	ISelectSessionData,
	ISelectSessionSettings,
} from '@/types/components/view/screen/SelectSession';
import { ISelectableEvent, IView } from '@/types/components/base/View';

/**
 * Экран выбора сеанса
 */
export class SelectSessionScreen extends ModalScreen<IFilmData, Partial<IScheduleData>, ISelectSessionData, ISelectSessionSettings> {
	initHeader(): IView<IFilmData> {
		return new FilmView(cloneTemplate(SETTINGS.filmTemplate), {
			...SETTINGS.filmSettings,
			isCompact: true,
		});
	}

	initContent(): IView<Partial<IScheduleData>> {
		return new ScheduleView(createElement(...SETTINGS.scheduleElement), {
			...SETTINGS.scheduleSettings,
			onSelect: this.onSelect.bind(this),
		});
	}

	protected onSelect({ value }: ISelectableEvent<TScheduleSession>) {
		this.settings.onSelect(value.id);
	}

	set film(data: IFilmData) {
		this.modal.header = data;
	}

	set schedule(data: Partial<IScheduleData>) {
		this.modal.content = data;
	}
}
