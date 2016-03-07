/* jshint -W079 */
var mockData = (function() {
    return {
        getMockPeople: getMockPeople,
        getMockStates: getMockStates,
        getMockTaxonomies: getMockTaxonomies
    };

    function getMockStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }
        ];
    }

    function getMockPeople() {
        return [
            {firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida'},
            {firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California'},
            {firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York'},
            {firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota'},
            {firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota'},
            {firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina'},
            {firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming'}
        ];
    }

    function getMockTaxonomies() {
        return [
            {id: 1, code: '01', title: 'Marital Status', father: 'null'},
            {id: 2, code: '02', title: 'Single',         father: 'Marital Status'},
            {id: 3, code: '03', title: 'Married',        father: 'Marital Status'},
            {id: 4, code: '04', title: 'Divorced',       father: 'Marital Status'},
            {id: 5, code: '05', title: 'Widowed',        father: 'Marital Status'}
        ];
    }

})();
