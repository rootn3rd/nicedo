angular.module('nicedo.services')

    .service('NotesService', NotesService);

function NotesService(StorageService) {

     var seedDatabase = function(){
        
        StorageService.removeAll();
        StorageService.add({ text:"Local Store"});
        StorageService.add({ text: "First Note"});
        StorageService.add({ text: "Second Note"});

    };
    //comment the below line when you need persistence
    seedDatabase();

    var getAllNotes = function(){
        return StorageService.getAll();
    };

    var addNote = function(note){
    
        if(note && note.text){
            StorageService.add(note);
            console.log("Note added!");
        }
    };

    var removeNote = function(note){
        console.log(note);
        if(note && note.text){
            StorageService.remove(note);
        }
    };

    var clearAllNotes = function(){
       StorageService.removeAll();
    };

    return {
        getAllNotes : getAllNotes,
        addNote : addNote,
        removeNote : removeNote,
        clearAllNotes : clearAllNotes
    };
}    