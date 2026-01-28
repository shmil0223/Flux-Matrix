
import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import DirectoryTree from './DirectoryTree';
import { GraduationCap, Bookmark, Settings, User, Plus, LogOut, CreditCard, HelpCircle } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { state, problems, setCurrentProblem, treeData, setViewMode, logout } = useStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const favoriteProblems = state.favorites
    .map((id) => problems[id])
    .filter(Boolean); // Filter out undefined if id doesn't exist

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (action: () => void) => {
      action();
      setIsSettingsOpen(false);
  };

  return (
    <aside 
        className="flex-none bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col z-20 h-screen"
        style={{ width: state.sidebarWidth }}
    >
      {/* App Header */}
      <div className="h-16 flex-none flex items-center px-5 border-b border-zinc-200 dark:border-zinc-800/50">
        <GraduationCap className="text-primary mr-2" size={28} />
        <h1 className="text-base font-semibold tracking-tight dark:text-zinc-200 truncate">Smart题库助手</h1>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-6 scrollbar-hide">
        
        {/* Section 1: Favorites */}
        <div className="flex flex-col gap-1">
          <p className="px-5 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">收藏夹</p>
          {favoriteProblems.length === 0 ? (
             <div className="px-5 text-sm text-zinc-400 italic">暂无收藏</div>
          ) : (
            favoriteProblems.map((problem) => (
              <button
                key={`fav-${problem.id}`}
                onClick={() => {
                    setCurrentProblem(problem.id);
                    setViewMode('study'); // Ensure view switches to study
                }}
                className="flex items-center gap-3 px-5 py-2 mx-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-colors group text-left"
              >
                <Bookmark size={18} className="group-hover:text-primary fill-current opacity-70 flex-none" />
                <span className="text-sm font-medium group-hover:text-zinc-900 dark:group-hover:text-white truncate">
                  {problem.title}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Section 2: Directory Tree */}
        <div className="flex flex-col gap-1">
          <p className="px-5 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">题库</p>
          <DirectoryTree nodes={treeData} />
        </div>
      </div>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 relative flex flex-col gap-4" ref={settingsRef}>
        <button 
            onClick={() => setViewMode('import')}
            className={`w-full h-10 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all font-medium text-sm group overflow-hidden ${
                state.currentView === 'import'
                ? 'bg-primary text-white shadow-blue-500/20'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:text-primary'
            }`}
        >
          <Plus size={20} className="flex-none" />
          <span className="truncate">导入题目</span>
        </button>

        {/* Settings Popup Menu */}
        {isSettingsOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden animate-fade-in z-50 flex flex-col py-1">
                <button 
                    onClick={() => handleMenuClick(() => setViewMode('settings'))}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                >
                    <User size={16} className="text-zinc-400" />
                    账号设置
                </button>
                <button 
                    onClick={() => handleMenuClick(() => setViewMode('upgrade'))}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                >
                    <CreditCard size={16} className="text-zinc-400" />
                    升级专业版
                </button>
                <button 
                    onClick={() => handleMenuClick(() => window.open('https://example.com/help', '_blank'))}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                >
                    <HelpCircle size={16} className="text-zinc-400" />
                    帮助中心
                </button>
                <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1"></div>
                <button 
                    onClick={() => handleMenuClick(logout)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left"
                >
                    <LogOut size={16} />
                    退出登录
                </button>
            </div>
        )}

        <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors overflow-hidden ${isSettingsOpen ? 'bg-zinc-200 dark:bg-zinc-900' : 'hover:bg-zinc-200 dark:hover:bg-zinc-900'}`}
        >
          {state.user.avatar ? (
              <img src={state.user.avatar} alt="Avatar" className="h-8 w-8 rounded-full object-cover shadow-sm flex-none" />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white flex-none font-bold text-sm">
                {state.user.name.charAt(0)}
            </div>
          )}
          <div className="text-left flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-900 dark:text-white leading-none truncate">{state.user.name}</p>
            <p className="text-xs text-zinc-500 mt-1 truncate">{state.user.plan === 'free' ? '免费版' : '专业版'}</p>
          </div>
          <Settings size={20} className={`text-zinc-400 flex-none transition-transform duration-300 ${isSettingsOpen ? 'rotate-90 text-primary' : ''}`} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
