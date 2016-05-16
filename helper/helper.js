
/**
 * This file provides all helper functionality for the note project.
 *
 * @version 1.0
 *
 * @requires fs
 * @requires path
 *
 */

var fs = require('fs');
var path = require('path');

var helper = {
	
	noteShelf : [],

	noteCounter : 0,
	
	fileName : ".\\documents\\noteShelf.json",
	
	logTarget : "C",
	logLevel : {
		info : "[INFO] ",
		error : "[ERROR] "
	},
	logInfo : true,
	
	/**
   * Add a note to noteShelf
   * @param {Object} noteAttrib request body object
   */
	addNote : function(noteAttrib) {
		try {
			var note = helper.fillNote(noteAttrib);
			helper.noteShelf.push(note);
		} catch(e) {
			helper.logger(helper.logLevel.error,"helper addNote: " + e);
		}
	},
	
	/**
   * Fill note record.
   * @param {Object} noteAttrib request body object
   */
	fillNote : function(noteAttrib) {
		try {
			helper.noteCounter++;
			
			var note = {};
			note.noteid = helper.noteCounter;
			
			// note attributes
			note.title = noteAttrib.title;
			note.author = noteAttrib.author;
			note.entry = noteAttrib.entry;
			//
	
			return note;
		} catch(e) {
			helper.logger(helper.logLevel.error,"helper fillNote: " + e);
		}
	},

	/**
   * Delete note.
   * @param {Number} entryID note id which is to be deleted
   */
	deleteNote : function(entryID) {
		try {
			helper.logger(helper.logLevel.info,"Gelöscht: entryID=" + entryID);
			helper.noteCounter--;
			helper.noteShelf.splice(entryID,1);
		} catch (e) {
			helper.logger(helper.logLevel.error,"helper deleteNote: " + e);
		}
	},
	
	/**
   * Get whole noteShelf, or one record of noteShelf.
   * @param {Number} entryID note id which is to be deleted
	 * @return {Object} noteShelf object or one noteSelf record
   */
	getNoteShelf : function(entryID) {
		try {
			if (entryID) {
				return helper.noteShelf[entryID];
			} else {
				return helper.noteShelf;
			}
		} catch(e) {
			helper.logger(helper.logLevel.error,"helper getNoteShelf: " + e);			
		}
	},
	
	/**
   * Reset noteShelf to blank array.
   */
	resetNoteShelf : function() { 
		try {
			helper.noteShelf = [];	
		} catch(e) {
			helper.logger(helper.logLevel.error,"helper resetNoteShelf: " + e);	
		}
	},

	/**
   * Load notes from file to noteShelf object.
 	 * @return {Boolean} False if an error occoured, true if not.
   */	
	loadNotes: function() {
		try {
			helper.logger(helper.logLevel.info,"loadNotes from: " + helper.fileName + " in helper.noteShelf[]");
			helper.noteShelf = JSON.parse(fs.readFileSync(helper.fileName));
			helper.noteCounter = helper.noteShelf[helper.noteShelf.length-1].noteid;
			return true;
		} catch(e) {
			helper.logger(helper.logLevel.error,"helper loadNotes: " + e);
			return false;
		}
	},

	/**
   * Save notes to a file.
 	 * @return {Boolean} False if an error occoured, true if not.
   */		
	saveNotes: function() {
		try {
			helper.logger(helper.logLevel.info,"saveNotes to: " + helper.fileName );
			fs.writeFileSync(helper.fileName, JSON.stringify(helper.noteShelf,null,2));
			return true;
		} catch(e) {
			helper.logger(helper.logLevel.error,"helper saveNotes: " + e);	
			return false;
		}
	},

	/**
   * Check the presence of a note in the noteShelf.
 	 * @return {Number} Note id or -1.
   */		
	checkNotes : function(checkID) {
		try {
			helper.logger(helper.logLevel.info,"Anzahl notes: " + helper.noteShelf.length);
			var found = -1;
			for (var i = 0; i < helper.noteShelf.length; i++) {
				helper.logger(helper.logLevel.info,"i=" + i + " - noteid=" + helper.noteShelf[i].noteid + " - checkID=" + checkID);
				if (helper.noteShelf[i].noteid == checkID) {
					helper.logger(helper.logLevel.info,"yes");
					return i;
				} else {
					helper.logger(helper.logLevel.info,"no");
				}
			}
			return found;
		} catch(e) {
			helper.logger(helper.logLevel.error,"helper checkNotes: " + e);
		}
	},

	/**
   * Logger method.
   */		
	logger : function(level, text) {
		
		if (helper.logTarget == "C") {					// console
			if ((helper.logInfo && level == helper.logLevel.info) || level == helper.logLevel.error) {
				console.log(level + text);
			}
		} else if (helper.logTarget == "D") {		// database
			// todo
		}
		
	}, 

	/**
   * Toggle logtype on/off.
	 * @return {Boolean} toggled logtype.
   */			
	toggleLogInfo : function() {
		helper.logInfo = !helper.logInfo;
		return helper.logInfo;
	}
	
}

module.exports = {
	
	checkNotes : helper.checkNotes,
	addNote : helper.addNote,
	deleteNote : helper.deleteNote,
	
	getNoteShelf : helper.getNoteShelf,
	resetNoteShelf : helper.resetNoteShelf,
	
	toggleLogInfo : helper.toggleLogInfo,
	
	logger : helper.logger,
	logLevel : helper.logLevel,
	
	loadNotes : helper.loadNotes,
	saveNotes : helper.saveNotes,
	
}