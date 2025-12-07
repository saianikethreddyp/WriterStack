import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const ApiAccess = () => {
    const { user } = useAuth();
    const [copied, setCopied] = useState(false);

    // In a real app we might not expose the anon key this easily or we might have a separate public API key.
    // For this implementation, we are using the standard Supabase REST endpoint pattern.
    const projectUrl = 'https://mkojcietzlacpulogtfe.supabase.co';
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rb2pjaWV0emxhY3B1bG9ndGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMjI2MjAsImV4cCI6MjA4MDY5ODYyMH0.8fIDecpQ30iC75XuzaKnpXKFeKJ5bIqGJxZXpx-pEHU';

    const exampleCode = `// Example: Fetching your published articles
const fetchArticles = async () => {
  const response = await fetch('${projectUrl}/rest/v1/articles?select=*&published=eq.true', {
    headers: {
      'apikey': '${apiKey}',
      'Authorization': 'Bearer ${apiKey}'
    }
  });
  
  const data = await response.json();
  console.log(data);
};

fetchArticles();`;

    const handleCopy = () => {
        navigator.clipboard.writeText(exampleCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">API Access</h1>
                    <Link to="/" className="text-indigo-600 hover:text-indigo-800">
                        &larr; Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Integration Details</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Use these details to fetch your published articles in your portfolio or other applications.
                        </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Base URL</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono">
                                    {projectUrl}/rest/v1/articles
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Public Key (anon)</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-all font-mono">
                                    {apiKey}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="mt-8 bg-white shadow sm:rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Code Example</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Copy and paste this code into your application.
                            </p>
                        </div>
                        <button
                            onClick={handleCopy}
                            className={`px-3 py-1 rounded text-sm font-medium border ${copied
                                    ? 'bg-green-100 text-green-800 border-green-200'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {copied ? 'Copied!' : 'Copy Code'}
                        </button>
                    </div>
                    <div className="border-t border-gray-200 bg-gray-50">
                        <pre className="p-4 overflow-x-auto text-sm text-gray-800 font-mono">
                            {exampleCode}
                        </pre>
                    </div>
                </div>

                <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                <strong>Note:</strong> Only articles with <code>published: true</code> will be returned by this API.
                                Make sure to publish your articles in the editor.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiAccess;
