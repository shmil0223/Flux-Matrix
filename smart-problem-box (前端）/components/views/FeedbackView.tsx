import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Problem } from '../../types';
import { Check, Lightbulb, RotateCcw, BookOpen, ArrowRight, ChevronRight } from 'lucide-react';
import { InlineMath } from 'react-katex';

interface FeedbackViewProps {
  problem: Problem;
}

const FeedbackView: React.FC<FeedbackViewProps> = ({ problem }) => {
  const { setViewMode } = useStore();

  return (
    <div className="max-w-3xl mx-auto px-8 py-8 flex flex-col gap-6 pb-20 animate-fade-in">
        {/* Success Banner */}
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 p-4 flex items-start gap-3 shadow-sm">
            <div className="mt-0.5 h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center flex-none text-white">
                <Check size={14} strokeWidth={3} />
            </div>
            <div>
                <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-400">解答正确</h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-500 mt-1 leading-relaxed">
                    恭喜！你的解题逻辑非常清晰，特别是在特征向量的求解步骤上十分严谨。
                </p>
            </div>
        </div>

        {/* Problem Recap */}
        <section>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 pl-1">题目内容</h4>
            <div className="bg-white dark:bg-[#1c1c21] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                <p className="text-zinc-900 dark:text-white text-base leading-relaxed font-serif">
                    求矩阵 <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">A</span> 的特征值，其中：
                </p>
                <div className="my-6 flex justify-center">
                    <div className="flex items-center gap-3 font-serif text-xl text-zinc-900 dark:text-white">
                        <span className="italic font-bold">A</span>
                        <span>=</span>
                        <div className="relative px-3 py-1">
                             {/* Custom Matrix Visualization (Simple HTML/Tailwind) */}
                            <div className="absolute left-0 top-0 bottom-0 w-2 border-l-2 border-t-2 border-b-2 border-zinc-800 dark:border-zinc-200 rounded-l-sm"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-2 border-r-2 border-t-2 border-b-2 border-zinc-800 dark:border-zinc-200 rounded-r-sm"></div>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-center font-mono font-medium">
                                <div>4</div><div>1</div>
                                <div>2</div><div>3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* User Logic Trace */}
        <section>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 pl-1">你的解题思路</h4>
            <div className="bg-white dark:bg-[#1c1c21] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm relative overflow-hidden group">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700">耗时 2分15秒</span>
                </div>
                <div className="font-mono text-sm text-zinc-600 dark:text-zinc-300 space-y-3 font-medium">
                    <div className="flex gap-2">
                        <span className="text-zinc-400 select-none">01</span>
                        <p>计算特征方程 <InlineMath math="|A - \lambda I| = 0" /></p>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-zinc-400 select-none">02</span>
                        <p className="pl-4 text-zinc-800 dark:text-zinc-200"><InlineMath math="(4-\lambda)(3-\lambda) - 2 = 0" /></p>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-zinc-400 select-none">03</span>
                        <p>化简方程: <InlineMath math="\lambda^2 - 7\lambda + 12 - 2 = 0 \Rightarrow \lambda^2 - 7\lambda + 10 = 0" /></p>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-zinc-400 select-none">04</span>
                        <p>因式分解: <InlineMath math="(\lambda-2)(\lambda-5) = 0" /></p>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-zinc-400 select-none">05</span>
                        <p className="text-primary font-bold">∴ <InlineMath math="\lambda_1 = 2, \lambda_2 = 5" /></p>
                    </div>
                </div>
            </div>
        </section>

        {/* AI Suggestions */}
        <section>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 pl-1">AI 批改建议</h4>
            <div className="flex flex-col gap-3">
                <div className="bg-white dark:bg-[#1c1c21] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex items-start gap-4 transition-all hover:border-emerald-200 dark:hover:border-emerald-500/30">
                    <div className="mt-1 h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-none">
                        <Check size={16} />
                    </div>
                    <div className="flex-1">
                        <h5 className="text-sm font-semibold text-zinc-900 dark:text-white">特征值计算准确</h5>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">最终结果 λ=2 和 λ=5 与标准答案完全一致，计算过程无误。</p>
                    </div>
                </div>
                 <div className="bg-white dark:bg-[#1c1c21] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex items-start gap-4 transition-all hover:border-emerald-200 dark:hover:border-emerald-500/30">
                    <div className="mt-1 h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-none">
                        <Check size={16} />
                    </div>
                    <div className="flex-1">
                        <h5 className="text-sm font-semibold text-zinc-900 dark:text-white">正交化步骤清晰</h5>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">你正确识别了矩阵的对称性，并在后续思考中考虑了正交性。</p>
                    </div>
                </div>
                 <div className="bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 rounded-xl p-4 flex items-start gap-4 group cursor-pointer">
                    <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-none">
                        <Lightbulb size={16} />
                    </div>
                    <div className="flex-1">
                        <h5 className="text-sm font-semibold text-zinc-900 dark:text-white">拓展思考</h5>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                            对于此类实对称矩阵，特征向量之间有什么特殊的几何关系？建议复习一下<span className="text-primary hover:underline ml-1">谱定理</span>相关内容。
                        </p>
                    </div>
                    <ChevronRight className="text-zinc-400 self-center group-hover:text-primary transition-colors" size={20} />
                </div>
            </div>
        </section>

        {/* Footer Actions */}
        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col sm:flex-row items-center gap-4">
             <button 
                onClick={() => setViewMode('practice')}
                className="w-full sm:w-auto flex-1 h-10 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
             >
                <RotateCcw size={18} />
                再试一次
            </button>
             <button className="w-full sm:w-auto flex-1 h-10 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2">
                <BookOpen size={18} />
                查看详细讲解
            </button>
            <button className="w-full sm:w-[40%] h-10 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                <span>下一道同类题</span>
                <ArrowRight size={18} />
            </button>
        </div>
    </div>
  );
};

export default FeedbackView;