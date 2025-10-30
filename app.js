const statusEl = document.getElementById('status');
const balEl = document.getElementById('balance');
const logs = document.getElementById('logs');
const modeSel = document.getElementById('mode');
const refreshBtn = document.getElementById('refresh');

async function fetchStatus(){
  try{
    const r = await fetch('/api/status');
    const j = await r.json();
    statusEl.textContent = `Status: ${j.status} — mode=${j.mode} — token_set=${j.token_set}`;
    modeSel.value = j.mode || 'demo';
  }catch(e){ statusEl.textContent = 'Status: Error'; logs.textContent = String(e); }
}

async function fetchBalance(){
  balEl.textContent = 'Balance: Loading...'; logs.textContent = '';
  try{
    const r = await fetch('/api/balance');
    const j = await r.json();
    if(r.ok){
      if(j.demo){ balEl.textContent = `Balance: ${j.balance} ${j.currency || 'USD'} (Demo)`; }
      else if(j.balance){ balEl.textContent = `Balance: ${j.balance} ${j.currency || ''}`; }
      else { balEl.textContent = 'Balance: (unexpected response)'; logs.textContent = JSON.stringify(j,null,2); }
    } else { balEl.textContent = 'Balance: Error'; logs.textContent = JSON.stringify(j,null,2); }
  }catch(e){ balEl.textContent = 'Balance: Error'; logs.textContent = String(e); }
}

refreshBtn.addEventListener('click', ()=> fetchBalance());

fetchStatus().then(fetchBalance);
