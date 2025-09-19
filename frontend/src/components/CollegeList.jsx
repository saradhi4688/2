import React, {useEffect, useState} from 'react';
import API from '../api/api';
export default function CollegeList(){
const [list, setList] = useState([]);
useEffect(()=>{(async ()=>{
try{
// optional: get geolocation from browser
const res = await API.get('/colleges');
setList(res.data);
}catch(e){console.error(e)}
})()},[]);
return (
<div className="p-6">
<h2 className="text-xl">Nearby Government Colleges</h2>
<ul className="mt-4">
{list.map(c=> (
<li key={c._id} className="p-3 border rounded mb-2">
<h3 className="font-semibold">{c.name}</h3>
<div>{c.degrees?.join(', ')}</div>
</li>
))}
</ul>
</div>
);
}