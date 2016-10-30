angular.module('nicedo.controllers')
    .controller('HomeCtrl', function ($scope, $ionicModal, $ionicPopup, ionicDatePicker, ionicTimePicker) {
        var dataList;


        $scope.item = {};
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
                    console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                },
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
                        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                    }
                }
                // inputTime: 50400,   //Optional
                // format: 12,         //Optional
                // step: 15,           //Optional
                // setLabel: 'Set'    //Optional
            };

            ionicTimePicker.openTimePicker(ipObj1);
        }
    });