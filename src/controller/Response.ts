import { Response } from "express";
export class ResponseClass {
	constructor(res: Response, code: number, msg: string) {
		res.status(code);
		res.send({ code: code, msg: msg });
	}
}
