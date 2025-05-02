import { ModalScreen } from '@/components/view/screen/ModalScreen';
import { cloneTemplate } from '@/utils/html';
import { SETTINGS } from '@/utils/constants';

import {
	IOrderFormData,
	IOrderFormSettings,
} from '@/types/components/view/screen/OrderForm';
import { IHeaderData } from '@/types/components/view/common/Header';
import { IOrderData } from '@/types/components/view/partial/Order';
import { HeaderView } from '@/components/view/common/Header';
import { OrderView } from '@/components/view/partial/Order';
import { TChangeableEvent } from '@/types/components/base/View';

/**
 * Экран формы заказа
 */
export class OrderFormScreen extends ModalScreen<
	IHeaderData,
	IOrderData,
	IOrderFormData,
	IOrderFormSettings
> {
	initHeader() {
		return new HeaderView(cloneTemplate(SETTINGS.headerTemplate), {
			...SETTINGS.headerSettings,
			onClick: this.settings.onBack,
		});
	}

	initContent() {
		return new OrderView(cloneTemplate(SETTINGS.orderTemplate), {
			...SETTINGS.orderSettings,
			onChange: this.onFormChange.bind(this),
		});
	}

	protected onFormChange({ value }: TChangeableEvent<IOrderData>) {
		this.settings.onChange(value);
	}

	set contacts(value: IOrderData) {
		this.modal.content = value;
	}

	set total(total: string) {
		this.modal.message = `${SETTINGS.orderModal.totalLabel} ${total}`;
	}
}
