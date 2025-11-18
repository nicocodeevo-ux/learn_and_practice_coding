import fetch from 'node-fetch';

const base = process.env.VPT_PROXY_URL || 'http://localhost:4000';

async function postRun(language, code) {
  const res = await fetch(`${base}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language, code }),
    timeout: 20000,
  });
  const text = await res.text();
  return { status: res.status, text };
}

(async () => {
  const outputs = [];
  try {
    outputs.push('Integration runner started');
    const js = await postRun('javascript', 'console.log("hello from js")');
    outputs.push('JS status: ' + js.status);
    outputs.push('JS body: ' + js.text);

    const py = await postRun('python', 'print("hello from py")');
    outputs.push('PY status: ' + py.status);
    outputs.push('PY body: ' + py.text);

    // Basic check
    const jsOk = js.status === 200 && js.text.includes('hello from js');
    const pyOk = py.status === 200 && py.text.includes('hello from py');

    outputs.push(`JS OK: ${jsOk}`);
    outputs.push(`PY OK: ${pyOk}`);

    if (!jsOk || !pyOk) {
      outputs.push('One or more checks failed');
      console.log(outputs.join('\n'));
      process.exitCode = 2;
      return;
    }

    outputs.push('All integration checks passed');
    console.log(outputs.join('\n'));
  } catch (err) {
    console.error('Integration runner error', err);
    process.exitCode = 3;
  }
})();
