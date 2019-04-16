import { getConnection } from "typeorm";
import { Request, Response } from "express";
import { book } from "../entity/BookEntity";
import * as https from "https";
import * as xml from "xml-js";

export class Book {
	public Book(app) {
		app.get("/search/:name", async (req: Request, res: Response) => {
			const name: string = req.params.name;
			const book: book = await this.existDB(name);
			res.json(book);
		});

		app.get("/searchapi/:name", async (req: Request, res: Response) => {
			const name: string = req.params.name;
			Promise.all([this.googleApi(name)]).then(data => {
				res.json(data);
			});
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

	private googleApi(name: string) {
		return https.get(`https://www.googleapis.com/books/v1/volumes?q=${name}&maxResults=5`, resp => {
			let data = "";
			// A chunk of data has been recieved.
			resp.on("data", chunk => {
				data += chunk;
			});
			//Controlo los posibles errores por aqui
			resp.on("error", error => {
				return error;
			});

			// The whole response has been received. Print out the result.
			resp.on("end", () => {
				// console.log(data);
				return data;
			});
		});
	}

	private openlibraryApi(name: string) {
		return https.get(`https://openlibrary.org/search.json?q=${name}&limit=10&mode=everything`, resp => {
			let data = "";
			// A chunk of data has been recieved.
			resp.on("data", chunk => {
				data += chunk;
			});
			//Controlo los posibles errores por aqui
			resp.on("error", error => {
				return error;
			});

			// The whole response has been received. Print out the result.
			resp.on("end", () => {
				// console.log(data);
				return data;
			});
		});
	}

	private goodReadApi(name: string) {
		return https.get(`https://www.goodreads.com/book/title.xml?title=${name}`, resp => {
			let data = "";
			// A chunk of data has been recieved.
			resp.on("data", chunk => {
				data += chunk;
			});
			//Controlo los posibles errores por aqui
			resp.on("error", error => {
				return error;
			});

			// The whole response has been received. Print out the result.
			resp.on("end", () => {
				// console.log(data);
				return JSON.parse(xml.xml2json(data, { compact: true, spaces: 4 }));
			});
		});
	}
}
