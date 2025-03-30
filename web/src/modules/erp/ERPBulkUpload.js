import React from 'react';
import BulkUpload from '../shared/BulkUpload';
import { Card } from 'react-tailwind';

export default function ERPBulkUpload() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-6">ERP Data Bulk Upload</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Instructions</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Download the <a href="/templates/erp_upload.csv" download className="text-blue-500">ERP template</a></li>
          <li>Fill in branch and department information</li>
          <li>Upload the completed CSV file below</li>
        </ul>
      </div>
      <BulkUpload module="erp" />
    </Card>
  );
}