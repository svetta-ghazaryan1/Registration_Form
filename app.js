role.addEventListener("change",(evt)=>{
    drowInp(evt.target.value)
})

window.addEventListener("load",()=>{
    drowInp(role.value);
})

function drowInp(a){
    const elem = document.querySelector(".stud_teach");
    if(a === "student"){
        elem.innerHTML = `
             <label for="faculty">Faculty</label>
            <input type="text" id="0" name="faculty">
        `
    } else if(a === "teacher"){
        elem.innerHTML = `
            <label for="experience">Experience (Years)</label>
            <input type="number" id="1" name="experience">
        `   
    }
}



const patterns = [
    /^[A-Z]/,
    /^[A-Z]/,
    /^\d{4}-(((0[2024]|1[02])-(0[1-9]|[12]\d|3[0-1]))|(02-(0[1-9]|[12]\d))|((0[469]|11)-(0[1-9]|[12]\d|30)))$/,
    [/^[A-Z]/, /^[0-9]/,],
    [    
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{7}$/,
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{9}$/,
    ]
]


registrationForm.addEventListener("submit",getInfos);

function getInfos(evt){
    evt.preventDefault();
    let sell;
    const obj = {};
    const form = document.querySelectorAll("#registrationForm input");
    let flag = true;
    obj["id"] = new Date().getMilliseconds();
    obj[role.name] = role.value;
    form.forEach((item,index)=>{
        if(role.value === "student"){
            sell = 0;
        } else {
            sell = 1;
        }
        const fl = patterns[index] instanceof Array;
        const answ = fl ? patterns[index][sell] : patterns[index];
        if(!item.value.match(answ)){
            flag = false;
            item.classList.add("errorShow")
        } else {
            item.classList.remove("errorShow")
            obj[item.name] = item.value;
        }
        item.value = "";    
    })
    if(flag){
        storage(obj);
    }
}



function storage(object){
    const storageData = JSON.parse(localStorage.getItem("db")) || [];
    storageData.push(object);
    localStorage.setItem("db",JSON.stringify(storageData))
}