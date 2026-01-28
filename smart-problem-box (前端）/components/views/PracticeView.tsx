
import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Problem } from '../../types';
import { Sparkles, Bookmark, CheckCircle, RefreshCcw, Eye, ArrowLeft } from 'lucide-react';
import { InlineMath } from 'react-katex';

interface PracticeViewProps {
  problem: Problem;
}

const PracticeView: React.FC<PracticeViewProps> = ({ problem }) => {
    const { state, toggleFavorite, setViewMode } = useStore();
    const isFavorite = state.favorites.includes(problem.id);

  return (
    <div className="max-w-3xl mx-auto px-8 py-10 flex flex-col h-full animate-fade-in">
        <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4 border border-blue-100 dark:border-blue-500/20">
                <Sparkles size={14} />
                AI 智能生成
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight mb-3">同类题训练</h1>
            <p className="text-zinc-500 text-sm">基于当前题目，由 AI 生成相似题型</p>
        </div>

        {/* Generated Problem Card */}
        <div className="bg-white dark:bg-[#1c1c21] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-start">
                <div className="flex gap-3">
                    <span className="flex-none h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
                    <p className="text-zinc-900 dark:text-white font-medium text-base leading-relaxed">
                        设 <InlineMath math="A" /> 为 <InlineMath math="n" /> 阶实对称矩阵，试证明：若 <InlineMath math="\lambda" /> 是 <InlineMath math="A" /> 的一个特征值，则其对应的特征子空间的维数等于 <InlineMath math="\lambda" /> 的重数。
                    </p>
                </div>
                <button 
                    onClick={() => toggleFavorite(problem.id)}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 flex-none ml-4"
                >
                    <Bookmark size={20} className={isFavorite ? "fill-current text-primary" : ""} />
                </button>
            </div>
        </div>

        {/* Input Area */}
        <div className="mb-8">
            <label htmlFor="answer" className="sr-only">Your Answer</label>
            <textarea 
                id="answer"
                className="w-full h-40 bg-white dark:bg-[#1c1c21] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all shadow-sm outline-none"
                placeholder="在这里写下你的解题思路或答案（可选）"
            ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-6 pb-20">
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <button 
                    onClick={() => setViewMode('feedback')}
                    className="flex-1 sm:flex-none w-full sm:w-48 h-11 bg-[#3b82f6] hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                    <CheckCircle size={18} />
                    提交并检查
                </button>
                <button className="flex-1 sm:flex-none w-full sm:w-48 h-11 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2">
                    <RefreshCcw size={18} />
                    换一道同类题
                </button>
            </div>
            <div className="flex items-center gap-8 text-xs font-medium text-zinc-500">
                <button className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <Eye size={16} className="text-zinc-400 group-hover:text-primary" />
                    查看原题讲解
                </button>
                <button 
                    onClick={() => setViewMode('study')}
                    className="hover:text-primary transition-colors flex items-center gap-1.5 group"
                >
                    <ArrowLeft size={16} className="text-zinc-400 group-hover:text-primary" />
                    返回原题
                </button>
            </div>
        </div>
    </div>
  );
};

export default PracticeView;
