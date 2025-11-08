import { useState } from 'react';
export default function Trade(){
  const token = localStorage.getItem('deriv_token');
  const [symbol,setSymbol]=useState('R_100'); const [contract,setContract]=useState('DIGITDIFF');
  const [stake,setStake]=useState('1'); const [duration,setDuration]=useState('1'); const [resp,setResp]=useState(null);

  const buy=async()=>{ const res=await fetch('http://localhost:5000/api/trade/buy',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token,contract_type:contract,symbol,stake,duration})}); const j=await res.json(); setResp(j); };
  const getTick=async()=>{ const res=await fetch('http://localhost:5000/api/market/tick',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token,symbol})}); const j=await res.json(); setResp(j); };

  return (<div style={{padding:20}}><h2>Trade</h2><div>Symbol: <input value={symbol} onChange={e=>setSymbol(e.target.value)}/></div><div>Contract: <input value={contract} onChange={e=>setContract(e.target.value)}/></div><div>Stake: <input value={stake} onChange={e=>setStake(e.target.value)}/></div><div>Duration: <input value={duration} onChange={e=>setDuration(e.target.value)}/></div><div style={{marginTop:10}}><button onClick={buy}>Buy</button> <button onClick={getTick}>Get Tick</button></div><pre style={{marginTop:20}}>{JSON.stringify(resp,null,2)}</pre></div>);
}
