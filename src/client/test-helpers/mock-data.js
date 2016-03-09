/* jshint -W079 */
var mockData = (function() {
    return {
        getMockStates: getMockStates,
        getMockTaxonomies: getMockTaxonomies,
        getMockTaxonomy: getMockTaxonomy
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

    function getMockTaxonomies() {
        return [
            {id: 1, code: '01', title: 'Marital Status', father: 'null'},
            {id: 2, code: '02', title: 'Single',         father: 'Marital Status'},
            {id: 3, code: '03', title: 'Married',        father: 'Marital Status'},
            {id: 4, code: '04', title: 'Divorced',       father: 'Marital Status'},
            {id: 5, code: '05', title: 'Widowed',        father: 'Marital Status'}
        ];
    }

    function getMockTaxonomy() {
        return {id: 1, title: 'test', code: 'codeTest'};
    }

})();
