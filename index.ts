import * as cors from "cors";
import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as https from "https";
import * as xml from "xml-js";

import { User } from "./src/controller/User";
import { createConnection, getRepository, getConnection } from "typeorm";
import { user_book_read } from "./src/entity/BookReadingEntity";
import { Book } from "./src/controller/Book";

const app = express();
app.use(bodyParser.json());

app.use(cookieParser());

/**
 * Creo la conexion de la base de datos con typeorm
 */
createConnection().then(connection => {
	console.log("Conectado a mysql: ", connection.isConnected);
});

const usuario = new User();
usuario.User(app);

const book = new Book();
book.Book(app);

app.get("/api/", (req: Request, res: Response) => {
	res.json("Server funcionando!");
});

app.get("/api/test", async (req: Request, res: Response) => {
	https.get("https://openlibrary.org/search.json?q=los%20juegos%20del%20hambre&limit=10&mode=everything", resp => {
		let data = "";

		// A chunk of data has been recieved.
		resp.on("data", chunk => {
			data += chunk;
		});

		resp.on("error", error => {
			res.send(error);
		});
		// The whole response has been received. Print out the result.
		resp.on("end", () => {
			// console.log(data);
			res.send(JSON.parse(data));
		});
	});
});

app.listen(3000, () => console.log("Server express running 3000"));
