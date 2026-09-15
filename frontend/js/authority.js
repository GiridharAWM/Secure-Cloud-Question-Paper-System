async function approvePaper(){

    const paperId = Number(document.getElementById("approvePaperId").value);

    if(!paperId){
        return showToast("Please enter a valid Paper ID.","error");
    }

    try{

        const result = await apiRequest("/papers/approve",{

            method:"POST",

            body:JSON.stringify({
                paperId
            })

        });

        document.getElementById("resultCard").style.display="block";
        document.getElementById("resultPaperId").textContent=paperId;
        document.getElementById("resultStatus").textContent="Approved";

        showToast(result.message);

    }catch(err){

        showToast(err.message,"error");

    }

}

async function scheduleExam(){

    const paperId = Number(document.getElementById("schedulePaperId").value);
    const examTime = document.getElementById("examTime").value;

    if(!paperId){
        return showToast("Please enter a valid Paper ID.","error");
    }

    if(!examTime){
        return showToast("Please select exam date and time.","error");
    }

    try{

        const result = await apiRequest("/papers/schedule",{

            method:"POST",

            body:JSON.stringify({

                paperId,
                exam_time:examTime

            })

        });

        document.getElementById("resultCard").style.display="block";
        document.getElementById("resultPaperId").textContent=paperId;
        document.getElementById("resultStatus").textContent="Scheduled";

        showToast(result.message);

        document.getElementById("examTime").value="";

    }catch(err){

        showToast(err.message,"error");

    }

}