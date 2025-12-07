
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isSignUp) {
                const { user } = await signup(email, password);
                if (user) alert('Signup successful! Check your email for verification if enabled, or sign in.');
                // Note: Supabase defaults often require email confirmation.
                // If disabled, user is logged in. If enabled, they need to check email.
                // We'll try to login immediately after signup just in case auto-confirm is on.
                if (!user.identities?.length) {
                    setError('This email is already registered.');
                    setLoading(false);
                    return;
                }
            }

            await login(email, password);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to authenticate.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        {isSignUp ? 'Create an Account' : 'Sign in to CMS'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {isSignUp ? 'Or ' : 'Or '}
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            {isSignUp ? 'sign in to your account' : 'create a new account'}
                        </button>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <input
                                type="email"
                                required
                                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
                        >
                            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign in')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

