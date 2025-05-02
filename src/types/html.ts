export type TSelectorElement<T> = T | string;
export type TSelectorCollection<T> = string | NodeListOf<Element> | T[];

export type TElementChild = HTMLElement | HTMLElement[];
export type TElementAttrs =
	| 'textContent'
	| 'className'
	| 'href'
	| 'src'
	| 'alt'
	| 'dataset';
export type TElementProps<T extends HTMLElement> = Partial<
	Record<keyof T, string | boolean | object>
>;
export type TElementValue<T extends HTMLElement> =
	| string
	| TElementChild
	| TElementProps<T>;
export type TElementCreator<T extends HTMLElement = HTMLElement> = [
	keyof HTMLElementTagNameMap,
	TElementProps<T>
];
