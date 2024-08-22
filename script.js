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

    const rowspanTracker = []; // 각 열에 대해 rowspan이 진행 중인지 추적

    tableData.forEach((rowData, rowIndex) => {
        const row = document.createElement('tr');
        let colIndexOffset = 0; // 병합된 셀로 인해 발생하는 열 인덱스 오프셋

        rowData.forEach((cellData, colIndex) => {
            const actualColIndex = colIndex + colIndexOffset;

            // 이미 rowspan에 의해 차지된 셀 건너뛰기
            while (rowspanTracker[actualColIndex] > 0) {
                rowspanTracker[actualColIndex]--;
                colIndexOffset++;
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
                    if (mergeInfo.numRows > 1) {
                        cell.rowSpan = mergeInfo.numRows;
                        rowspanTracker[actualColIndex] = mergeInfo.numRows - 1;
                    }
                    if (mergeInfo.numColumns > 1) {
                        cell.colSpan = mergeInfo.numColumns;
                        colIndexOffset += mergeInfo.numColumns - 1;
                    }
                }

                row.appendChild(cell);
            }
        });

        table.appendChild(row);
    });

    container.appendChild(table);
}
