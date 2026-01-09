'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, User, Link as LinkIcon, Twitter, Github, Globe } from 'lucide-react';

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        bio: '',
        twitter: '',
        github: '',
        website: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/user/settings');
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        name: data.name || '',
                        image: data.image || '',
                        bio: data.bio || '',
                        twitter: data.socialLinks?.twitter || '',
                        github: data.socialLinks?.github || '',
                        website: data.socialLinks?.website || '',
                    });
                }
            } catch (error) {
                console.error('Failed to load settings');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch('/api/user/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to update');

            alert('Profile updated successfully!');
            router.refresh();
        } catch (error) {
            alert('Something went wrong.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading settings...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 space-y-8">

                    {/* Public Profile */}
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                            <User className="h-5 w-5 mr-2 text-indigo-500" />
                            Public Profile
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            This information will be displayed publicly on your blog.
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium text-gray-700">Display Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                />
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Bio</label>
                                <div className="mt-1">
                                    <textarea
                                        name="bio"
                                        rows={3}
                                        maxLength={160}
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                        placeholder="Brief description for your profile."
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Max 160 characters.</p>
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Social Links */}
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                            <LinkIcon className="h-5 w-5 mr-2 text-indigo-500" />
                            Social Links
                        </h3>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 flex items-center">
                                    <Twitter className="h-4 w-4 mr-1 text-gray-400" /> Twitter
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                                        twitter.com/
                                    </span>
                                    <input
                                        type="text"
                                        name="twitter"
                                        value={formData.twitter}
                                        onChange={handleChange}
                                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 flex items-center">
                                    <Github className="h-4 w-4 mr-1 text-gray-400" /> GitHub
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                                        github.com/
                                    </span>
                                    <input
                                        type="text"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleChange}
                                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium text-gray-700 flex items-center">
                                    <Globe className="h-4 w-4 mr-1 text-gray-400" /> Website
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                    placeholder="https://"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-5">
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            {saving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
