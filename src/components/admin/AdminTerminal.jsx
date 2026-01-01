import React, { useEffect, useRef, useState } from 'react';
import {
    ChevronRight,
    ChevronDown,
    Folder,
    File,
    FileCode,
    FileJson,
    FileImage,
    Terminal
} from 'lucide-react';

const SAMPLE_FALLBACK_IMAGE = '/mnt/data/941b621e-f0c1-42e5-8049-9340e3ff3de2.png';

const AdminTerminal = ({ fileTreeUrl = '/file-tree.json', onOpenFile, onOpenSection }) => {
    const [fileTree, setFileTree] = useState(null);
    const [visibleNodes, setVisibleNodes] = useState([]);
    const [expandedPaths, setExpandedPaths] = useState(new Set());
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const [viewerOpen, setViewerOpen] = useState(false);
    const [viewerType, setViewerType] = useState(null);
    const [viewerSrc, setViewerSrc] = useState('');
    const [viewerFile, setViewerFile] = useState(null);

    const containerRef = useRef(null);
    const selectedRef = useRef(null);

    useEffect(() => {
        fetch(fileTreeUrl)
            .then(r => { if (!r.ok) throw new Error('fetch failed'); return r.json(); })
            .then(json => {
                setFileTree(json);
                const initial = new Set();
                const top = Array.isArray(json) ? json : json.children || [];
                top.forEach(n => {
                    if (n && (n.type === 'dir' || n.type === 'directory')) {
                        const p = n.path || n.name;
                        initial.add(p);
                    }
                });
                setExpandedPaths(initial);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load file tree:', err);
                setFileTree([]);
                setLoading(false);
            });
    }, [fileTreeUrl]);

    useEffect(() => {
        if (!fileTree) return;

        const flatten = (node, parent = '', depth = 0) => {
            const out = [];
            const name = node.name || '';
            const path = node.path || (parent ? `${parent}/${name}` : name);
            const type = node.type || (node.children ? 'directory' : 'file');

            out.push({ name, type, path, depth, children: node.children || [] });

            if ((type === 'dir' || type === 'directory') && node.children && expandedPaths.has(path)) {
                for (const c of node.children) {
                    out.push(...flatten(c, path, depth + 1));
                }
            }
            return out;
        };

        const top = Array.isArray(fileTree) ? fileTree : fileTree.children || [];
        const all = [];
        for (const t of top) all.push(...flatten(t, '', 0));
        setVisibleNodes(all);
    }, [fileTree, expandedPaths]);

    useEffect(() => {
        if (!selectedRef.current || !containerRef.current) return;
        const cRect = containerRef.current.getBoundingClientRect();
        const sRect = selectedRef.current.getBoundingClientRect();
        if (sRect.top < cRect.top + 80 || sRect.bottom > cRect.bottom - 80) {
            selectedRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [selectedIndex, visibleNodes, viewerOpen]);

    const resolveFileToViewer = (path) => {
        const ext = String(path).split('.').pop().toLowerCase();
        const url = path.startsWith('/') ? path : `/${path}`;

        if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'].includes(ext)) {
            return { type: 'image', src: url };
        }
        if (['mp4', 'webm', 'ogg'].includes(ext)) {
            return { type: 'video', src: url };
        }
        if (['pdf'].includes(ext)) {
            return { type: 'pdf', src: url };
        }
        if ([
            'js', 'jsx', 'ts', 'tsx', 'py', 'java', 'c', 'cpp',
            'json', 'md', 'txt', 'html', 'css'
        ].includes(ext)) {
            return { type: 'text', src: url };
        }
        return { type: 'text', src: url };
    };

    const openNode = (node) => {
        if (!node) return;

        if (node.type === 'directory' || node.type === 'dir') {
            toggleExpand(node.path);
            if (onOpenSection) onOpenSection(node.path);
            return;
        }

        const resolved = resolveFileToViewer(node.path);
        setViewerType(resolved.type);
        setViewerSrc(resolved.src);
        setViewerFile(node);
        setViewerOpen(true);

        if (onOpenFile) onOpenFile(node.path);
    };

    const toggleExpand = (path) => {
        setExpandedPaths(prev => {
            const next = new Set(prev);
            next.has(path) ? next.delete(path) : next.add(path);
            return next;
        });
    };

    useEffect(() => {
        const handler = (e) => {
            if (viewerOpen) {
                if (e.key === 'Backspace' || e.key === 'Escape') {
                    e.preventDefault();
                    setViewerOpen(false);
                    setViewerType(null);
                    setViewerSrc('');
                    setViewerFile(null);
                }
                return;
            }
            if (!visibleNodes.length) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(i => Math.min(i + 1, visibleNodes.length - 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(i => Math.max(i - 1, 0));
                    break;
                case 'Enter':
                    e.preventDefault();
                    openNode(visibleNodes[selectedIndex]);
                    break;
                case 'ArrowLeft':
                case 'Backspace':
                    e.preventDefault();
                    collapse();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    expand();
                    break;
                case 'Home':
                    e.preventDefault();
                    setSelectedIndex(0);
                    break;
                case 'End':
                    e.preventDefault();
                    setSelectedIndex(visibleNodes.length - 1);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [visibleNodes, selectedIndex, expandedPaths, viewerOpen]);

    const expand = () => {
        const node = visibleNodes[selectedIndex];
        if (node && (node.type === 'directory' || node.type === 'dir') && !expandedPaths.has(node.path)) {
            toggleExpand(node.path);
        }
    };

    const collapse = () => {
        const node = visibleNodes[selectedIndex];
        if (!node) return;

        if ((node.type === 'directory' || node.type === 'dir') && expandedPaths.has(node.path)) {
            toggleExpand(node.path);
            return;
        }

        const parent = node.path.includes('/') ? node.path.split('/').slice(0, -1).join('/') : '';
        const pIdx = visibleNodes.findIndex(n => n.path === parent);
        if (pIdx !== -1) setSelectedIndex(pIdx);
    };

    const getIcon = (name, type) => {
        if (type === 'directory' || type === 'dir') {
            return <Folder size={16} className="text-green-400" />;
        }
        const ext = String(name).split('.').pop().toLowerCase();
        const props = { size: 16, className: 'text-green-500' };
        if (['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'c', 'cpp', 'css', 'html'].includes(ext)) {
            return <FileCode {...props} />;
        }
        if (['json', 'yml', 'yaml', 'xml'].includes(ext)) {
            return <FileJson {...props} />;
        }
        if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'].includes(ext)) {
            return <FileImage {...props} />;
        }
        return <File {...props} />;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center crt-screen">
                <div className="text-center">
                    <Terminal size={48} className="mx-auto mb-4 animate-pulse" />
                    <div>Loading secure admin terminal...</div>
                </div>
            </div>
        );
    }

    const Viewer = () => {
        if (!viewerOpen || !viewerType) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-6 crt-screen">
                <div className="w-full max-w-5xl max-h-[90vh] overflow-auto rounded shadow-lg border border-green-800 bg-black/80 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-green-300">
                            <span className="text-green-500">root@rapt0r:~$</span> open {viewerFile?.path}
                        </div>
                        <div className="text-xs text-green-600">Press Backspace or Esc to close</div>
                    </div>

                    <div className="bg-black p-2 rounded overflow-auto">
                        {viewerType === 'text' && (
                            <pre className="text-sm leading-relaxed whitespace-pre-wrap text-green-200">
                                {`Attempting to load: ${viewerSrc}

If file is in /public (e.g. /assets/...), the browser will fetch it.
Otherwise this is just a placeholder preview.`}
                            </pre>
                        )}

                        {viewerType === 'image' && (
                            <img
                                src={viewerSrc || SAMPLE_FALLBACK_IMAGE}
                                alt={viewerFile?.name || 'image'}
                                style={{ maxWidth: '100%', maxHeight: '75vh', display: 'block', margin: '0 auto' }}
                            />
                        )}

                        {viewerType === 'video' && (
                            <video
                                src={viewerSrc}
                                controls
                                style={{ width: '100%', maxHeight: '75vh', display: 'block', margin: '0 auto' }}
                            />
                        )}

                        {viewerType === 'pdf' && (
                            <iframe
                                src={viewerSrc}
                                title={viewerFile?.name || 'pdf'}
                                style={{ width: '100%', height: '75vh', border: 'none', display: 'block', margin: '0 auto' }}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden crt-screen">
            <div className="scanlines crt-flicker crt-vignette pointer-events-none" aria-hidden />

            <div ref={containerRef} className="relative z-10 p-8">
                <img 
                    src="logo.png" 
                    alt="Terminal Logo" 
                    className="w-40 h-50 opacity-80 object-contain"
                    style={{ filter: 'brightness(0) saturate(100%) invert(64%) sepia(86%) saturate(389%) hue-rotate(76deg) brightness(96%) contrast(86%)' }}
                />

            <div className="mb-4 text-green-300 text-sm"> root@rapt0r:~$ Initiating secure terminal<br/>
                root@rapt0r:~$ secure-admin-mode enabled<br/>                
                root@raptOr:~$ Loading portfolio modules<br/>
                root@rapt0r:~$ Access granted<br/>
                root@raptor:~$ Is -la
                </div>
               

                <div className="border border-green-700 p-3 bg-black/40 max-h-[70vh] overflow-y-auto">
                    {visibleNodes.map((node, idx) => {
                        const isSelected = idx === selectedIndex;
                        const isExpanded = expandedPaths.has(node.path);
                        return (
                            <div
                                key={node.path + idx}
                                ref={isSelected ? selectedRef : null}
                                className={`flex items-center gap-2 py-1 px-2 cursor-pointer transition-colors ${
                                    isSelected ? 'text-white bg-green-900/40' : 'text-green-400 hover:text-green-200'
                                }`}
                                style={{ paddingLeft: `${node.depth * 22 + 8}px` }}
                                onClick={() => {
                                    setSelectedIndex(idx);
                                    openNode(node);
                                }}
                            >
                                {node.type === 'directory'
                                    ? (isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />)
                                    : <span style={{ width: 14 }} />
                                }
                                {getIcon(node.name, node.type)}
                                <span className="text-sm">{node.name}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 text-xs text-green-600 space-y-1">
                    <div>Total Items: {visibleNodes.length}</div>
                    <div>Selected: {visibleNodes[selectedIndex]?.path || 'None'}</div>
                </div>
            </div>

            {viewerOpen && <Viewer />}

            <style>{`
                .crt-screen { 
                    animation: flicker 0.29s infinite; 
                }
                
                @keyframes flicker { 
                    0% { opacity: 0.8; } 
                    90% { opacity: 0.9; } 
                    100% { opacity: 0.97; } 
                }
                
                .scanlines { 
                    position: fixed; 
                    top: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 100%;
                    background: linear-gradient(to bottom, transparent 50%, rgba(0, 255, 0, 0.03) 51%);
                    background-size: 100% 4px; 
                    animation: scan 8s linear infinite; 
                    pointer-events: none; 
                    z-index: 1; 
                }
                
                @keyframes scan { 
                    0% { transform: translateY(0); } 
                    100% { transform: translateY(4px); } 
                }
                
                .crt-flicker { 
                    position: fixed; 
                    top: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 100%;
                    background: rgba(0, 255, 0, 0.02); 
                    animation: textFlicker 0.2s infinite; 
                    pointer-events: none; 
                    z-index: 1; 
                }
                
                @keyframes textFlicker { 
                    0%, 100% { opacity: 1; } 
                    50% { opacity: 0.8; } 
                }
                
                .crt-vignette { 
                    position: fixed; 
                    top: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 100%; 
                    box-shadow: inset 0 0 150px rgba(0,0,0,0.9); 
                    pointer-events: none; 
                    z-index: 2; 
                }
                
                ::-webkit-scrollbar { 
                    width: 8px; 
                }
                
                ::-webkit-scrollbar-track { 
                    background: #000; 
                }
                
                ::-webkit-scrollbar-thumb { 
                    background: #22c55e; 
                    border-radius: 4px; 
                }
                
                ::-webkit-scrollbar-thumb:hover { 
                    background: #16a34a; 
                }
            `}</style>
        </div>
    );
};

export default AdminTerminal;