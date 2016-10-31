angular.module('nicedo.controllers')
    .controller('NoteDetailCtrl', function ($scope, $state, $stateParams, NotesService) {

        console.log($stateParams.noteId);
        $scope.note = NotesService.getNote($stateParams.noteId);

        $scope.deleteNote = function () {
            NotesService.removeNote($scope.note)
            $state.go('tabs.notes');
        }
    });
