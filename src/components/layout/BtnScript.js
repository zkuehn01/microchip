import React from 'react';

const BtnScript = ({ rows, onExport, onImport }) => {
  const handleExport = () => {
    const selectedRows = rows.filter(row => row.checked);
    if (selectedRows.length === 0) {
      alert('Please select at least one file to export.');
      return;
    }
    const data = selectedRows.map(row => row.title).join('\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'selected_files.txt';
    link.click();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (event) => {
        const fileContent = event.target.result;
        onImport(file.name, fileContent);
      });

      reader.readAsText(file);
    });

    input.click();
  };

  return (
    <div className="BtnScript">
      <button onClick={handleExport}>Export</button>
      <button onClick={handleImport}>Import</button>
    </div>
  );
};

export default BtnScript;
