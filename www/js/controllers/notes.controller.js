angular.module('nicedo.controllers')
    .controller('NotesCtrl', function ($scope, NotesService) {

        $scope.notesList = NotesService.getAllNotes();

        $scope.removeNote = function (note) {
            NotesService.removeNote(note);
        };

        $scope.addNote = function (text) {
            NotesService.addNote({ text: text });
        };
    });