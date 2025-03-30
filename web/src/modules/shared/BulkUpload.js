import React, { useState } from 'react';
import { Button, Input, Alert } from 'react-tailwind';

export default function BulkUpload({ module }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`/api/import/${module}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Bulk Upload {module.toUpperCase()} Data</h2>
      <Input 
        type="file" 
        accept=".csv" 
        onChange={(e) => setFile(e.target.files[0])} 
        className="mb-4"
      />
      <Button onClick={handleUpload} disabled={!file}>
        Upload CSV
      </Button>
      
      {result && (
        <Alert color={result.error ? 'red' : 'green'} className="mt-4">
          {result.error || `Successfully imported ${result.imported} records`}
        </Alert>
      )}
    </div>
  );
}