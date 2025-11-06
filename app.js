fetch('/api/balance')
  .then(r=>r.json())
  .then(d=>{
    document.getElementById('balance').innerText = 'Balance: ' + (d.balance || d.result || 'Error');
  });
