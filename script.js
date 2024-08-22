document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById('data-table');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderTable(data, table);
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
        });
});

function renderTable(data, table) {
    const { headers, rows } = data;

    const thead = table.createTHead();
    const tbody = table.createTBody();

    const headerRow = thead.insertRow();
    headers.forEach(header => {
        const th = document.createElement('th');
        th.colSpan = header.colspan || 1;
        th.rowSpan = header.rowspan || 1;
        th.innerText = header.text;
        headerRow.appendChild(th);
    });

    rows.forEach(row => {
        const tr = tbody.insertRow();
        row.forEach(cell => {
            const td = document.createElement('td');
            td.colSpan = cell.colspan || 1;
            td.rowSpan = cell.rowspan || 1;
            td.innerText = cell.text;
            tr.appendChild(td);
        });
    });
}
