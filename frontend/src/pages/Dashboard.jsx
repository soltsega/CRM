import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, MoreHorizontal, LayoutDashboard, Clock, MessageSquare, CheckCircle } from 'lucide-react';

const Dashboard = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [activeView, setActiveView] = useState('dashboard');

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const res = await api.get('/leads');
                setLeads(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) || 
                             lead.email.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || lead.status === filter;
        return matchesSearch && matchesFilter;
    });

    const stats = [
        { label: 'Total Leads', count: leads.length, icon: LayoutDashboard, color: 'text-indigo-400' },
        { label: 'Pending', count: leads.filter(l => l.status === 'New').length, icon: Clock, color: 'text-warning' },
        { label: 'Contacted', count: leads.filter(l => l.status === 'Contacted').length, icon: MessageSquare, color: 'text-indigo-400' },
        { label: 'Converted', count: leads.filter(l => l.status === 'Converted').length, icon: CheckCircle, color: 'text-success' },
    ];

    const renderContent = () => {
        if (activeView !== 'dashboard') {
            return (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 text-text-dim">
                        <Clock size={32} />
                    </div>
                    <h2 className="text-xl font-bold mb-2 capitalize">{activeView} View</h2>
                    <p className="text-text-secondary max-w-sm">This module is currently under development. Stay tuned for updates!</p>
                    <button onClick={() => setActiveView('dashboard')} className="btn btn-primary mt-6">Return to Dashboard</button>
                </div>
            );
        }

        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* Stats */}
                <div className="stats-grid mb-10">
                    {stats.map((stat, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="card p-5"
                        >
                            <p className="text-text-dim text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.count}</h3>
                        </motion.div>
                    ))}
                </div>

                {/* Table Area */}
                <div className="card p-6">
                    <div className="filter-bar">
                        <div className="search-container">
                            <Search className="search-icon" size={18} />
                            <input 
                                type="text" 
                                className="input pl-10" 
                                placeholder="Search leads..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            {['All', 'New', 'Contacted', 'Converted'].map(s => (
                                <button 
                                    key={s}
                                    onClick={() => setFilter(s)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                                        filter === s ? 'bg-indigo-500/10 text-indigo-400' : 'text-text-dim hover:text-white'
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Client</th>
                                    <th>Source</th>
                                    <th>Status</th>
                                    <th>Lead Score</th>
                                    <th>Added</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {!loading && filteredLeads.map((lead, idx) => (
                                        <motion.tr 
                                            key={lead._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <td style={{ minWidth: '200px' }}>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xs">
                                                        {lead.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-white">{lead.name}</p>
                                                        <p className="text-xs text-text-dim">{lead.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><p className="text-text-secondary text-sm">{lead.source}</p></td>
                                            <td>
                                                <span className={`badge badge-${lead.status.toLowerCase()}`}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500" style={{ width: lead.status === 'Converted' ? '100%' : lead.status === 'Contacted' ? '60%' : '20%' }}></div>
                                                </div>
                                            </td>
                                            <td className="text-text-dim text-xs">{new Date(lead.createdAt).toLocaleDateString()}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                <button className="text-text-dim hover:text-white transition-colors p-2">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="app-container">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            
            <main className="main-content">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight" style={{ fontSize: '1.5rem' }}>
                            {activeView === 'dashboard' ? 'Lead Overview' : activeView}
                        </h2>
                        <p className="text-text-secondary text-sm">
                            {activeView === 'dashboard' 
                                ? 'Manage and track your customer pipeline.' 
                                : `Manage your ${activeView} settings and data.`}
                        </p>
                    </div>
                    <div className="header-actions">
                        <button className="btn btn-ghost">
                            <Filter size={18} />
                            Filter
                        </button>
                        <button className="btn btn-primary" onClick={() => alert('Add Lead logic integrated with backend')}>
                            <Plus size={18} />
                            Add Lead
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;
