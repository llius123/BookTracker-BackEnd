import * as cors from "cors";
import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as request from "request";
import * as https from "https";

import { User } from "./src/controller/User";
import { createConnection, getRepository, getConnection } from "typeorm";
import { user_book_read } from "./src/entity/BookReadingEntity";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

/**
 * Creo la conexion de la base de datos con typeorm
 */
createConnection().then(connection => {
	console.log("Conectado a mysql: ", connection.isConnected);
});

const usuario = new User();
usuario.User(app);

app.get("/", (req: Request, res: Response) => {
	res.json("Server funcionando!");
});

app.get("/test", async (req: Request, res: Response) => {
	https.get("https://www.googleapis.com/books/v1/volumes?q=elantris&maxResults=1", resp => {
		let data = "";

		// A chunk of data has been recieved.
		resp.on("data", chunk => {
			data += chunk;
		});

		// The whole response has been received. Print out the result.
		resp.on("end", () => {
			// console.log(data);
			res.send(JSON.parse(data))
		});
	});
});

app.listen(3000, () => console.log("Server express running 3000"));
