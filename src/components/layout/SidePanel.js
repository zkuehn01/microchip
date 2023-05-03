import React, { useEffect, useState } from 'react';
import xml2js from 'xml2js';

const SidePanel = ({ data }) => {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [xmlContent, setXmlContent] = useState(null);

  useEffect(() => {
    if (data && data.waveform) {
      setRows([
        { id: 1, title: 'Waveform Data', checked: false, content: JSON.stringify(data.waveform) },
      ]);
    }
  }, [data]);

  const handleToggle = (id) => {
    const newRows = [...rows];
    const index = newRows.findIndex((row) => row.id === id);
    newRows[index].checked = !newRows[index].checked;
    setRows(newRows);

    if (newRows[index].checked) {
      setSelectedRow(newRows[index]);
    } else {
      setSelectedRow(null);
    }
  };

  const handleToggleAll = (checked) => {
    const newRows = rows.map((row) => ({ ...row, checked }));
    setRows(newRows);
    setSelectedRow(null);
  };

  const handleExport = () => {
    // Get selected rows
    const selectedRows = rows.filter((row) => row.checked);

    // Download each selected row's content as a file
    selectedRows.forEach((row) => {
      const { title, content } = row;
      const filename = `${title}.json`;

      const element = document.createElement('a');
      element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  };

  const handleExportXML = () => {
    // Download the XML file
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(xmlContent)}`);
    element.setAttribute('download', 'data.xml');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const xml = reader.result;
        setXmlContent(xml);
        const parser = new xml2js.Parser();
        parser.parseString(xml, (err, result) => {
          if (err) {
            console.error('Error parsing XML:', err);
          } else {
            const dataSection = result['result']['dataSection'][0];
            const json = JSON.stringify(dataSection);
            const newRow = { id: rows.length + 1, title: file.name, checked: false, content: json };
            setRows([...rows, newRow]);
          }
        });
      };
    };

    input.click();
  };

  return (
    <div className="SidePanel">
      <h3>Side Panel</h3>
      <div className="check-all-container">
        <input
          type="checkbox"
          onChange={(event) => handleToggleAll(event.target.checked)}
        />
        <label htmlFor="check-all">Select All</label>
        <input
          type="checkbox"
          onChange={(event) => handleToggleAll(!event.target.checked)}
        />
        <label htmlFor="uncheck-all">Clear All</label>
      </div>
      <div className="row-container">
        {rows.map((row) => (
          <div key={row.id} className="row">
            <span>{row.title}</span>
            <input
              type="checkbox"
              checked={row.checked}
              onChange={() => handleToggle(row.id)}
            />
          </div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleExport}>Export JSON</button>
        {data && data.xml && (
          <button onClick={handleExportXML}>Export XML</button>
        )}
        <button onClick={handleImport}>Import</button>
      </div>
      {selectedRow && (
        <pre>
          {selectedRow.content}
        </pre>
      )}
    </div>
  );
  
};

export default SidePanel;
