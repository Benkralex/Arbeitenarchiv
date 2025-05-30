var data = [];
fetch('/data/data.json').then(response => response.json()).then(d => {
    data = d;
    update();
}).catch(error => {
    console.error('Error fetching data:', error);
    document.getElementById('exams').innerHTML = '<p>Error loading data.</p>';
});

function update() {
    updateBadges(filter);

    const subjects = [];
    const grade_levels = [];
    const years = [];
    const topics = [];
    const teachers = [];
    
    const examsDiv = document.getElementById('exams');
    examsDiv.innerHTML = "";

    data.forEach((item, index) => {
        // Add unique values to possible filter options
        if (!subjects.includes(item.subject)) subjects.push(item.subject);
        if (!grade_levels.includes(item.grade_level)) grade_levels.push(item.grade_level);
        if (!years.includes(item.year)) years.push(item.year);
        for (const topic of item.topics) {
            if (!topics.includes(topic)) topics.push(topic);
        }
        if (!teachers.includes(item.teacher)) teachers.push(item.teacher);

        // Check if item matches the current filter
        const subjectFilter = filter.subject.length === 0 || filter.subject.some(f => f.toLowerCase() === item.subject.toLowerCase());
        const grade_levelFilter = filter.grade_level.length === 0 || filter.grade_level.includes(item.grade_level.toString());
        const yearFilter = filter.year.length === 0 || filter.year.includes(item.year.toString());
        const teacherFilter = filter.teachers.length === 0 || filter.teachers.some(l => l.toLowerCase() === item.teacher.toLowerCase());
        const searchFilter = filter.search === '' || item.topics.some(topic => topic.toLowerCase().includes(filter.search.toLowerCase()));
        if (!(subjectFilter && grade_levelFilter && yearFilter && teacherFilter && searchFilter)) {
            return;
        }

        examsDiv.innerHTML += getExamDiv(item, index);
    });

    updateFilterDropdowns(filter, subjects, grade_levels, years, teachers);
    
}