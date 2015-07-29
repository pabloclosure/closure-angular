var app = angular.module('closureAngular', []);





app.directive('clickSelectsOne', clickSelectsOne);

function clickSelectsOne() {
    var directive = {
        restrict: 'A',
        scope: {
            'selectClass': '@'
        },
        controller: ['$scope', controller]
    };

    return directive;

    function controller($scope) {
        var self = this,
            selectables = self.selectables = [],
            selectClass = $scope.selectClass || 'active';

        self.select = function(elem) {
            angular.forEach(selectables, function(elem) {
                elem.removeClass(selectClass);
            });
            elem.addClass(selectClass);
        }

        self.registerSelectable = function(elem) {
            if (selectables.length === 0) {
                self.select(elem);
            }
            selectables.push(elem);
        }

    }
}

app.directive('clickSelectable', clickSelectable);

function clickSelectable() {
    var directive = {
        restrict: 'A',
        require: '^clickSelectsOne',
        link: function(scope, elem, attrs, parentCtrl) {
            parentCtrl.registerSelectable(elem);

            elem.on('click', function() {
                parentCtrl.select(elem);
            });
        }
    };

    return directive;
}
