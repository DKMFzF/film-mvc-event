import { TElementChild } from '@/types/html';

export function isSelector<T>(x: string | T): x is string {
	return typeof x === 'string' && x.length > 1;
}

export function isPlainObject(obj: unknown): obj is object {
	const prototype = Object.getPrototypeOf(obj);
	return prototype === Object.getPrototypeOf({}) || prototype === null;
}

export function isBoolean(v: unknown): v is boolean {
	return typeof v === 'boolean';
}

export function isChildElement(x: unknown): x is TElementChild {
	return x instanceof HTMLElement || Array.isArray(x);
}
