import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Trade from "./pages/Trade.jsx";
import Dashboard from "./pages/Dashboard.jsx";
export default function App(){ return (<Routes><Route path='/' element={<Login/>}/><Route path='/dashboard' element={<Dashboard/>}/><Route path='/trade' element={<Trade/>}/></Routes>); }
