export type TEventData = object;
export type TEventHandler = (args: TEventData) => void;
export type TEventsMap = Map<string, Set<TEventHandler>>;
