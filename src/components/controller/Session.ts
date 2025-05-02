import { Controller } from '@/components/base/Controller';
import { IAppState, AppStateModals } from '@/types/components/model/AppState';

export class SessionController extends Controller<IAppState> {
	onSelect = (id: string) => {
		this.model.selectSession(id);
	};
	onNext = () => {
		this.model.openModal(AppStateModals.place);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
