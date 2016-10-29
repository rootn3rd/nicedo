angular.module('nicedo.controllers')
    .controller('NotesCtrl', function ($scope, NotesService) {

        //$scope.message = NotesService.testMethod();

        $scope.notesList = NotesService.getInitialNotes();

        $scope.removeNote = function(note){
            NotesService.removeNote(note);
            $scope.notesList =  NotesService.getAllNotes();
        };

    });