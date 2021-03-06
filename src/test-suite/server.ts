import { Server } from "http";
import * as express from 'express';
import { readFileSync } from 'fs';
import * as ejs from 'ejs';
import * as path from 'path';
import { TodoAppData } from './';

export const startServer = (port: number): Promise<Server> => {

	const app = express();

	return new Promise((resolve) => {

		app.use(express.static('node_modules'));
		app.use(express.static('dist/test-suite'));

		app.get('/', (req, res) => {
			const template = readFileSync(path.resolve(__dirname, 'index.ejs'), 'utf-8');
			res.send(ejs.render(template, {initData: req.query.data}));
		});

		const server = app.listen(port);
		resolve(server);
	});
};

export const getUrl = (data: TodoAppData) => {
	const str = JSON.stringify(data);
	const b64 = Buffer.from(str).toString('base64');
	return '/?data=' + b64;
};

