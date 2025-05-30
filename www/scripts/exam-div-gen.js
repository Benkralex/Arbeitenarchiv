function getExamDiv(item, index) {
    const carouselId = `carousel${index}`;

        var indicators = item.images.map((_, i) => `
            <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${i}" class="${i === 0 ? 'active' : ''}" aria-current="${i === 0 ? 'true' : 'false'}" aria-label="Slide ${i + 1}" style="background-color: #000;"></button>
        `).join('');
        var controls_visible = '';
        if (item.images.length === 1) {
            indicators = '';
            controls_visible = 'display: none;';
        };

        const images = item.images.map((bild, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <div class="image-wrapper">
                    <!--img src="/data/light.png" class="background-img" alt="..."-->
                    <div class="background-img"></div>
                    <img src="/data/${bild}" class="foreground-image" alt="...">
                </div>
            </div>
        `).join('');

        if (!item.topics || item.topics.length == 0) {
            var topics_list = `<li class="list-group-item">Keine Themen vorhanden</li>`
        } else {
            var topics_list = item.topics.map((topic) => `<li class="list-group-item">${topic}</li>`).join('');
        }

        const card = `
            <div class="card mb-3" style="width: 18rem;">
                <div class="card-img-top">
                    <div id="${carouselId}" class="carousel slide">
                        <div class="carousel-indicators">
                            ${indicators}
                        </div>
                        <div class="carousel-inner">
                            ${images}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev" style="filter: invert(1); ${controls_visible}">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next" style="filter: invert(1); ${controls_visible}">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div class="card-body" style="max-height: 100px;">
                    <span class="badge rounded-pill text-bg-primary m-1 p-2" style="min-width: 40px;">${item.subject}</span>
                    <span class="badge rounded-pill text-bg-success m-1 p-2" style="min-width: 40px;">${item.grade_level}. Klasse</span><br>
                    <span class="badge rounded-pill text-bg-danger m-1 p-2" style="min-width: 40px;">${item.year}</span>
                    <span class="badge rounded-pill text-bg-info m-1 p-2" style="min-width: 40px;">${item.teacher}</span>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Themen</b></li>
                    ${topics_list}
                </ul>
                <div class="flex-grow-1" style="min-height:0px;"></div>
                <div class="card-body" style="max-height: 70px;">
                    <a href="/arbeit?id=${item.id}" class="card-link btn btn-primary">Anschauen</a>
                </div>
            </div>
        `;
    return card;
}