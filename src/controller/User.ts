import { ResponseEntity } from "./../entity/ResponseEntity";
import { getConnection, getRepository } from "typeorm";
import { user } from "../entity/UserEntity";
import { Request, Response } from "express";
import { ResponseClass } from "./Response";
import * as jwt from "jsonwebtoken";

export class User {
	public User(app) {
		app.get("/api/register/:email/:username/:password", (req: Request, res: Response) => {
			this.registrar(req, res);
		});

		app.get("/api/login/:username/:password", (req: Request, res: Response) => {
			this.login(req, res);
		});

		app.get("/api/checkcookie", (req: Request, res: Response) => {
			if (req.cookies.token) {
				var decoded = jwt.verify(req.cookies.token, "secret");
				res.json(decoded);
			} else {
				res.json("Ho hay cookie!");
			}
		});

		app.get("/clearcookie", (req: Request, res: Response) => {
			res.clearCookie("token");
			res.json("Cookie limpia");
		});
	}

	/**
	 * Login + añado sesion
	 * @param req Request
	 * @param res Response
	 */
	private async login(req: Request, res: Response) {
		const usuario = await getConnection()
			.getRepository(user)
			.findOne({ username: req.params.username, password: req.params.password });
		if (usuario) {
			const token = jwt.sign({ usuario: usuario }, "secret", { expiresIn: "1h" });
			res.cookie("token", token);
			new ResponseClass(res, 200, "Login correcto!");
		} else {
			new ResponseClass(res, 400, "Login incorrecto!");
		}
	}
	/**
	 * Registro un nuevo usuario en labase de datos
	 * @param req Request
	 * @param res Response
	 */
	private async registrar(req: Request, res: Response) {
		const usuario = await getConnection()
			.getRepository(user)
			.findOne({ email: req.params.email });
		if (usuario) {
			new ResponseClass(res, 400, "Ese email ya esta en uso!");
		} else {
			await getConnection()
				.getRepository(user)
				.save({
					id: null,
					email: req.params.email,
					username: req.params.username,
					password: req.params.password,
					book_read: 0,
					book_pending: 0,
					book_favorite: 0,
					token: this.generateToken(255)
				})
				.then(value => {
					return new ResponseClass(res, 200, "Registro compeltado!");
				})
				.catch(error => {
					return new ResponseClass(res, 500, error);
				});
		}
	}

	/**
	 * Genero un token
	 * @param tamaño Numero de caracteres del token
	 */
	private generateToken(tamaño: number) {
		//edit the token allowed characters
		var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
		var b = [];
		for (var i = 0; i < tamaño; i++) {
			var j = (Math.random() * (a.length - 1)).toFixed(0);
			b[i] = a[j];
		}
		return b.join("");
	}
}
