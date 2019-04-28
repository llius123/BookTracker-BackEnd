export interface GoogleBooksInterface {
    items: items[]
}
export interface items {
    volumeInfo: volumeInfo,
    searchInfo: searchInfo
}

export interface volumeInfo {
    title: string,
    authors: string[],
    publisher: string,
    publishedDate: string,
    description: string,
    categories: string[],
    imageLinks: imageLinks,
    language: string
}

export interface imageLinks {
    smallThumbnail: string,
    thumbnail: string
}

export interface searchInfo {
    textSnippet: string
}