import { IAppState, AppStateModals } from '@/types/components/model/AppState';
import { Controller } from '@/components/base/Controller';
import { TSelectedPlace } from '@/types/components/view/partial/Places';

export class PlacesController extends Controller<IAppState> {
	onSelect = (places: TSelectedPlace[]) => {
		this.model.selectPlaces(places);
		this.model.persistState();
	};
	onNext = () => {
		this.model.openModal(AppStateModals.basket);
	};
	onBack = () => {
		this.model.openModal(AppStateModals.session);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
