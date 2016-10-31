angular.module('nicedo.controllers')
    .controller('HomeCtrl', function ($scope, $ionicModal, $ionicPopup, ionicDatePicker, ionicTimePicker) {
        var dataList;

        $scope.showTimer = true;
        $scope.inputModalTitle = "Task Editor";

        $scope.item = {};
        $scope.item.date = 'Select date..';
        $scope.item.time = 'Select time..';
        $scope.dataList = [];
        if (window.localStorage.getItem("toDoList")) {
            $scope.dataList = JSON.parse(window.localStorage.getItem("toDoList"));
        }
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

        $scope.openDateModal = function () {
            var ipObj1 = {
                callback: function (val) {  //Mandatory

                    var selectedDate = new Date(val);
                    var displayDate = selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear();
                    $scope.item.date = displayDate;
                    $scope.item.actualDate = selectedDate;
                },
                inputDate: new Date()
            };
            ionicDatePicker.openDatePicker(ipObj1);
        }

        $scope.openTimeModal = function () {

            var ipObj1 = {
                callback: function (val) {      //Mandatory
                    if (typeof (val) === 'undefined') {
                        console.log('Time not selected');
                    } else {
                        var selectedTime = new Date(val * 1000);
                        var hours = selectedTime.getUTCHours();
                        hours = hours % 12;
                        hours = hours ? hours : 12;
                        var mins = selectedTime.getUTCMinutes() < 10 ? "0" + selectedTime.getUTCMinutes() : selectedTime.getUTCMinutes();
                        var ampm = selectedTime.getUTCHours() >= 12 ? 'PM' : 'AM';
                        $scope.item.time = hours + ":" + mins + " " + ampm;
                        $scope.item.actualTime = selectedTime;

                    }
                },
                inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60))
                // format: 12,         //Optional
                // step: 15,           //Optional
                // setLabel: 'Set'    //Optional
            };

            ionicTimePicker.openTimePicker(ipObj1);
        }
    });