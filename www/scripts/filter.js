const filter = {
    subject: [],
    grade_level: [],
    year: [],
    teachers: [],
    search: '',
};

function addFilter(type, value) {
    if (!filter[type].includes(value)) {
        filter[type].push(value);
        update();
    }
}
function removeFilter(type, value) {
    filter[type] = filter[type].filter(v => v !== value);
    update();
}
function clearFilter(type) {
    filter[type] = [];
    update();
}
function setSearch(value) {
    filter.search = value.toLowerCase();
    update();
}