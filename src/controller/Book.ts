import { getConnection } from "typeorm";
import { Request, Response } from "express";
import { book } from "../entity/BookEntity";
import * as https from "https";
import * as xml from "xml-js";
import fetch from "node-fetch";

export class Book {
	public Book(app) {
		app.get("/api/search/:name", async (req: Request, res: Response) => {
			const name: string = req.params.name;
			const book: book = await this.existDB(name);
			res.json(book);
		});

		app.get("/api/searchapi/:name", async (req: Request, res: Response) => {
			const name: string = req.params.name;
			const bookGoogle = await this.googleApi(req.params.name);
			const bookOpenlibrary = await this.openlibraryApi(req.params.name);

			let bookGoodRead = await this.goodReadApi(req.params.name);
			let data = this.apiTransformerGoodRead(bookGoodRead);
			res.send(data);
		});
	}

	/**
	 * Busco un libro en la base de datos por el nombre
	 * @param name Nombre del libro a buscar
	 */
	private existDB(name: string) {
		return getConnection()
			.getRepository(book)
			.createQueryBuilder("book")
			.where("book.title = :title", { title: name })
			.getOne();
	}

	private async googleApi(name: string) {
		try {
			const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}&maxResults=5`).then(
				response => {
					return response.json();
				}
			);
			return response;
		} catch (error) {
			return error;
		}
	}

	/**
	 * Busco en la api de openlibrary el libro
	 * @param name String
	 */
	private async openlibraryApi(name: string) {
		try {
			const response = await fetch(`https://openlibrary.org/search.json?q=${name}&limit=10&mode=everything`).then(
				response => {
					return response.json();
				}
			);
			return response;
		} catch (error) {
			return error;
		}
	}

	/**
	 * Busco en la api de goodRead el libre por el nombre
	 * Transformo el xml que me devuelve la api en json
	 * @param name Nombre del libro
	 */
	private async goodReadApi(name: string) {
		try {
			const response = await fetch(`https://www.goodreads.com/search/index.xml?key=a7b4XbLNjsabcn9TX7NMjw&q=${name}`);
			const json = response.text().then(data => {
				return JSON.parse(xml.xml2json(data, { compact: true, spaces: 4 }));
			});
			return json;
		} catch (error) {
			return error;
		}
	}

	/**
	 * Transformo los datos que me llegan de GoodReads a lo que yo necesito
	 * @param data respuesta api GoodReads
	 */
	private apiTransformerGoodRead(data: any): GoodReadsInterface {
		let book: GoodReadsInterface;
		let work: work[] = [];

		data.GoodreadsResponse.search.results.work.forEach(element => {
			let simpleWork: work;
			simpleWork = {
				id: element.id._text,
				books_count: element.books_count._text,
				original_publication_year: element.original_publication_year._text,
				original_publication_month: element.original_publication_month._text,
				original_publication_day: element.original_publication_day._text,
				average_rating: element.average_rating._text,
				best_book: {
					id: element.best_book.id._text,
					title: element.best_book.title._text,
					author: {
						id: element.best_book.author.id._text,
						name: element.best_book.author.name._text
					},
					image_url: element.best_book.image_url._text,
					small_image_url: element.best_book.small_image_url._text
				}
			};
			work.push(simpleWork);
		});
		return (book = {
			search: {
				query: data.GoodreadsResponse.search.query._cdata,
				results_start: data.GoodreadsResponse.search["results-start"]._text,
				results_end: data.GoodreadsResponse.search["results-end"]._text,
				total_results: data.GoodreadsResponse.search["total-results"]._text,
				source: data.GoodreadsResponse.search.source._text,
				results: {
					work: work
				}
			}
		});
	}
}
