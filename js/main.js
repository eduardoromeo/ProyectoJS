import { Router } from "./router.js";

const app= document.getElementById("app")
const router = new Router(app)

router.navigate("dashboard")

document.getElementById("dash-btn").addEventListener("click",()=>{
    router.navigate("dashboard")
})
document.getElementById("prod-btn").addEventListener("click",()=>{
    router.navigate("products")
})
document.getElementById("mision-btn").addEventListener("click",()=>{
    router.navigate("mision")
})
document.getElementById("vision-btn").addEventListener("click",()=>{
    router.navigate("vision")
})