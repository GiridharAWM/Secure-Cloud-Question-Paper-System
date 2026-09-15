async function loadLogs(){

try{

const logs=await apiRequest("/audit/logs");

const tbody=document.getElementById("logs");

tbody.innerHTML="";

(Array.isArray(logs)?logs:[logs]).forEach(log=>{

tbody.innerHTML+=`
<tr>
<td>${log.full_name||""}</td>
<td>${log.role_name||""}</td>
<td>${log.action||""}</td>
<td>${log.timestamp||""}</td>
</tr>
`;

});

}catch(err){
alert(err.message);
}

}

window.onload=loadLogs;