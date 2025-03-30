import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaWarehouse, FaUsers, FaIdCard } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">ERP System</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaHome className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/erp/upload" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaBuilding className="mr-3" /> ERP Data Upload
            </Link>
          </li>
          <li>
            <Link to="/warehouse/upload" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaWarehouse className="mr-3" /> Warehouse Upload
            </Link>
          </li>
          <li>
            <Link to="/crm/upload" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaUsers className="mr-3" /> CRM Upload
            </Link>
          </li>
          <li>
            <Link to="/hr/upload" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaIdCard className="mr-3" /> HR Upload
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}