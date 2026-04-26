import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, UserPlus, LogOut, RefreshCw, ChevronRight, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import LeadCard from '../components/LeadCard';

const Dashboard = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await api.get('/leads');
            setLeads(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) || 
                             lead.email.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || lead.status === filter;
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'New').length,
        contacted: leads.filter(l => l.status === 'Contacted').length,
        converted: leads.filter(l => l.status === 'Converted').length,
    };

    return (
        <div className="min-h-screen pb-12">
            {/* Navbar */}
            <nav className="glass sticky top-0 z-50 rounded-none border-t-0 border-x-0 px-6 py-4 flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg">
                        <RefreshCw className="text-white" size={20} />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Mini CRM</h1>
                </div>
                
                <div className="flex items-center gap-4">
                    <button onClick={fetchLeads} className="p-2 hover:bg-white/10 rounded-lg text-text-muted transition-colors">
                        <RefreshCw size={20} />
                    </button>
                    <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-danger/10 text-danger rounded-lg hover:bg-danger/20 transition-colors">
                        <LogOut size={18} />
                        <span className="font-medium hidden sm:inline">Logout</span>
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Leads', value: stats.total, icon: UserPlus, color: 'text-primary' },
                        { label: 'New', value: stats.new, icon: Clock, color: 'text-warning' },
                        { label: 'Contacted', value: stats.contacted, icon: MessageSquare, color: 'text-accent' },
                        { label: 'Converted', value: stats.converted, icon: CheckCircle, color: 'text-success' },
                    ].map((stat, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-6"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-text-muted text-sm font-medium mb-1">{stat.label}</p>
                                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                                </div>
                                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Filters & Actions */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                        <input 
                            type="text" 
                            className="input-field pl-12 glass" 
                            placeholder="Find lead by name or email..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                            <select 
                                className="input-field pl-12 glass appearance-none pr-10 min-w-[160px]"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All">All Statuses</option>
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Converted">Converted</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Leads Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredLeads.map((lead, idx) => (
                                <LeadCard key={lead._id} lead={lead} onUpdate={fetchLeads} index={idx} />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
                
                {!loading && filteredLeads.length === 0 && (
                    <div className="text-center py-24 glass">
                        <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-text-muted" size={32} />
                        </div>
                        <h2 className="text-xl font-bold mb-2">No leads found</h2>
                        <p className="text-text-muted">Try adjusting your filters or search terms</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
