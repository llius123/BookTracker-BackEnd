interface GoodReadsInterface {
    search: search
}

interface search {
    query: string,
    results_start: number,
    results_end: number,
    total_results: number,
    source: string,
    results: results
}

interface results {
    work: work[];
}

interface work {
    id: number,
    books_count: number,
    original_publication_year: number,
    original_publication_month: number,
    original_publication_day: number,
    average_rating: number,
    best_book: best_book
}

interface best_book {
    id: number,
    title: string,
    author: author,
    image_url: string,
    small_image_url: string
}

interface author {
    id: number,
    name: string
}