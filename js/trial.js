/*
col-  #0E7A81
 font-family: "Lato", sans-serif;
  font-family: "Manrope", sans-serif;
*/

fetch('https://openapi.programming-hero.com/api/peddy/pets')
.then(res=>res.json())
.then(data=>console.log(data))





// fetch('https://openapi.programming-hero.com/api/peddy/categories')



// document.getElementById('spinner').style.display='block';
//     setTimeout(function(){
//        loadAllPhones(false,searchText)
//     },3000)