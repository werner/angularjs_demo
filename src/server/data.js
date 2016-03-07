module.exports = {
    people: getPeople(),
    taxonomies: getTaxonomies()
};

function getPeople() {
    return [
        {id: 1, firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida'},
        {id: 2, firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California'},
        {id: 3, firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York'},
        {id: 4, firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota'},
        {id: 5, firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota'},
        {id: 6, firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina'},
        {id: 7, firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming'},
        {id: 8, firstName: 'Aaron', lastName: 'Jinglehiemer', age: 22, location: 'Utah'}
    ];
}

function getTaxonomies() {
    return [
        {id: 1, code: '01', title: 'Marital Status', father: 'null'},
        {id: 2, code: '02', title: 'Single',         father: 'Marital Status'},
        {id: 3, code: '03', title: 'Married',        father: 'Marital Status'},
        {id: 4, code: '04', title: 'Divorced',       father: 'Marital Status'},
        {id: 5, code: '05', title: 'Widowed',        father: 'Marital Status'}
    ];
}

