import { IAppState, AppStateModals } from '@/types/components/model/AppState';
import { Controller } from '@/components/base/Controller';

export class ModalController extends Controller<IAppState> {
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
