async function createPaper(){

    const title=document.getElementById("title").value.trim();
    const content=document.getElementById("content").value.trim();

    if(!title||!content){
        return showToast("Please fill all fields.","error");
    }

    try{

        const result=await apiRequest("/papers/create",{

            method:"POST",

            body:JSON.stringify({
                title,
                content
            })

        });

        document.getElementById("resultCard").style.display="block";
        document.getElementById("paperIdDisplay").textContent=result.paperId;
        document.getElementById("hashDisplay").textContent=result.hash;

        showToast("Question paper created successfully.");

        document.getElementById("title").value="";
        document.getElementById("content").value="";

        document.getElementById("resultCard").scrollIntoView({
            behavior:"smooth"
        });

    }catch(err){

        showToast(err.message,"error");

    }

}