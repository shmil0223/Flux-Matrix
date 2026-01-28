
import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Problem } from '../../types';
import { Bookmark, Lightbulb, TriangleAlert, ExternalLink, Download, ChevronDown, ListOrdered, ZoomIn, X, Sparkles, Send } from 'lucide-react';
import { InlineMath } from 'react-katex';

interface StudyViewProps {
  problem: Problem;
}

const StudyView: React.FC<StudyViewProps> = ({ problem }) => {
  const { state, toggleFavorite } = useStore();
  const isFavorite = state.favorites.includes(problem.id);
  const [isImageOpen, setIsImageOpen] = useState(false);

  // AI Chat State
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([
    { role: 'ai', content: `你好！我是你的 AI 助教。关于这道"${problem.title}"，你有什么想深入了解的吗？比如“为什么特征向量必须正交？”或者“如何直观理解谱定理？”` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    // Mock AI Response (Simulating network delay)
    setTimeout(() => {
        setChatMessages(prev => [...prev, {
            role: 'ai',
            content: '这是一个非常好的切入点。根据谱定理，实对称矩阵的特征值一定是实数，且不同特征值对应的特征向量必定正交。这对于简化矩阵运算非常关键。在实际计算中，我们通常需要先求出特征值，然后解线性方程组得到特征向量。如果特征值有重根，记得要进行施密特正交化。'
        }]);
        setIsChatLoading(false);
    }, 1500);
  };

  return (
    <>
        <div className="max-w-4xl mx-auto px-8 py-10 flex flex-col gap-8 pb-32 animate-fade-in">
        {/* Title Header */}
        <div>
            <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
                {problem.title}
            </h1>
            <button 
                onClick={() => toggleFavorite(problem.id)}
                className={`flex-none p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors ${isFavorite ? 'text-primary bg-primary/10' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}
            >
                <Bookmark size={20} className={isFavorite ? "fill-current" : ""} />
            </button>
            </div>
            <p className="text-zinc-500 text-sm">
            来源：2023期中考试 Q4 • 
            {problem.tags.map(tag => (
                <span key={tag} className="text-primary font-medium cursor-pointer ml-1">#{tag}</span>
            ))}
            </p>
        </div>

        {/* Image / Problem Content */}
        <div className="bg-white dark:bg-[#1c1c21] border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 shadow-sm">
            <div 
                onClick={() => setIsImageOpen(true)}
                className="aspect-video w-full rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center relative overflow-hidden group/image cursor-pointer"
            >
                {/* Placeholder for actual problem image */}
                <img src="https://picsum.photos/800/450" alt="Problem" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-medium text-sm bg-black/40 opacity-0 group-hover/image:opacity-100 transition-all gap-2 backdrop-blur-[2px]">
                    <ZoomIn size={18} />
                    点击查看大图
                </div>
            </div>
        </div>

        {/* Concept Card */}
        <div className="flex gap-4 p-5 rounded-xl bg-primary/5 border border-primary/20">
            <Lightbulb className="text-primary flex-none mt-0.5" size={24} />
            <div>
            <h4 className="text-sm font-bold text-primary mb-1">考查点</h4>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                本题考查你对 <strong>谱定理</strong> 的理解。具体来说，你需要认识到（对于实矩阵）当且仅当矩阵是对称矩阵时，它才是可正交对角化的。你不需要执行完整的对角化过程。
            </p>
            </div>
        </div>

        {/* Steps Accordion */}
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <ListOrdered className="text-zinc-400" size={20} />
                核心解题步骤
            </h3>
            <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-[#1c1c21] divide-y divide-zinc-200 dark:divide-zinc-800">
                {/* Step 1 */}
                <details className="group p-4 open:bg-zinc-50 dark:open:bg-zinc-800/30 transition-colors" open>
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                        <span className="font-medium text-sm text-zinc-800 dark:text-zinc-200">1. 检查对称性</span>
                        <ChevronDown className="text-zinc-400 group-open:rotate-180 transition-transform" size={18} />
                    </summary>
                    <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 pl-4 border-l-2 border-zinc-200 dark:border-zinc-700">
                        <p>检查是否满足 <InlineMath math="A^T = A" />。如果矩阵是对称的，谱定理保证它是可正交对角化的。</p>
                    </div>
                </details>
                {/* Step 2 */}
                <details className="group p-4 open:bg-zinc-50 dark:open:bg-zinc-800/30 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                        <span className="font-medium text-sm text-zinc-800 dark:text-zinc-200">2. 求解特征值</span>
                        <ChevronDown className="text-zinc-400 group-open:rotate-180 transition-transform" size={18} />
                    </summary>
                    <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 pl-4 border-l-2 border-zinc-200 dark:border-zinc-700">
                        <p>计算特征方程 <InlineMath math="det(A - \lambda I) = 0" /> 以找到特征值。</p>
                    </div>
                </details>
                {/* Step 3 */}
                <details className="group p-4 open:bg-zinc-50 dark:open:bg-zinc-800/30 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                        <span className="font-medium text-sm text-zinc-800 dark:text-zinc-200">3. 构造正交特征向量</span>
                        <ChevronDown className="text-zinc-400 group-open:rotate-180 transition-transform" size={18} />
                    </summary>
                    <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 pl-4 border-l-2 border-zinc-200 dark:border-zinc-700">
                        <p>对于不同的特征值，特征向量已经是正交的。对于重复的特征值，使用格拉姆-施密特过程（Gram-Schmidt process）。</p>
                    </div>
                </details>
            </div>
        </div>

        {/* Warnings */}
        <div className="flex gap-4 p-5 rounded-xl bg-orange-500/5 border border-orange-500/20">
            <TriangleAlert className="text-orange-500 flex-none mt-0.5" size={24} />
            <div>
                <h4 className="text-sm font-bold text-orange-600 dark:text-orange-400 mb-1">常见易错点</h4>
                <ul className="list-disc list-inside text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                    <li>忘记归一化特征向量以使矩阵 P 正交（列向量长度必须为 1）。</li>
                    <li>认为非对称矩阵完全不能对角化（它们可能可以对角化，只是不能<strong>正交</strong>对角化）。</li>
                </ul>
            </div>
        </div>

        {/* AI Chat Interface */}
        <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-[#1c1c21] shadow-sm">
            {/* Chat Header */}
            <div className="px-5 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-primary" size={18} />
                    <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">AI 助教追问</h3>
                </div>
                <span className="text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">Beta</span>
            </div>
            
            {/* Messages Area */}
            <div className="p-5 flex flex-col gap-4 max-h-[300px] overflow-y-auto bg-zinc-50/30 dark:bg-black/20 scrollbar-thin">
                {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className={`flex-none w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'ai' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400' : 'bg-primary text-white'}`}>
                            {msg.role === 'ai' ? <Sparkles size={14} /> : <div className="text-[10px] font-bold">ME</div>}
                        </div>
                        {/* Bubble */}
                        <div className={`rounded-2xl px-4 py-2.5 max-w-[85%] text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                            ? 'bg-primary text-white rounded-tr-sm' 
                            : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-tl-sm'
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                
                {/* Loading Indicator */}
                {isChatLoading && (
                    <div className="flex gap-3 animate-fade-in">
                        <div className="flex-none w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center">
                            <Sparkles size={14} />
                        </div>
                        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-[#1c1c21] border-t border-zinc-200 dark:border-zinc-800">
                <div className="relative flex items-center gap-2">
                    <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="输入你的问题，例如：特征值和特征向量有什么几何意义？"
                        className="flex-1 bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg py-2.5 pl-4 pr-12 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-1 focus:ring-primary focus:bg-white dark:focus:bg-black transition-all"
                    />
                    <button 
                        onClick={handleSendMessage}
                        disabled={!chatInput.trim() || isChatLoading}
                        className="absolute right-1.5 p-1.5 bg-white dark:bg-zinc-800 text-primary rounded-md shadow-sm border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                    <ExternalLink className="text-zinc-400" size={20} />
                    相关学习资源
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="#" className="block p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1c1c21] hover:border-primary/50 transition-colors group">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wide">视频</span>
                            <ExternalLink size={16} className="text-zinc-400 group-hover:text-primary" />
                        </div>
                        <p className="font-medium text-zinc-900 dark:text-white text-sm">3Blue1Brown：特征值与特征向量</p>
                    </a>
                    <a href="#" className="block p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1c1c21] hover:border-primary/50 transition-colors group">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-purple-500 uppercase tracking-wide">速查表</span>
                            <Download size={16} className="text-zinc-400 group-hover:text-purple-500" />
                        </div>
                        <p className="font-medium text-zinc-900 dark:text-white text-sm">谱定理总结 PDF</p>
                    </a>
                </div>
        </div>

        </div>

        {/* Lightbox Modal */}
        {isImageOpen && (
            <div 
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10 animate-fade-in"
                onClick={() => setIsImageOpen(false)}
            >
                <button 
                    onClick={() => setIsImageOpen(false)}
                    className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                >
                    <X size={24} />
                </button>
                <img 
                    src="https://picsum.photos/800/450" 
                    alt="Problem Fullscreen" 
                    className="max-w-full max-h-full object-contain rounded shadow-2xl scale-100 animate-fade-in"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                />
            </div>
        )}
    </>
  );
};

export default StudyView;
