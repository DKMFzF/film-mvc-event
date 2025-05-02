import { Controller } from '@/components/base/Controller';
import { IAppState, AppStateModals } from '@/types/components/model/AppState';

export class BasketController extends Controller<IAppState> {
	onRemove = (id: string) => {
		this.model.removeTicket(id);
	};
	onNext = () => {
		this.model.openModal(AppStateModals.contacts);
	};
	onBack = () => {
		this.model.openModal(AppStateModals.place);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
