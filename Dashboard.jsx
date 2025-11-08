import { useEffect, useState } from 'react';
export default function Dashboard(){
  const token = localStorage.getItem('deriv_token');
  const [balance,setBalance]=useState(null);
  useEffect(()=>{ if(!token) return; fetch('http://localhost:5000/api/portfolio/balance',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})}).then(r=>r.json()).then(d=>setBalance(d)).catch(e=>setBalance({error:e.toString()})); },[]);
  return (<div style={{padding:20}}><h2>Dashboard</h2><div>Balance: <pre>{JSON.stringify(balance,null,2)}</pre></div><div style={{marginTop:10}}><a href='/trade'>Go to Trade</a></div></div>);
}
