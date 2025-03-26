"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

export default function DebugPage() {
  const [debugData, setDebugData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDebugData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/debug');
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      setDebugData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch debug data');
      console.error('Error fetching debug data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDebugData();
  }, []);

  const refreshData = () => {
    fetchDebugData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/admin/dashboard" className="flex items-center text-zinc-400 hover:text-white">
          <FiArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
        <button
          onClick={refreshData}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
        >
          <FiRefreshCw className="-ml-1 mr-2 h-4 w-4" />
          Refresh
        </button>
      </div>

      <h1 className="text-2xl font-bold text-white">Debug Information</h1>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <FiRefreshCw className="animate-spin h-8 w-8 text-white" />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : debugData ? (
        <div className="space-y-6">
          <div className="bg-zinc-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-white mb-3">File System</h2>
            <div className="space-y-2">
              <p className="text-zinc-300">
                <span className="font-semibold">Data Path:</span> {debugData.dataPath}
              </p>
              <p className="text-zinc-300">
                <span className="font-semibold">Directory Exists:</span> {debugData.dirExists ? 'Yes' : 'No'}
              </p>
              <p className="text-zinc-300">
                <span className="font-semibold">Directory Contents:</span> {debugData.dirContents.length > 0 ? debugData.dirContents.join(', ') : 'Empty'}
              </p>
              <p className="text-zinc-300">
                <span className="font-semibold">File Exists:</span> {debugData.fileExists ? 'Yes' : 'No'}
              </p>
              <p className="text-zinc-300">
                <span className="font-semibold">File Size:</span> {debugData.fileSize} bytes
              </p>
            </div>
          </div>

          {debugData.fileExists && (
            <div className="bg-zinc-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-white mb-3">File Contents</h2>
              <pre className="bg-zinc-900 p-4 rounded overflow-auto max-h-96 text-zinc-300 text-sm whitespace-pre-wrap">
                {debugData.fileContents}
              </pre>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <Link 
              href="/api/photos" 
              target="_blank"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm inline-flex items-center"
            >
              View API Response
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-zinc-400">No data available</div>
      )}
    </div>
  );
} 