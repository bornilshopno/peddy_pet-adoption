//loading categories

const loadAllCategories = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(response => response.json())
    .then(data => displayCategories(data.categories));

}
//showing buttons
const displayCategories = (catagory) => {
  
  const buttonContainer = document.getElementById('button-container');
  catagory.forEach(type => {
    const { id, category, category_icon } = type;
    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = `
  <button id="btn-${category}" class="border-2 flex gap-6 px-5 py-2 justify-center items-center rounded-lg category-btns w-48" onclick="loadCategoryWiseItems('${category}')">
    <img src="${type.category_icon}" class="h-8">
    <p class="font-bold text-3xl active:bg-secondaryColor active:text-white">${category}</p>
</button>  
  `;

    buttonContainer.appendChild(buttonDiv);
  });

}

const loadCategoryWiseItems = async (item) => {
  const petsContainer = document.getElementById('pets-container');
  petsContainer.innerHTML =`<div class="absolute top-[30%] right-[50%]">
                <div id="loader2" class=""></div>
            </div>`  
  document.getElementById('loader2').style.display='block';
  removeActiveClass();
  const categoryBtn = document.getElementById(`btn-${item}`);
  categoryBtn.classList.add('active')

  const url = `https://openapi.programming-hero.com/api/peddy/category/${item}`;
  const response = await fetch(url);
  const data = await response.json();

  setTimeout(function () {
       showPetCards(data.data)
  }, 3000)
}


const showPetCards = (items) => {
  const petsContainer = document.getElementById('pets-container');

  petsContainer.innerHTML = ``;

  if (items.length === 0) {

    petsContainer.classList.remove("grid");
    let blankdiv = document.createElement('div');
    blankdiv.innerHTML = `
    <div class="space-y-5 border-dashed border-secondaryColor border-8 p-10">
  <img class="w-1/4 mx-auto" src="./images/error.webp" alt="blank" srcset="">
  <h2 class="text-center font-bold text-3xl ">
      Oppppps! No pet Available now to Adopt of this Category!
  </h2>

</div>      `
    petsContainer.appendChild(blankdiv);
    return;
  }

  else {
    petsContainer.classList.add("grid");
   }


  items.forEach(item => {
    // console.log(item);     
    let petDiv = document.createElement('div');

    petDiv.innerHTML = `
      <div class="card card-compact p-5 border-2 ">
        <figure>
          <img class="w-full"
            src="${item.image}"
            alt="pet" />
        </figure>
        <div class="">
          <h2 class="card-title text-2xl font-bold py-2">${item.pet_name}</h2>
          <p><i class="fa-solid fa-sitemap"></i> Breed : ${item.breed ? item.breed : 'Info Unavailable'}</p>
          <p><i class="fa-solid fa-briefcase"></i> Birth : ${item.date_of_birth ? item.date_of_birth : 'Info Unavailable'}</p>
          <p><i class="fa-solid fa-mercury"></i> Gender : ${item.gender ? item.gender : 'Info Unavailable'}</p>
          <p><i class="fa-solid fa-dollar-sign"></i> Price : $${item.price ? item.price : 'Info Unavailable'}</p>
          <div class="divider"></div>
          <div class="flex justify-between items-center">
         <button class="text-secondaryColor text-sm px-4 py-2 font-bold border-secondaryColor border rounded-md"onclick="favourite('${item.petId}')" ><i class="fa-regular fa-thumbs-up"></i></button>
         <button class="text-secondaryColor text-sm px-4 py-2 font-bold border-secondaryColor border rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"onclick="adoption('${item.petId}')" id='${item.petId}'>Adopt</button>
         <button class="text-secondaryColor text-sm px-4 py-2 font-bold border-secondaryColor border rounded-md"  onclick="loadIdWiseItems('${item.petId}')">Details</button>
          </div>
        </div>
      </div>

      `
    petsContainer.appendChild(petDiv);
  })
};
const adoption = (id) => {
  console.log(id)
  adoptionButton = document.getElementById(id);
  loadAdoptionModal();
  adoptionButton.innerHTML = 'Adopted';
  adoptionButton.setAttribute('disabled', true);

}
//adoption er kaj
const loadAdoptionModal = () => {

  let countdownDisplay = document.getElementById('countDown');
  let num = 4

  const countID = setInterval(
    () => {
      num--;
      countdownDisplay.textContent = num;
      if (num <= 0) {
        clearInterval(countID);
        countdownDisplay.textContent = "Adoption Sucessfull";
      }
    },
    1000);
   
  my_modal_3.showModal()
 
}

const loadIdWiseItems = async (petId) => {

  let url = (`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
  let response = await fetch(url);
  let data = await (response.json());
  loadPet(data.petData)


}

const loadPet = (id) => {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
<dialog id="my_modal_1" class="modal">
<div class="modal-box border-solid border-black">
  
  <div class="modal-action">
    <form method="dialog">
      <figure>
          <img class="w-full"
            src="${id.image}"
            alt="pet" />
        </figure>
        <div class="">
          <h2 class="card-title text-2xl font-bold py-2">${id.pet_name}</h2>
          <p><i class="fa-solid fa-sitemap"></i> Breed :${id.breed}</p>
          <p><i class="fa-solid fa-briefcase"></i> Birth : ${id.date_of_birth}</p>
          <p><i class="fa-solid fa-mercury"></i> Gender : ${id.gender}</p>
          <p><i class="fa-solid fa-dollar-sign"></i> Price : ${id.price}</p>
          <p><i class="fa-solid fa-mercury"></i> Vaccinated Status : ${id.vaccinated_status}</p>
          <div class="divider"></div>
          <h2 class="card-title text-base font-bold py-2">Details Information:</h2>
          <p>${id.pet_details}</p>

      <!-- if there is a button in form, it will close the modal -->
      <button class="w-full font-bold text-secondaryColor mt-5 px-10 border-2 mx-auto rounded-lg bg-slate-400">Cancel</button>
    </form>
  </div>
</div>
</dialog>
  `
  my_modal_1.showModal()
}

const favourite = async (picture) => {
  let url = (`https://openapi.programming-hero.com/api/peddy/pet/${picture}`)
  let response = await fetch(url);
  let data = await (response.json());
  let chobi = data.petData
  let favouritePets = document.getElementById('favourite-pets');
  let pic = document.createElement('div');
  pic.innerHTML = `<div>
    <img class="w-full" src="${chobi.image}" alt="pet">
</div>`
  favouritePets.appendChild(pic);

}



const loadAllPetData = async () => {
  document.getElementById('loader').style.display='block';
  
  let url = `https://openapi.programming-hero.com/api/peddy/pets`;
  let res = await fetch(url);
  let data = await res.json();

  let pData=data.pets
  const sorting=document.getElementById('sortByPrice');
  console.log(pData);
  console.log(sorting);
  sorting.addEventListener('click',function(){
    pData.sort(function(a,b){return b.price - a.price});
    showPetCards(pData)
  });


  setTimeout(function () {
    showPetCards(pData)
  }, 3000)
}


const removeActiveClass = () => {
  const buttons = document.getElementsByClassName('category-btns');
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
}

loadAllCategories()
loadAllPetData()