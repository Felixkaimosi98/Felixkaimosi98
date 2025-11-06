const logBox = document.getElementById('log');
function log(msg){ logBox.innerHTML += msg + "<br>"; }

async function getBalance(){
  try{
    const res = await fetch('/api/balance');
    const data = await res.json();
    document.getElementById('balance').innerText = data.balance;
  }catch(e){ log("Error loading balance"); }
}
getBalance();
setInterval(getBalance, 5000);

document.getElementById('buyUp').onclick = ()=> trade('CALL');
document.getElementById('buyDown').onclick = ()=> trade('PUT');

async function trade(type){
  const amount = document.getElementById('amount').value;
  if(!amount) return log("Enter amount");
  log("Placing trade...");
  const res = await fetch('/api/buy', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({amount,type})
  });
  const data = await res.json();
  log(JSON.stringify(data));
}
