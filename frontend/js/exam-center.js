async function openPaper(){

    const paperId = Number(document.getElementById("paperId").value);
    const deviceId = document.getElementById("deviceId").value.trim();

    if(!paperId){
        return showToast("Please enter a valid Paper ID.","error");
    }

    if(!deviceId){
        return showToast("Please enter the Device ID.","error");
    }

    try{

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5000/api/papers/release/${paperId}`,
            {
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "Device-ID":deviceId
                }
            }
        );

        const result = await response.json();

        if(!response.ok){
            throw new Error(result.message || "Request failed");
        }

        document.getElementById("resultCard").style.display="block";
        document.getElementById("paperNumber").textContent=paperId;
        document.getElementById("paperContent").textContent=result.paper;

        showToast("Question paper released successfully.");

        document.getElementById("resultCard").scrollIntoView({
            behavior:"smooth"
        });

    }catch(err){

        showToast(err.message,"error");

    }

}