export interface GoodReadsInterface {
	search: search;
}

export interface search {
	query: string;
	results_start: number;
	results_end: number;
	total_results: number;
	source: string;
	results: results;
}

export interface results {
	work: work[];
}

export interface work {
	id: number;
	books_count: number;
	original_publication_year: number;
	original_publication_month: number;
	original_publication_day: number;
	average_rating: number;
	best_book: best_book;
}

export interface best_book {
	id: number;
	title: string;
	author: author;
	image_url: string;
	small_image_url: string;
}

export interface author {
	id: number;
	name: string;
}
