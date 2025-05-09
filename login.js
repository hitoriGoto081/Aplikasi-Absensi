const nik = document.querySelector("#nik");
const password = document.querySelector("#password");
const btnRegis = document.querySelector("#btnRegis");
const btnLogin = document.querySelector("#btnLogin");

async function login(data){
    try{
        const req = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const res = await req.text();

        if(!req.ok){
            console.log(res);
            throw new Error(res);
        }
        else{
            console.log("berhasil")
            alert(res);
            nik.value = "";
            password.value = "";
            window.location.href = "dashboard.html";
        }
    }
    catch(err){
        console.log(err);
        alert(err);
    }
}

btnLogin.addEventListener("click", function(){
    const data = {
        "nik": nik.value,
        "password": password.value
    }

    login(data);
});

btnRegis.addEventListener("click", function(){
    window.location.href = "register.html";
})