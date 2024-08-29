/*
 * File: server.cjs
 * Project: starlight_frontend
 * File Created: Monday, 12th February 2024 6:01:10 pm
 * -----
 * Last Modified: 29.08.2024, 11:08:73
 * Modified By: MAX809
 */

// const express = require("express");
// const bodyParser = require("body-parser");
// const path = require("node:path");
// const app = express();
// const expressStaticGzip = require("express-static-gzip");

// import bodyParser from "body-parser";
import path from "node:path";
import express from "express";
import expressStaticGzip from "express-static-gzip";

const app = express();

// app.use(express.static(path.join(__dirname, "build")));
app.use(expressStaticGzip(path.join(__dirname, "build"), {}));

app.get("/", (_req, res) => {
	// console.log(__dirname);
	res.setHeader("Content-Type", "text/html; charset=utf-8");
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/*", (_req, res) => {
	// console.log(__dirname);
	res.setHeader("Content-Type", "text/html; charset=utf-8");
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = 4900;
// const port = 1111;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
