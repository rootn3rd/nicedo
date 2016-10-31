angular.module('nicedo.services')

    .service('NotesService', NotesService);

function NotesService(StorageService) {

    var nextNoteId = -1;
    var seedDatabase = function () {

        StorageService.removeAll();
        StorageService.add({
            id: 1,
            title: "Item1",
            description: "This is a sample note"
        });
        StorageService.add({
            id: 2,
            title: "Item2",
            description: "This is a another note"
        });
        StorageService.add({
            id: 3,
            title: "Item3",
            description: "This is a new note"
        });

    };
    //comment the below line when you need persistence
    seedDatabase();

    var getAllNotes = function () {
        return StorageService.getAll();
    };

    var addNote = function (note) {
        var idToBeAssigned = 0;
        if (note && note.title && note.description) {

            if (this.nextNoteId && this.nextNoteId != -1) {
                idToBeAssigned = parseInt(this.nextNoteId) + 1;
            } else {
                idToBeAssigned = this.generateNoteId();
            }

            note.id = idToBeAssigned;
            this.nextNoteId = idToBeAssigned;

            StorageService.add(note);
            console.log("Note added!");
        }
    };

    var removeNote = function (note) {

        if (note && note.title && note.description) {
            StorageService.remove(note);
            console.log("Note removed!");
        }
    };

    var clearAllNotes = function () {
        StorageService.removeAll();
    };


    var generateNoteId = function () {
        var list = this.getAllNotes();
        var highestObject = list.reduce(function (acc, curr) {
            return (acc < curr) ? acc : curr;
        }, 0);

        return highestObject ? highestObject.id + 1 : 1;

    }

    var getNote = function (noteId) {
        var note = {};
        if (noteId && noteId !== -1) {

            var list = this.getAllNotes();

            note = list.find(function (n) {
                return n.id == noteId;
            });

            /*for (var i = 0; i < list.length; i++) {
                if (list[i].id === noteId) {
                    note = list[i];
                    break;
                }
            }*/
        }

        console.log(note);
        return note;
    }

    return {
        getNote: getNote,
        getAllNotes: getAllNotes,
        generateNoteId: generateNoteId,
        addNote: addNote,
        removeNote: removeNote,
        clearAllNotes: clearAllNotes
    };
}    