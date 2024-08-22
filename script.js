document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error('Error loading JSON data:', error));
});

function renderTable(data) {
    const container = document.getElementById('table-container');
    const table = document.createElement('table');

    data.forEach((rowData, rowIndex) => {
        const row = document.createElement('tr');

        rowData.forEach((cellData, colIndex) => {
            if (cellData) { // cellData가 유효한 경우에만 처리
                const cell = document.createElement('td');
                cell.textContent = cellData.text || '';

                if (cellData.rowSpan) {
                    cell.rowSpan = cellData.rowSpan;
                }
                if (cellData.colSpan) {
                    cell.colSpan = cellData.colSpan;
                }

                row.appendChild(cell);
            }
        });

        table.appendChild(row);
    });

    container.appendChild(table);
}
