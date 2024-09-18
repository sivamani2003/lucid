"use client";
import { useState } from 'react';

export default function SSLChecker() {
  const [domain, setDomain] = useState('');
  const [sslInfo, setSslInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShowError(false);
    setSslInfo(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5002/api/check-ssl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });

      if (!response.ok) {
        throw new Error('Failed to check SSL certificate');
      }

      const data = await response.json();
      setSslInfo(data);
    } catch (error) {
      setError(error.message);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-600">SSL Certificate Checker</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter domain (e.g., example.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className={`border rounded-md p-3 w-full focus:outline-none focus:ring-2 ${
              error ? 'border-red-500' : 'border-gray-300'
            } focus:ring-blue-500`}
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transform ${
              loading ? 'scale-95 animate-pulse' : 'scale-100'
            }`}
          >
            {loading ? 'Checking...' : 'Check SSL'}
          </button>
        </form>

        {showError && (
          <div
            className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 animate-fadeIn`}
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
            <span
              onClick={() => setShowError(false)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 001.414 1.414L10 12.828l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934z"
                />
              </svg>
            </span>
          </div>
        )}

        {sslInfo && (
          <div className="mt-6 p-6 bg-blue-50 rounded-lg shadow-inner animate-fadeIn">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">SSL Certificate Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Domain:</strong> {sslInfo.domain}</p>
              <p><strong>Issuer:</strong> {sslInfo.issuer.O} ({sslInfo.issuer.CN})</p>
              <p><strong>Subject:</strong> {sslInfo.subject.CN}</p>
              <p><strong>Expiration Date:</strong> {sslInfo.expirationDate}</p>
              <p><strong>Valid for Domain:</strong> {sslInfo.validForDomain ? 'Yes' : 'No'}</p>
              <p><strong>Certificate Status:</strong> {sslInfo.isRevoked ? 'Revoked' : 'Valid'}</p>
              <p><strong>Self-Signed Certificate:</strong> {sslInfo.isSelfSigned ? 'Yes' : 'No'}</p>
              <p><strong>CRL Check:</strong> {sslInfo.crlChecked ? 'Revoked' : 'Not Revoked'}</p>
              <p><strong>OCSP Check:</strong> {sslInfo.ocspChecked ? 'Revoked' : 'Not Revoked'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
