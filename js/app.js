//loading categories

const loadAllCategories=()=>{
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(response=>response.json())
    .then(data=>displayCategories(data.categories));
    
}
//showing buttons
const displayCategories=(catagory)=>{
    const buttonContainer=document.getElementById('button-container');
    catagory.forEach(type => {
     console.log(type);
  const buttonDiv=document.createElement('div');
  buttonDiv.innerHTML=`
  <button id="btn-${type.id}" class="border-2 flex gap-10 px-5 py-3 justify-center items-center active:bg-secondaryColor  rounded-lg active:rounded-full " onclick="loadCategoryWiseItems(${type.id})">
    <img src="${type.category_icon}">
    <p class="font-bold text-3xl active:bg-secondaryColor active:text-white">${type.category}</p>

</button>
  
  `
buttonContainer.appendChild(buttonDiv);
        
    });

}

//kaj baki
const loadCategoryWiseItems=(type)=>{
    console.log(`${type} is clicked`)
}



const loadAllPetData=async()=>{
    const response= await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data= await response.json();
    showPetCards(data.pets)

    console.log(data.pets)
    }

const showPetCards=(items)=>{
    const petsContainer=document.getElementById('pets-container');
items.forEach(item => {
    let petDiv=document.createElement('div');
    petDiv.innerHTML=`
      <div class="card card-compact p-5 border-2 ">
        <figure>
          <img class="w-full"
            src="${item.image}"
            alt="pet" />
        </figure>
        <div class="">
          <h2 class="card-title text-2xl font-bold py-2">${item.pet_name}</h2>
          <p><i class="fa-solid fa-sitemap"></i> Breed :${item.breed}</p>
          <p><i class="fa-solid fa-briefcase"></i> Birth : ${item.date_of_birth}</p>
          <p><i class="fa-solid fa-mercury"></i> Gender : ${item.gender}</p>
          <p><i class="fa-solid fa-dollar-sign"></i> Price : ${item.price}</p>
          <div class="divider"></div>
          <div class="flex justify-between items-center">
         <button class="text-secondaryColor text-sm px-4 py-2 font-bold border-secondaryColor border rounded-md"><i class="fa-regular fa-thumbs-up"></i></button>
         <button class="text-secondaryColor text-sm px-4 py-2 font-bold border-secondaryColor border rounded-md">Adopt</button>
         <button class="text-secondaryColor text-sm px-4 py-2 font-bold border-secondaryColor border rounded-md">Details</button>
          </div>
        </div>
      </div>

      `

    petsContainer.appendChild(petDiv)
});
    

}

loadAllCategories()
loadAllPetData();