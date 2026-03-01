let url = "https://catfact.ninja/fact";
let fetchDataBtn = document.querySelector("#fetchDataBtn");
fetchDataBtn.addEventListener("click", async () => {
    console.log('fetching data...');
        let dataDisplay = document.querySelector("#dataDisplay");

//    fetchData().then(res=>{
// dataDisplay.innerText = res;
// })
let fetchedData = await fetchData();
dataDisplay.innerText = fetchedData;
});

// function fetchData(){
// return fetch(url)
// .then((res)=>
//  res.json()
// )
// .then((data)=>{
//     console.log(data);
//     return data.fact;
// })
// .catch((err)=>{
//     console.log(err);
// })
// }
async function fetchData(){
 let res = await fetch(url);
 let data = await res.json();
console.log(data);
 return data.fact;
}