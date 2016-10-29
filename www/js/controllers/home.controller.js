angular.module('nicedo.controllers')
    .controller('HomeCtrl', function ($scope, $ionicModal, $ionicPopup) {
        var dataList;
        $scope.item = {};
        $scope.dataList = [];
        if (window.localStorage.getItem("toDoList")) {
            $scope.dataList = JSON.parse(window.localStorage.getItem("toDoList"));
        }
        console.log('HomeTabCtrl');
        console.log($scope.dataList);
        $ionicModal.fromTemplateUrl('templates/task-editor.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            $scope.modal.show();
        }
        $scope.closeModal = function () {
            $scope.modal.hide();
        }

        $scope.saveData = function () {
            var dataItem = {};
            dataItem.title = $scope.item.title;
            dataItem.description = $scope.item.description;
            console.log(dataList);
            $scope.dataList.push(dataItem);
            window.localStorage.setItem("toDoList", JSON.stringify($scope.dataList));
            var alertPopup = $ionicPopup.alert({
                title: 'To Do Message',
                template: 'To Do Item Saved'
            });
            alertPopup.then(function (res) {
                $scope.modal.hide();
            });
        }
    });
