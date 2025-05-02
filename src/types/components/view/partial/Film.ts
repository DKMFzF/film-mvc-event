export interface IFilmData {
	rating: number;
	director: string;
	tags: string[];
	title: string;
	description: string;
}

export interface IFilmSettings {
	rating: string;
	director: string;
	tags: string;
	title: string;
	description: string;
	
	compactClass: string;
	tagsSeparator: string;
	isCompact: boolean;
}
