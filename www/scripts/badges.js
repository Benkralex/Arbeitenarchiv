function updateBadges(filter) {
    const filterDiv = document.getElementById('filter');
    filterDiv.innerHTML = "";
    for (const subject of filter.subject) {
        const badge = document.createElement('span');
        badge.className = 'badge rounded-pill text-bg-primary m-1 p-2';
        badge.style.cursor = 'pointer';
        badge.style.minWidth = '40px';
        badge.innerText = subject;
        badge.onclick = () => {
            filter.subject = filter.subject.filter(f => f !== subject);
            badge.remove();
            update();
        };
        filterDiv.appendChild(badge);
    }
    for (const grade_level of filter.grade_level) {
        const badge = document.createElement('span');
        badge.className = 'badge rounded-pill text-bg-success m-1 p-2';
        badge.style.cursor = 'pointer';
        badge.style.minWidth = '40px';
        badge.innerText = grade_level;
        badge.onclick = () => {
            filter.grade_level = filter.grade_level.filter(s => s !== grade_level);
            badge.remove();
            update();
        };
        filterDiv.appendChild(badge);
    }
    for (const year of filter.year) {
        const badge = document.createElement('span');
        badge.className = 'badge rounded-pill text-bg-danger m-1 p-2';
        badge.style.cursor = 'pointer';
        badge.style.minWidth = '40px';
        badge.innerText = year;
        badge.onclick = () => {
            filter.year = filter.year.filter(j => j !== year);
            badge.remove();
            update();
        };
        filterDiv.appendChild(badge);
    }
    for (const teacher of filter.teachers) {
        const badge = document.createElement('span');
        badge.className = 'badge rounded-pill text-bg-info m-1 p-2';
        badge.style.cursor = 'pointer';
        badge.style.minWidth = '40px';
        badge.innerText = teacher;
        badge.onclick = () => {
            filter.teachers = filter.teachers.filter(l => l !== teacher);
            badge.remove();
            update();
        };
        filterDiv.appendChild(badge);
    }
}