angular.module('nicedo.controllers')
    .controller('NotesCtrl', function ($scope, $ionicModal, $ionicPopup, NotesService) {

        $scope.item = {};
        $scope.showTimer = false;
        $scope.inputModalTitle = "Add Note";

        $ionicModal.fromTemplateUrl('templates/task-editor.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            $scope.modal.show();
        };

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        $scope.saveData = function () {
            var dataItem = {};
            dataItem.title = $scope.item.title;
            dataItem.description = $scope.item.description;

            NotesService.addNote({
                title: dataItem.title,
                description: dataItem.description
            });

            $scope.item = {};

            var alertPopup = $ionicPopup.alert({
                title: 'Note saved',
                template: 'New Note Saved'
            });
            alertPopup.then(function (res) {
                $scope.modal.hide();
            });

        };

        $scope.notesList = NotesService.getAllNotes();

        $scope.removeNote = function (note) {
            NotesService.removeNote(note);
        };

        $scope.editNote = function (note) {
            //NotesService.addNote(note);
            var alertPopup = $ionicPopup.alert({
                title: 'Coming Soon..',
                template: 'Feature coming up shortly'
            });
        };
    });