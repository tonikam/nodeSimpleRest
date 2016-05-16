
/**
 * This file provides all routes for the note project.
 *
 * @version 1.0
 *
 * @requires helper/helper.js
 *
 */

var helper = require("../helper/helper.js");

var ourAppRouter = function(app) {
	
	app.get("/", function(req, res) {
		res.send("Welcome to this site!");
	});
	
	app.get("/toggleLogInfo", function(req, res) {
		try {
			var currentLogInfo = helper.toggleLogInfo();
			res.send("New log info flag: " + currentLogInfo);
		} catch(e) {
			helper.logger(helper.logLevel.error,"route get /toggleLogInfo: " + e);
		}
	});
	
	app.get("/loadNotes", function(req, res) {
		try {
			var retValue = helper.loadNotes();
			if (retValue == true) {
				helper.logger(helper.logLevel.info,"loadFile - retValue: " + retValue);
				res.send("File loaded .. ");				
			} else {
				res.send("File load error!")
			}

		} catch (e) {
			helper.logger(helper.logLevel.error,"route get /loadFile: "+ e);
			helper.noteShelf = [];
		}
	});
	
	app.get("/saveNotes", function(req, res) {
		try {
			var retValue = helper.saveNotes();
			if (retValue == true) {
				helper.logger(helper.logLevel.info,"saveFile - retValue: " + retValue);
				res.send("File saved .. ");
			} else {
				res.send("File save error!");
			}
		} catch (e) {
			helper.logger(helper.logLevel.error,"route get /saveFile: "+ e);
			helper.noteShelf = [];
		}
	});
	
	app.get("/notebook", function(req, res) {
	
		try {
			var checkedID = helper.checkNotes(req.query.noteid);
			
			if (!req.query.noteid) {
				return res.send({"status": "Fehler", "message": "Keine ID"});
			} else if (checkedID == -1) {
				return res.send({"status": "Fehler", "message": "Unbekannte ID"});
			} else {
				return res.send(helper.getNoteShelf(checkedID));
			}
		} catch(e) {
			helper.logger(helper.logLevel.error,"route get /notebook: " + e);
		}
		
	});
	
	app.get("/notebookall", function(req, res) {
		
		try {
			helper.logger(helper.logLevel.info,"Zeige alle");
			return res.send(helper.getNoteShelf());
		} catch(e) {
			helper.logger(helper.logLevel.error,"route get /notebookall: " + e);
		}
	});

	app.get("/notebookDelete", function(req, res) {

		try {
			var checkedID = helper.checkNotes(req.query.noteid);
		
			if (!req.query.noteid) {
				return res.send({"status": "Fehler", "message": "Keine ID"});
			} else if (checkedID == -1) {
				return res.send({"status": "Fehler", "message": "Unbekannte ID"});
			} else {
				helper.deleteNote(checkedID);
				
				return res.send(helper.getNoteShelf());
			}
		} catch(e) {
			helper.logger(helper.logLevel.error,"route get /notebookDelete: " + e);
		}
		
		console.log("delete end");
		
	});	
	
	app.post("/notebook", function(req, res) {
		try {
			if (!req.body.title || !req.body.author || !req.body.entry ) {
				helper.logger(helper.logLevel.info,"Es fehlt mindestens ein Attribut zur Notiz!");
				
				return res.send({"status": "Fehler", "message": "Es fehlt mindestens ein Attribut zur Notiz!"});
			} else {
				helper.addNote(req.body);
				helper.logger(helper.logLevel.info,"Neue Notiz: " + req.body.title + " - " + req.body.author + " - " + req.body.entry);
				
				return res.send(req.body);
			}
		} catch(e) {
			helper.logger(helper.logLevel.error,"route post /notebook: " + e);
		}
	});
	
}

module.exports = ourAppRouter;
