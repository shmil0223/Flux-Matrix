
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { TreeNode } from '../../types';
import { 
    CloudUpload, 
    ChevronDown, 
    Sparkles, 
    Minus, 
    Plus, 
    Image as ImageIcon, 
    X, 
    Check,
    PanelLeft,
    Folder,
    FolderPlus,
    ChevronRight,
    Search
} from 'lucide-react';

const ImportWorkbench: React.FC = () => {
    const { treeData, setViewMode, toggleSidebar, state, setColumnWidth, addNewFolder } = useStore();
    const [zoom, setZoom] = useState(100);
    const [isResizing, setIsResizing] = useState(false);
    
    // Custom Dropdown State
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [targetFolder, setTargetFolder] = useState<{id: string, title: string} | null>(null);
    const [expandedFolderIds, setExpandedFolderIds] = useState<string[]>([]);
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [newFolderTitle, setNewFolderTitle] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setIsCreatingFolder(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const startResizing = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            const sidebarOffset = state.isSidebarOpen ? state.sidebarWidth : 0;
            const newWidth = e.clientX - sidebarOffset;
            if (newWidth > 200 && newWidth < 800) {
                setColumnWidth('middle', newWidth);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isResizing, state.isSidebarOpen, state.sidebarWidth, setColumnWidth]);

    const handleCreateFolder = (e: React.FormEvent) => {
        e.preventDefault();
        if (newFolderTitle.trim()) {
            addNewFolder(newFolderTitle.trim());
            setNewFolderTitle('');
            setIsCreatingFolder(false);
        }
    };

    // Recursive rendering for custom dropdown
    const renderFolderOption = (node: TreeNode, level: number = 0) => {
        // Only render folders
        if (node.type !== 'folder') return null;
        
        const isExpanded = expandedFolderIds.includes(node.id);
        const hasChildren = node.children && node.children.some(c => c.type === 'folder');
        
        return (
            <div key={node.id}>
                 <div 
                    className={`flex items-center px-3 py-2 cursor-pointer transition-colors ${targetFolder?.id === node.id ? 'bg-primary/5 text-primary font-medium' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                    style={{ paddingLeft: `${level * 12 + 12}px` }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setTargetFolder({ id: node.id, title: node.title });
                        setIsDropdownOpen(false);
                    }}
                 >
                    {/* Toggle Button */}
                    <div 
                        className={`p-0.5 mr-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-400 transition-colors ${hasChildren ? 'visible' : 'invisible'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isExpanded) {
                                setExpandedFolderIds(prev => prev.filter(id => id !== node.id));
                            } else {
                                setExpandedFolderIds(prev => [...prev, node.id]);
                            }
                        }}
                    >
                        <ChevronRight size={14} className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                    
                    <Folder size={16} className={`mr-2 flex-none ${targetFolder?.id === node.id ? 'text-primary' : 'text-zinc-400'}`} />
                    <span className="truncate text-sm">{node.title}</span>
                 </div>
                 
                 {isExpanded && hasChildren && (
                     <div>
                        {node.children!.map(child => renderFolderOption(child, level + 1))}
                     </div>
                 )}
            </div>
        );
    };

    return (
        <>
            {/* Middle Column: Upload Workbench */}
            <div 
                className="flex-none bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col relative z-10 animate-fade-in"
                style={{ width: state.middleColumnWidth }}
            >
                <div className="h-16 flex items-center px-4 border-b border-zinc-200 dark:border-zinc-800">
                    <button 
                        onClick={toggleSidebar}
                        className="p-2 mr-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg transition-colors"
                        title={state.isSidebarOpen ? "收起侧边栏" : "展开侧边栏"}
                    >
                        <PanelLeft size={20} />
                    </button>
                    <h2 className="text-base font-semibold text-zinc-900 dark:text-white truncate">上传文件</h2>
                </div>
                
                <div className="p-6 flex flex-col gap-8 flex-1 overflow-y-auto">
                    {/* Upload Area */}
                    <div className="flex flex-col gap-3">
                        <div className="group relative w-full h-64 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-center">
                            <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <CloudUpload className="text-primary" size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-primary transition-colors">点击或拖拽文件到此处</p>
                                <p className="text-xs text-zinc-500 mt-1">支持 PDF, PNG, JPG (最大 20MB)</p>
                            </div>
                            <input className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file"/>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex flex-col gap-3 relative z-20">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">保存至文件夹</label>
                        
                        <div className="relative" ref={dropdownRef}>
                            {/* Dropdown Trigger */}
                            <div 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`w-full bg-white dark:bg-zinc-800 border ${isDropdownOpen ? 'border-primary ring-1 ring-primary/20' : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400'} rounded-lg py-2.5 pl-3 pr-10 text-sm flex items-center cursor-pointer transition-all`}
                            >
                                <Folder size={16} className={`mr-2 flex-none ${targetFolder ? 'text-primary' : 'text-zinc-400'}`} />
                                <span className={`truncate ${targetFolder ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>
                                    {targetFolder ? targetFolder.title : "收件箱 (未分类)"}
                                </span>
                                <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={18} />
                            </div>

                            {/* Dropdown Content */}
                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl overflow-hidden animate-fade-in flex flex-col max-h-80">
                                    {/* Create New Action */}
                                    <div className="p-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-black/20">
                                        {isCreatingFolder ? (
                                            <form onSubmit={handleCreateFolder} className="flex items-center gap-2 px-2">
                                                <input 
                                                    autoFocus
                                                    type="text" 
                                                    placeholder="输入文件夹名称..." 
                                                    className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1 text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                                    value={newFolderTitle}
                                                    onChange={e => setNewFolderTitle(e.target.value)}
                                                />
                                                <button type="submit" className="p-1 bg-primary text-white rounded hover:bg-blue-600">
                                                    <Check size={14} />
                                                </button>
                                                <button type="button" onClick={() => setIsCreatingFolder(false)} className="p-1 text-zinc-400 hover:text-zinc-600">
                                                    <X size={14} />
                                                </button>
                                            </form>
                                        ) : (
                                            <button 
                                                onClick={() => setIsCreatingFolder(true)}
                                                className="flex items-center gap-2 w-full px-2 py-1.5 text-xs font-medium text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                            >
                                                <FolderPlus size={14} />
                                                新建一级文件夹
                                            </button>
                                        )}
                                    </div>

                                    {/* Tree List */}
                                    <div className="overflow-y-auto flex-1 py-1">
                                        <div 
                                            className={`flex items-center px-3 py-2 cursor-pointer ${!targetFolder ? 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                                            onClick={() => {
                                                setTargetFolder(null);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            <span className="w-5 mr-1"></span>
                                            <Folder size={16} className="mr-2 text-zinc-400" />
                                            <span className="text-sm">收件箱 (未分类)</span>
                                        </div>
                                        {treeData.map(node => renderFolderOption(node))}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <p className="text-xs text-zinc-500">
                            文件处理完成后将自动保存到选定位置。
                        </p>
                    </div>

                    {/* Status Info */}
                    <div className="mt-auto">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-500/20">
                            <div className="flex items-start gap-3">
                                <Sparkles className="text-primary mt-0.5" size={20} />
                                <div>
                                    <h4 className="text-xs font-bold text-primary mb-0.5">智能识别</h4>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400">系统将自动识别题目边界并进行拆分预览。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resize Handle */}
            <div 
                onMouseDown={startResizing}
                className="w-1 cursor-col-resize hover:bg-primary/50 transition-colors relative z-20 group flex items-center justify-center flex-none -ml-0.5"
            >
                <div className={`w-0.5 h-8 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-primary transition-colors ${isResizing ? 'bg-primary' : ''}`}></div>
            </div>

            {/* Right Column: Preview Area */}
            <main className="flex-1 flex flex-col bg-zinc-100 dark:bg-black min-w-0 animate-fade-in delay-75">
                {/* Preview Header */}
                <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-base font-semibold text-zinc-900 dark:text-white">拆分预览</h2>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">1 页</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 border border-zinc-200 dark:border-zinc-700/50">
                            <button 
                                onClick={() => setZoom(z => Math.max(50, z - 10))}
                                className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="px-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 min-w-[3rem] text-center">{zoom}%</span>
                            <button 
                                onClick={() => setZoom(z => Math.min(200, z + 10))}
                                className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                        <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700"></div>
                        <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                            <ChevronDown size={24} />
                        </button>
                    </div>
                </header>

                {/* Canvas Area */}
                <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-zinc-100 dark:bg-black relative">
                    <div 
                        className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 shadow-2xl shadow-zinc-200 dark:shadow-black rounded-sm p-12 relative flex flex-col gap-6 ring-1 ring-zinc-200 dark:ring-white/10 group select-none transition-colors"
                        style={{ width: '600px', height: '850px', transform: `scale(${zoom / 100})`, transformOrigin: 'top center', transition: 'transform 0.2s, background-color 0.2s' }}
                    >
                        {/* Header Mockup */}
                        <div className="flex justify-between items-end border-b-2 border-zinc-200 dark:border-zinc-600/30 pb-4 mb-4">
                            <div>
                                <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-600 rounded-sm mb-2"></div>
                                <div className="h-4 w-32 bg-zinc-300 dark:bg-zinc-700 rounded-sm"></div>
                            </div>
                            <div className="h-12 w-12 border border-zinc-200 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-700/50"></div>
                        </div>

                        {/* Problem 1 */}
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <span className="font-bold text-lg text-zinc-700 dark:text-zinc-300">1.</span>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-600/50 rounded-sm"></div>
                                    <div className="h-4 w-11/12 bg-zinc-200 dark:bg-zinc-600/50 rounded-sm"></div>
                                    <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-600/50 rounded-sm"></div>
                                </div>
                            </div>
                            <div className="pl-8 pt-2">
                                <div className="h-24 w-full bg-zinc-50 dark:bg-zinc-700/30 border border-zinc-200 dark:border-zinc-600/50 rounded p-4 flex items-center justify-center">
                                    <ImageIcon className="text-zinc-400 dark:text-zinc-500" size={32} />
                                </div>
                            </div>
                        </div>

                        {/* Splitter Line UI */}
                        <div className="absolute left-0 right-0 top-[42%] flex items-center group/split">
                            <div className="w-full border-t-2 border-dashed border-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
                            <div className="absolute right-0 -top-3.5 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-l shadow-lg shadow-blue-900/50 flex items-center gap-1 cursor-pointer hover:bg-blue-600 transition-colors z-10">
                                <Sparkles size={12} />
                                Auto-Split
                            </div>
                            <button className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white dark:bg-zinc-800 border border-primary text-primary rounded-full p-0.5 shadow-md opacity-0 group-hover/split:opacity-100 transition-opacity">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Problem 2 (Faded for effect) */}
                        <div className="space-y-3 mt-12 opacity-80">
                            <div className="flex gap-3">
                                <span className="font-bold text-lg text-zinc-700 dark:text-zinc-300">2.</span>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-600/50 rounded-sm"></div>
                                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-600/50 rounded-sm"></div>
                                    <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-600/50 rounded-sm"></div>
                                </div>
                            </div>
                            <div className="pl-8 grid grid-cols-2 gap-4 pt-2">
                                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700/40 rounded-sm"></div>
                                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700/40 rounded-sm"></div>
                                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700/40 rounded-sm"></div>
                                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700/40 rounded-sm"></div>
                            </div>
                        </div>

                        {/* Footer Page Number */}
                        <div className="absolute bottom-8 left-0 right-0 text-center">
                            <span className="text-xs text-zinc-400 dark:text-zinc-600">- 1 -</span>
                        </div>
                    </div>
                </div>

                {/* Footer Action Bar */}
                <div className="h-20 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end px-8 gap-4 z-20">
                    <button 
                        onClick={() => setViewMode('study')}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors"
                    >
                        取消
                    </button>
                    <button 
                         onClick={() => setViewMode('study')}
                         className="px-5 py-2.5 rounded-lg text-sm font-medium bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                    >
                        <Check size={18} />
                        确认并导入
                    </button>
                </div>
            </main>
        </>
    );
};

export default ImportWorkbench;
