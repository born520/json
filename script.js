document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                renderTable(data); // data가 배열인 경우
            } else {
                console.error('Unexpected JSON format: data should be an array');
            }
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

function renderTable(data) {
    const container = document.getElementById('table-container');
    const table = document.createElement('table');

    data.forEach((rowData, rowIndex) => {
        const row = document.createElement('tr');

        rowData.forEach((cellData, colIndex) => {
            if (cellData !== null) { // cellData가 유효한 경우에만 처리
                const cell = document.createElement(rowIndex === 0 ? 'th' : 'td');
                cell.textContent = cellData.text || '';

                if (cellData.rowSpan) {
                    cell.rowSpan = cellData.rowSpan;
                }
                if (cellData.colSpan) {
                    cell.colSpan = cellData.colSpan;
                }

                row.appendChild(cell);
            } else {
                const prevCell = row.lastElementChild;
                if (prevCell) {
                    prevCell.colSpan = (prevCell.colSpan || 1) + 1;
                }
            }
        });

        table.appendChild(row);
    });

    container.appendChild(table);
}
