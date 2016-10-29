angular.module('nicedo.services')

    .service('NotesService', NotesService);

function NotesService() {

    var notesList= [];  

    getInitialNotes = function(){
        this.notesList = [
            { text: "First Note"},
            { text: "Second Note"}];
        return this.notesList;
    };

    getAllNotes = function(){
        return this.notesList;
    }

    addNote = function(note){
    
        if(note && note.text){
            this.notesList.push({note});
            //update the localstorage as well
            console.log("Note added!");
        }
    };

    removeNote = function(note){

        if(note && note.text){
            var noteIndex = this.notesList.findIndex(function(currentNote){
                return currentNote.text === note.text;
            });

            if(noteIndex !== -1){
                this.notesList.splice(noteIndex, 1);
                console.log("Note removed!");
            }else{
                console.log("Note not found!");
            }
        }
    };

    clearAllNotes = function(){
        this.notesList = [];
        //update the localstorage also

    };

    return {
        getInitialNotes: getInitialNotes,
        getAllNotes : getAllNotes,
        addNote : addNote,
        removeNote : removeNote,
        clearAllNotes : clearAllNotes
    };
}    