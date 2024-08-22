document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error('Error loading JSON data:', error));
});

function renderTable(data) {
    const container = document.getElementById('table-container');
    const table = document.createElement('table');

    const tableData = data.tableData;
    const mergedCells = data.mergedCells;

    tableData.forEach((rowData, rowIndex) => {
        const row = document.createElement('tr');
        rowData.forEach((cellData, colIndex) => {
            // 기존에 병합된 셀을 무시하기 위한 로직
            if (row.children[colIndex]) {
                return;
            }
            
            if (cellData !== null) {
                const cell = document.createElement('td');
                cell.textContent = cellData.text || '';

                if (cellData.style) {
                    Object.assign(cell.style, cellData.style);
                }

                // 병합 정보에 따라 셀의 병합 적용
                const mergeInfo = mergedCells.find(merge => merge.row === rowIndex && merge.column === colIndex);
                if (mergeInfo) {
                    if (mergeInfo.numRows > 1) cell.rowSpan = mergeInfo.numRows;
                    if (mergeInfo.numColumns > 1) cell.colSpan = mergeInfo.numColumns;
                }

                row.appendChild(cell);
            } else {
                // null 값을 가진 경우, 병합된 셀이라 간주하고 건너뜀
                row.appendChild(document.createElement('td'));
            }
        });
        table.appendChild(row);
    });

    container.appendChild(table);
}
