import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login(){
  const [token,setToken]=useState(''); const navigate=useNavigate();
  const submit=()=>{ localStorage.setItem('deriv_token', token); navigate('/dashboard'); };
  return (<div style={{padding:20}}><h2>Deriv Demo — Paste your API Token</h2><input value={token} onChange={e=>setToken(e.target.value)} style={{width:400}}/><div style={{marginTop:10}}><button onClick={submit}>Continue</button></div></div>);
}
