function updateFilterDropdowns(filter, subjects, grade_levels, years, teachers) {
    document.getElementById('dropdown_subject').innerHTML = "<li><a class='dropdown-item' onclick='clearFilter(\"subject\")'>Alle</a></li>";
    document.getElementById('dropdown_grade_level').innerHTML = "<li><a class='dropdown-item' onclick='clearFilter(\"grade_level\")'>Alle</a></li>";
    document.getElementById('dropdown_year').innerHTML = "<li><a class='dropdown-item' onclick='clearFilter(\"year\")'>Alle</a></li>";
    document.getElementById('dropdown_teacher').innerHTML = "<li><a class='dropdown-item' onclick='clearFilter(\"teachers\")'>Alle</a></li>";

    for (const subject of subjects) {
        if (filter.subject.includes(subject)) continue;
        document.getElementById('dropdown_subject').innerHTML += `<li>
            <a class="dropdown-item" onclick="addFilter('subject', '${subject}')">
                ${subject}
            </a>
        </li>`;
    }
    for (const grade_level of grade_levels) {
        if (filter.grade_level.includes(String(grade_level))) continue;
        document.getElementById('dropdown_grade_level').innerHTML += `<li>
            <a class="dropdown-item" onclick="addFilter('grade_level', '${grade_level}')">
                ${grade_level}
            </a>
        </li>`;
    }
    for (const year of years) {
        if (filter.year.includes(String(year))) continue;
        document.getElementById('dropdown_year').innerHTML += `<li>
            <a class="dropdown-item" onclick="addFilter('year', '${year}')">
                ${year}
            </a>
        </li>`;
    }
    for (const l of teachers) {
        if (filter.teachers.includes(l)) continue;
        document.getElementById('dropdown_teacher').innerHTML += `<li>
            <a class="dropdown-item" onclick="addFilter('teachers', '${l}')">
                ${l}
            </a>
        </li>`;
    }
}