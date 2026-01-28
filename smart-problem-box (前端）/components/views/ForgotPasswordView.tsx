
import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { GraduationCap, ArrowLeft, Mail, CheckCircle, ArrowRight } from 'lucide-react';

const ForgotPasswordView: React.FC = () => {
  const { setViewMode } = useStore();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
        setIsLoading(false);
        setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-[#09090b] p-4 font-display">
        <div className="w-full max-w-[500px] bg-white dark:bg-[#121217] rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="p-8 md:p-12 flex flex-col justify-center">
                
                <div className="flex items-center gap-2 mb-8">
                     <GraduationCap size={32} className="text-primary" />
                     <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Smart题库助手</h1>
                </div>

                {!isSent ? (
                    <>
                        <div className="mb-8">
                            <button 
                                onClick={() => setViewMode('study')} // 'study' acts as login fallback when !isLoggedIn
                                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-primary mb-4 transition-colors"
                            >
                                <ArrowLeft size={14} />
                                返回登录
                            </button>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">重置密码</h2>
                            <p className="text-zinc-500 text-sm">输入您的注册邮箱，我们将向您发送重置链接。</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">邮箱地址</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-wait mt-4"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        发送重置链接 <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8 animate-fade-in">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">邮件已发送</h2>
                        <p className="text-zinc-500 text-sm mb-8">
                            我们已向 <span className="text-zinc-900 dark:text-white font-medium">{email}</span> 发送了重置密码的说明，请查收邮件。
                        </p>
                        <button 
                            onClick={() => {
                                setIsSent(false);
                                setViewMode('study');
                            }}
                            className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium py-2.5 rounded-lg transition-all"
                        >
                            返回登录页
                        </button>
                        <p className="mt-6 text-xs text-zinc-400">
                            没收到邮件？ <button onClick={() => setIsSent(false)} className="text-primary hover:underline">重新发送</button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ForgotPasswordView;
