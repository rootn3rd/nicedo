angular.module('nicedo.controllers')
    .controller('HomeCtrl', function ($scope, $ionicModal, $ionicPopup, ionicDatePicker, ionicTimePicker, $cordovaDatePicker, $ionicPlatform) {
        var dataList;

        $scope.showTimer = true;
        $scope.inputModalTitle = "Task Editor";

        $scope.item = {};
        $scope.item.date = 'Select date..';
        $scope.item.time = 'Select time..';
        $scope.dataList = [];
        populateUpcomingPendingList();

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
            dataItem.date = $scope.item.date;
            dataItem.time = $scope.item.time;
            dataItem.actualDate = $scope.item.actualDate;
            dataItem.actualTime = $scope.item.actualTime;
            $scope.dataList.push(dataItem);
            window.localStorage.setItem("toDoList", JSON.stringify($scope.dataList));

            var alertPopup = $ionicPopup.alert({
                title: 'Message',
                template: 'Reminder Saved'
            });
            alertPopup.then(function (res) {
                $scope.modal.hide();
                populateUpcomingPendingList();
            });
        }
        $ionicPlatform.ready(function () {
            $scope.openDateModal = function () {
                // var ipObj1 = {
                //     callback: function (val) {  //Mandatory

                //         var selectedDate = new Date(val);
                //         var displayDate = selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear();
                //         $scope.item.date = displayDate;
                //         $scope.item.actualDate = selectedDate;
                //     },
                //     inputDate: new Date()
                // };
                // ionicDatePicker.openDatePicker(ipObj1);
                var options = {
                    date: new Date(),
                    mode: 'date', // or 'time'
                    allowOldDates: false,
                    allowFutureDates: true,
                    doneButtonLabel: 'Set',
                    doneButtonColor: '#F2F3F4',
                    cancelButtonLabel: 'Cancel',
                    cancelButtonColor: '#000000'
                };

                $cordovaDatePicker.show(options).then(function (date) {
                    $scope.item.actualDate = date;
                    $scope.item.date = date.toLocaleDateString();
                });
            }
        });
        $ionicPlatform.ready(function () {
            $scope.openTimeModal = function () {

                // var ipObj1 = {
                //     callback: function (val) {      //Mandatory
                //         if (typeof (val) === 'undefined') {
                //             console.log('Time not selected');
                //         } else {
                //             var selectedTime = new Date(val * 1000);
                //             var hours = selectedTime.getUTCHours();
                //             hours = hours % 12;
                //             hours = hours ? hours : 12;
                //             var mins = selectedTime.getUTCMinutes() < 10 ? "0" + selectedTime.getUTCMinutes() : selectedTime.getUTCMinutes();
                //             var ampm = selectedTime.getUTCHours() >= 12 ? 'PM' : 'AM';
                //             $scope.item.time = hours + ":" + mins + " " + ampm;
                //             $scope.item.actualTime = selectedTime;

                //         }
                //     },
                //     inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60))
                //     // format: 12,         //Optional
                //     // step: 15,           //Optional
                //     // setLabel: 'Set'    //Optional
                // };

                // ionicTimePicker.openTimePicker(ipObj1);
                var options = {
                    date: new Date(),
                    mode: 'time', // or 'time'
                    allowOldDates: false,
                    allowFutureDates: true,
                    doneButtonLabel: 'Set',
                    doneButtonColor: '#F2F3F4',
                    cancelButtonLabel: 'Cancel',
                    cancelButtonColor: '#000000'
                };

                $cordovaDatePicker.show(options).then(function (time) {
                    var hours = time.getHours();
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    var mins = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
                    var ampm = time.getHours() >= 12 ? 'PM' : 'AM';
                    $scope.item.time = hours + ":" + mins + " " + ampm;
                    $scope.item.actualTime = time;
                });
            }
        });

        function populateUpcomingPendingList() {
            $scope.upcomingList = [];
            $scope.pendingList = [];
            if (window.localStorage.getItem("toDoList")) {
                $scope.dataList = JSON.parse(window.localStorage.getItem("toDoList"));
                if ($scope.dataList && $scope.dataList.length > 0) {
                    $scope.dataList.forEach(function (item) {
                        if (item.actualDate && item.actualTime) {
                            item.actualDate = new Date(item.actualDate);
                            item.actualTime = new Date(item.actualTime);
                            var tempDate = new Date(item.actualDate.getFullYear(), item.actualDate.getMonth(), item.actualDate.getDate(),
                                item.actualTime.getHours(), item.actualTime.getMinutes(), item.actualTime.getSeconds());
                            var currDate = new Date();
                            if (currDate <= tempDate) {   //upcoming events
                                var diffSeconds = (tempDate.getTime() - currDate.getTime()) / 1000;
                                var sec_num = parseInt(diffSeconds, 10); // don't forget the second param
                                var hours = Math.floor(sec_num / 3600) ? Math.floor(sec_num / 3600) + ' hours' : '';
                                var mins = Math.floor((sec_num - (hours * 3600)) / 60) + ' mins';
                                // var hours = diffSeconds/3600 ? diffDate.getHours() + ' hours' : '';
                                // var mins = diffDate.getMinutes() + 'mins';
                                item.dueInTime = hours + mins;
                                $scope.upcomingList.push(item);
                            }
                            else {   //pending events
                                var diffSeconds = (currDate.getTime() - tempDate.getTime()) / 1000;
                                var sec_num = parseInt(diffSeconds, 10); // don't forget the second param
                                var hours = Math.floor(sec_num / 3600) ? Math.floor(sec_num / 3600) + ' hours' : '';
                                var mins = Math.floor((sec_num - (hours * 3600)) / 60) + ' mins';
                                item.dueInTime = hours + mins;
                                $scope.pendingList.push(item);
                            }
                        }
                    });
                }
            }
        }
    });