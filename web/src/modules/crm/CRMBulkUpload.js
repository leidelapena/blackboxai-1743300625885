import React from 'react';
import BulkUpload from '../shared/BulkUpload';
import { Card } from 'react-tailwind';

export default function CRMBulkUpload() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-6">CRM Data Bulk Upload</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Instructions</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Download the <a href="/templates/crm_upload.csv" download className="text-blue-500">CRM template</a></li>
          <li>Include customer names and contact information</li>
          <li>Lead source and status fields are required</li>
          <li>Status options: New, Contacted, Qualified, Lost</li>
        </ul>
      </div>
      <BulkUpload module="crm" />
    </Card>
  );
}