import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const { logout } = useAuth();

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching articles:', error);
        else setArticles(data);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;

        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', id);

        if (error) console.error('Error deleting:', error);
        else fetchArticles();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    <div className="flex gap-4">
                        <Link to="/create" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                            New Article
                        </Link>
                        <Link to="/api-access" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                            API Access
                        </Link>
                        <button onClick={logout} className="text-gray-600 hover:text-gray-900">
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {articles.length === 0 && (
                                <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No articles found.</li>
                            )}
                            {articles.map((article) => (
                                <li key={article.id}>
                                    <div className="block hover:bg-gray-50">
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <p className="truncate text-sm font-medium text-indigo-600">{article.title}</p>
                                                <div className="flex gap-2">
                                                    <Link to={`/edit/${article.id}`} className="text-sm text-gray-500 hover:text-indigo-600">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => handleDelete(article.id)} className="text-sm text-red-500 hover:text-red-700">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-500">
                                                <p>{article.summary}</p>
                                                <p className="mt-1 text-xs text-gray-400">{new Date(article.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
