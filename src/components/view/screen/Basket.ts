import { ModalScreen } from '@/components/view/screen/ModalScreen';
import { TClickableEvent } from '@/types/components/base/View';
import { cloneTemplate } from '@/utils/html';
import { SETTINGS } from '@/utils/constants';

import {
	IBasketData,
	IBasketSettings,
} from '@/types/components/view/screen/Basket';
import { IHeaderData } from '@/types/components/view/common/Header';
import { ListView } from '@/components/view/common/List';
import { ITicketData } from '@/types/components/view/partial/Ticket';
import { HeaderView } from '@/components/view/common/Header';
import { TicketView } from '@/components/view/partial/Ticket';
import { IListData } from '@/types/components/view/common/List';

/**
 * Экран корзины
 */
export class BasketScreen extends ModalScreen<
	IHeaderData,
	IListData<ITicketData>,
	IBasketData,
	IBasketSettings
> {
	initHeader() {
		return new HeaderView(cloneTemplate(SETTINGS.headerTemplate), {
			...SETTINGS.headerSettings,
			onClick: this.settings.onBack,
		});
	}

	initContent() {
		console.log(`BasketScreen -> initContent()`);
		return new ListView<ITicketData>(cloneTemplate(SETTINGS.basketTemplate), {
			...SETTINGS.basketSettings,
			item: new TicketView(cloneTemplate(SETTINGS.ticketTemplate), {
				...SETTINGS.ticketSettings,
				onClick: this.onRemoveTicket.bind(this),
			}),
		});
	}

	protected onRemoveTicket({ item }: TClickableEvent<ITicketData>) {
		this.settings.onRemove(item.id);
	}

	set tickets(tickets: ITicketData[]) {
		this.modal.content = { items: tickets, };
		this.nextButton.disabled = !tickets.length;
	}

	set total(total: string) {
		this.modal.message = `${SETTINGS.basketModal.totalLabel} ${total}`;
	}
}
