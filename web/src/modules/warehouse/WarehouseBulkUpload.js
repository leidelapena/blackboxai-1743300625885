import React from 'react';
import BulkUpload from '../shared/BulkUpload';
import { Card } from 'react-tailwind';

export default function WarehouseBulkUpload() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-6">Warehouse Inventory Bulk Upload</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Instructions</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Download the <a href="/templates/warehouse_upload.csv" download className="text-blue-500">Warehouse template</a></li>
          <li>Include item codes, quantities, and location IDs</li>
          <li>Minimum stock levels are optional but recommended</li>
        </ul>
      </div>
      <BulkUpload module="warehouse" />
    </Card>
  );
}