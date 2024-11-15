import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import "./DownloadExcel.css";

function DownloadExcel({jsonData, nomeArquivo}) {

  const exportJSONToExcel = (jsonData, nomeArquivo = 'data.xlsx') => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(blob, nomeArquivo); 
  };

  return (
    <div>
      <button className="btn-DownloadExcel" onClick={() => exportJSONToExcel(jsonData, nomeArquivo.includes('xlsx') ? `${nomeArquivo}` : `${nomeArquivo}.xlsx`)}>
        Download Excel
      </button>
    </div>
  );
}

export default DownloadExcel;