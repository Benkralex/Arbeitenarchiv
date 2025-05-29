const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id) {
    document.getElementById('heading').innerText += ' - ' + (parseInt(id) + 1);
    fetch(`/data/data.json`)
        .then(response => response.json())
        .then(data => {
            data = data.find(item => item.id == id);
            if (data) {
                if (!data.topics || data.topics.length == 0) {
                    topics_list = `<li class="list-group-item list-group-item-primary">Keine Themen vorhanden</li>`
                } else {
                    topics_list = data.topics.map((topic) => `<li class="list-group-item list-group-item-primary">${topic}</li>`).join('');
                }

                document.getElementById('information').innerHTML = `
                    <div class="mb-2">
                        <span class="badge rounded-pill text-bg-primary m-1 p-2" style="min-width: 40px;">${data.subject}</span>
                        <span class="badge rounded-pill text-bg-success m-1 p-2" style="min-width: 40px;">${data.grade_level}. Klasse</span>
                        <span class="badge rounded-pill text-bg-danger m-1 p-2" style="min-width: 40px;">${data.year}</span>
                        <span class="badge rounded-pill text-bg-info m-1 p-2" style="min-width: 40px;">${data.teacher}</span>
                    </div>
                    <ul class="list-group" style="max-width: 400px; margin-right: 40px;">
                        <li class="list-group-item list-group-item-danger"><b>Themen</b></li>
                        ${topics_list}
                    </ul>`;
                for (const pic of data.images) {
                    const link = document.createElement('a');
                    link.setAttribute('data-bs-toggle', 'modal');
                    link.setAttribute('data-bs-target', '#'+pic);
                    link.href = "/data/" + pic;
                    link.target = "_blank";
                    const img = document.createElement('img');
                    img.src = "/data/" + pic;
                    console.log(img.src);
                    img.width = 200;
                    img.style.margin = '5px';
                    link.appendChild(img);
                    document.getElementById('images').appendChild(link);
                    const modal = document.createElement('div');
                    modal.className = 'modal-dialog modal-dialog-centered fade';
                    modal.id = pic;
                    modal.innerHTML = `
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <img src="/data/${pic}" class="modal-content" style="max-width: 100%; max-height: 100%;">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(modal);
                }
            } else {
                document.getElementById('information').innerHTML = '<p>No data found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('information').innerHTML = '<p>Error loading data.</p>';
        });
} else {
    document.getElementById('information').innerHTML = '<p>No ID provided in the URL.</p>';
}