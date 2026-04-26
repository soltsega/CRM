import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Lock, Mail, Server, ArrowRight } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Unauthorized access');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]"></div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[400px] p-8 z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
                        <Server className="text-white" size={24} />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-text-secondary text-sm">Access your CRM admin control panel</p>
                </div>

                <div className="card p-8 border-white/5 bg-[#0f172a]/50 backdrop-blur-xl">
                    {error && (
                        <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-2 rounded-md mb-6 text-xs font-medium text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-text-dim uppercase tracking-wider">Username</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                                <input 
                                    type="text"
                                    className="input pl-10"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-text-dim uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                                <input 
                                    type="password"
                                    className="input pl-10"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full py-3.5 justify-center mt-4"
                        >
                            {loading ? 'Verifying...' : 'Continue to Dashboard'}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>
                </div>

                <p className="text-center text-text-dim text-xs mt-10">
                    Trusted by 10,000+ businesses globally.
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
