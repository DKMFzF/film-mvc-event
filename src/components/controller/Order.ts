import { Controller } from '@/components/base/Controller';
import { IAppState, AppStateModals } from '@/types/components/model/AppState';
import { IOrderData } from '@/types/components/view/partial/Order';

export class OrderController extends Controller<IAppState> {
	onChange = (value: IOrderData) => {
		this.model.fillContacts(value);
	};
	onNext = async () => {
		const ticketAmount = this.model.basket.size;
		if (this.model.isValidContacts()) {
			const result = await this.model.orderTickets();
			if (result.length === ticketAmount) {
				this.model.persistState();
				this.model.openModal(AppStateModals.success);
			}
		}
	};
	onBack = () => {
		this.model.openModal(AppStateModals.basket);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
