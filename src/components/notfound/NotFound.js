import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import './notfound.css';

const BOOT = [
  { text: 'BALLOON/OS v2.4.1 ── KERNEL PANIC', cls: 'crt-fatal' },
  { text: '', cls: '' },
  { text: '[ OK ]  Loading experience engine .........', cls: 'crt-ok' },
  { text: '[ OK ]  Initializing booking module ........', cls: 'crt-ok' },
  { text: '[ OK ]  Mounting category filesystem .......', cls: 'crt-ok' },
  { text: '[FAIL]  Route resolution ── segment not found', cls: 'crt-fail' },
  { text: '', cls: '' },
  { text: 'FATAL: 0x00000404 ── PAGE_NOT_FOUND', cls: 'crt-fatal' },
  { text: 'The requested path does not exist in memory.', cls: '' },
  { text: '', cls: '' },
  { text: '─'.repeat(46), cls: 'crt-dim' },
  { text: 'Type  "home"  and press ENTER to recover.', cls: 'crt-hint' },
];

export const NotFound = () => {
  const [printed, setPrinted] = useState([]);
  const [typing, setTyping] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [ready, setReady] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  // Typewriter
  useEffect(() => {
    if (lineIdx >= BOOT.length) {
      setReady(true);
      setTimeout(() => inputRef.current?.focus(), 80);
      return;
    }
    const { text } = BOOT[lineIdx];
    if (charIdx < text.length) {
      const delay = charIdx === 0 && lineIdx > 5 ? 220 : 22;
      const t = setTimeout(() => {
        setTyping(text.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, delay);
      return () => clearTimeout(t);
    } else {
      const pause = text === '' ? 40 : lineIdx === 7 ? 380 : 130;
      const t = setTimeout(() => {
        setPrinted((p) => [...p, BOOT[lineIdx]]);
        setTyping('');
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, pause);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [printed, output, typing]);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.trim().toLowerCase();
    setOutput((o) => [...o, { text: `$ ${input}`, cls: 'crt-cmd' }]);
    setInput('');
    if (['home', 'exit', 'cd /', 'cd ~', 'go home'].includes(cmd)) {
      setOutput((o) => [...o, { text: 'Redirecting to home... OK', cls: 'crt-success-cmd' }]);
      setTimeout(() => navigate('/'), 700);
    } else if (cmd === '') {
      // noop
    } else {
      setOutput((o) => [...o, { text: `bash: ${cmd}: command not found`, cls: 'crt-warn' }]);
    }
  };

  return (
    <div className="crt-page" onClick={() => inputRef.current?.focus()}>
      <div className="crt-scanlines" />
      <div className="crt-vignette" />

      <div className="crt-terminal">
        <div className="crt-glitch-wrap">
          <span className="crt-badge">⚠ SYSTEM ERROR</span>
          <br />
          <span className="crt-404" data-text="404">404</span>
        </div>

        <div className="crt-screen">
          {printed.map((line, i) => (
            <div key={i} className={`crt-line ${line.cls}`}>
              {line.text || ' '}
            </div>
          ))}

          {typing !== '' && lineIdx < BOOT.length && (
            <div className={`crt-line ${BOOT[lineIdx]?.cls || ''}`}>
              {typing}
              <span className="crt-cursor" />
            </div>
          )}

          {ready && (
            <>
              {output.map((line, i) => (
                <div key={i} className={`crt-line ${line.cls}`}>
                  {line.text}
                </div>
              ))}
              <div className="crt-input-row">
                <span className="crt-prompt">$&nbsp;</span>
                <input
                  ref={inputRef}
                  className="crt-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
