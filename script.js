document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error('Error loading JSON data:', error));
});

function renderTable(data) {
    const table = document.getElementById('data-table');

    data.forEach((rowData, rowIndex) => {
        const row = table.insertRow(-1);
        
        rowData.forEach((cellData, cellIndex) => {
            const cell = row.insertCell(-1);

            if (cellData.rowSpan) {
                cell.rowSpan = cellData.rowSpan;
            }
            if (cellData.colSpan) {
                cell.colSpan = cellData.colSpan;
            }

            // 스타일을 위한 클래스 적용
            if (cellData.class) {
                cell.className = cellData.class;
            }
            
            cell.textContent = cellData.text || ''; // 빈 데이터는 빈 문자열로 처리
        });
    });
}
