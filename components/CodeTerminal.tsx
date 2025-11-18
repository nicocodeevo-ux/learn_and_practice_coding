import React, { useState } from 'react';

interface CodeTerminalProps {
  language: string;
}

const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);

const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
);


export const CodeTerminal: React.FC<CodeTerminalProps> = ({ language }) => {
  const [code, setCode] = useState('// Type your JavaScript code here!\nconsole.log("Hello, Teacher!");');
  const [output, setOutput] = useState<string[]>([]);

  const handleRunCode = () => {
    const newOutput: string[] = [];
    const originalConsoleLog = console.log;

    // Override console.log to capture output
    console.log = (...args) => {
      newOutput.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' '));
    };

    try {
      // Use Function constructor for safer execution than eval
      new Function(code)();
    } catch (error) {
      if (error instanceof Error) {
        newOutput.push(`Error: ${error.message}`);
      } else {
        newOutput.push('An unknown error occurred.');
      }
    } finally {
      // Restore original console.log
      console.log = originalConsoleLog;
      setOutput(prev => [...prev, ...newOutput]);
    }
  };
  
  const handleClearOutput = () => {
    setOutput([]);
  };

  if (language !== 'javascript') {
    return (
      <div className="mt-8 pt-6 border-t border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Code Playground</h3>
        <div className="bg-slate-900/70 rounded-lg p-4 text-center text-slate-400">
          <p>Interactive practice is currently available for JavaScript lessons only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 pt-6 border-t border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4">JavaScript Practice Terminal</h3>
      <div className="bg-slate-900/70 rounded-lg shadow-inner overflow-hidden">
        {/* Editor */}
        <div className="p-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-48 bg-transparent text-sky-300 font-mono text-sm resize-none focus:outline-none"
            placeholder="// Your JavaScript code goes here..."
            spellCheck="false"
          />
        </div>

        {/* Controls */}
        <div className="p-2 flex justify-end items-center gap-2 bg-slate-800/50 border-t border-b border-slate-700">
           <button
             onClick={handleClearOutput}
             className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-md transition-colors"
           >
             <XCircleIcon />
             Clear Output
           </button>
          <button
            onClick={handleRunCode}
            className="flex items-center gap-2 text-xs font-semibold text-primary bg-accent hover:bg-sky-400 px-4 py-1.5 rounded-md transition-colors"
          >
             <PlayIcon />
            Run Code
          </button>
        </div>

        {/* Output */}
        <div className="p-4 h-32 overflow-y-auto">
          <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap">
            {output.length > 0 ? output.map((line, index) => (
              <div key={index} className={`flex items-start ${line.toLowerCase().startsWith('error:') ? 'text-red-400' : ''}`}>
                  <span className="mr-2 text-slate-500 select-none">&gt;</span>
                  <span>{line}</span>
              </div>
            )) : <span className="text-slate-500">Output will appear here...</span>}
          </pre>
        </div>
      </div>
    </div>
  );
};
