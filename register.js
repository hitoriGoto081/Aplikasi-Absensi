const nik = document.querySelector("#nik");
const password = document.querySelector("#password");
const btnRegis = document.querySelector("#btnRegis");
const btnLogin = document.querySelector("#btnLogin");

async function registrasi(data){
    try{
        const req = await fetch("http://localhost:3000/registrasi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if(!req.ok){
            console.log(await req.text());
            throw new Error(`Terjadi error: ${await req.text()}`);
        }
        else{
            console.log("berhasil");
            alert(await req.text());
            nik.value = "";
            password.value = "";
            window.location.href = "login.html";
        }
    }
    catch(err){
        console.log(err);
        alert(err);
    }
}

btnRegis.addEventListener("click", function(){
    const data = {
        "nik": nik.value,
        "password": password.value
    }

    registrasi(data);
});