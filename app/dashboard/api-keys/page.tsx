'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Copy, Check } from 'lucide-react';

export default function ApiKeysPage() {
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [newKey, setNewKey] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        fetchKeys();
    }, []);

    const fetchKeys = async () => {
        try {
            const res = await fetch('/api/keys');
            if (res.ok) {
                const data = await res.json();
                setKeys(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const createKey = async () => {
        const name = prompt('Enter a name for this API key (e.g. "My Portfolio")');
        if (!name) return;

        setCreating(true);
        try {
            const res = await fetch('/api/keys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            if (res.ok) {
                const data = await res.json();
                setNewKey(data.key); // Show the raw key only once
                fetchKeys();
            }
        } catch (error) {
            alert('Error creating key');
        } finally {
            setCreating(false);
        }
    };

    const deleteKey = async (id: string) => {
        if (!confirm('Are you sure? This action cannot be undone.')) return;

        try {
            await fetch(`/api/keys/${id}`, { method: 'DELETE' });
            fetchKeys();
        } catch (error) {
            alert('Error deleting key');
        }
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">API Access</h1>
                    <p className="mt-1 text-gray-500">Manage API keys to access your content externally.</p>
                </div>
                <button
                    onClick={createKey}
                    disabled={creating}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Generate New Key
                </button>
            </div>

            {newKey && (
                <div className="mb-8 bg-green-50 border border-green-200 rounded-md p-4">
                    <h3 className="text-lg font-medium text-green-800 mb-2">New API Key Generated</h3>
                    <p className="text-sm text-green-700 mb-3">
                        Copy this key now. You won't be able to see it again!
                    </p>
                    <div className="flex items-center bg-white border border-green-300 rounded-md p-2">
                        <code className="flex-1 font-mono text-sm text-gray-800 overflow-x-auto">
                            {newKey}
                        </code>
                        <button
                            onClick={() => copyToClipboard(newKey, 'new')}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                            {copied === 'new' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {keys.length === 0 && !loading && (
                        <li className="px-4 py-8 text-center text-gray-500">No API keys found.</li>
                    )}
                    {keys.map((apiKey: any) => (
                        <li key={apiKey._id} className="px-4 py-4 sm:px-6 flex justify-between items-center">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">{apiKey.name}</h4>
                                <p className="text-xs text-gray-500 font-mono mt-1">
                                    Prefix: {apiKey.key.substring(0, 8)}...
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Created: {new Date(apiKey.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <button
                                onClick={() => deleteKey(apiKey._id)}
                                className="text-red-500 hover:text-red-700 p-2"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-8 bg-gray-900 rounded-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-4">How to use</h3>
                <p className="text-gray-300 mb-4 text-sm">
                    Use your API key in the <code>X-API-KEY</code> header to fetch your articles.
                </p>
                <div className="bg-black rounded p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-green-400">
                        {`curl -X GET ${typeof window !== 'undefined' ? window.location.origin : 'https://writerstack.com'}/api/v1/articles \\
  -H "X-API-KEY: your_api_key_here"`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
