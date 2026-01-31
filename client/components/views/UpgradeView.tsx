
import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Check, Star, PanelLeft, Zap, X } from 'lucide-react';

const UpgradeView: React.FC = () => {
    const { toggleSidebar, setViewMode } = useStore();

    return (
        <div className="flex-1 flex flex-col bg-zinc-50 dark:bg-black min-w-0 h-full animate-fade-in overflow-y-auto">
             <header className="h-16 flex-none flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-10">
                 <div className="flex items-center gap-4">
                     <button 
                        onClick={toggleSidebar}
                        className="p-2 -ml-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg transition-colors"
                    >
                        <PanelLeft size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-zinc-900 dark:text-white">升级计划</h1>
                </div>
                <button 
                    onClick={() => setViewMode('study')}
                    className="p-2 -mr-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg transition-colors"
                    aria-label="关闭"
                >
                    <X size={20} />
                </button>
            </header>

            <div className="flex-1 p-8 md:p-12 flex flex-col items-center">
                <div className="text-center max-w-2xl mb-12">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 text-xs font-bold mb-4 shadow-sm">
                        <Star size={14} className="fill-yellow-900" />
                        限时优惠
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">解锁完整的学习潜能</h2>
                    <p className="text-zinc-500 text-lg">升级到 Pro 版，获取 AI 深度解析、无限量题目生成以及 PDF 导出功能。</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                    {/* Free Plan */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 relative">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">免费版</h3>
                        <p className="text-zinc-500 text-sm mt-1">适合偶尔练习的学生</p>
                        <div className="my-6">
                            <span className="text-4xl font-bold text-zinc-900 dark:text-white">¥0</span>
                            <span className="text-zinc-500">/月</span>
                        </div>
                        <button 
                            className="w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            onClick={() => setViewMode('study')}
                        >
                            当前计划
                        </button>
                        <ul className="mt-8 space-y-4">
                            {['每日 5 次 AI 答疑', '基础题目管理', '标准 Markdown 笔记', '社区支持'].map(feat => (
                                <li key={feat} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                    <Check size={16} className="text-zinc-400" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 border-2 border-primary/10 dark:border-primary/20 relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Zap size={120} className="text-primary dark:text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">专业版</h3>
                        <p className="text-zinc-500 text-sm mt-1">为追求卓越的你打造</p>
                        <div className="my-6">
                            <span className="text-4xl font-bold text-zinc-900 dark:text-white">¥19</span>
                            <span className="text-zinc-500">/月</span>
                        </div>
                        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 font-semibold text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                            立即升级
                        </button>
                        <ul className="mt-8 space-y-4">
                            {['无限量 AI 答疑 & 追问', '基于错题生成同类训练', '无限量文件上传 & OCR', '高级数据统计 & 进度追踪', '优先客服支持'].map(feat => (
                                <li key={feat} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                                    <div className="bg-primary/10 dark:bg-primary/20 p-0.5 rounded-full">
                                        <Check size={14} className="text-primary" />
                                    </div>
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                <p className="mt-12 text-xs text-zinc-400">
                    可以随时取消订阅。遇到问题？<a href="#" className="underline">联系我们要优惠</a>
                </p>
            </div>
        </div>
    );
};

export default UpgradeView;
