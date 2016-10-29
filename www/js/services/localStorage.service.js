angular.module('nicedo.services')

    .service('StorageService', StorageService);

function  StorageService($localStorage){
    $localStorage = $localStorage.$default({
        notes: []
    });

    var _getAll = function () {
        return $localStorage.notes;
    };

    var _add = function (thing) {
        $localStorage.notes.push(thing);
    };

    var _remove = function (thing) {
        $localStorage.notes.splice($localStorage.notes.indexOf(thing), 1);
    };
    
    var _removeAll = function () {
        $localStorage.notes =[];
    };

    return {
        getAll: _getAll,
        add: _add,
        remove: _remove,
        removeAll : _removeAll
    };
}
