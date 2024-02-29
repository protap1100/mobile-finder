const loadData = async (searchText,isShowAll) => {
  const getData = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await getData.json();
  const phones = data.data;
//   console.log(phones);
  displayPhones(phones,isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");

  //  Clear container card before adding new search result
  phoneContainer.textContent = "";

  // Slicing
  const showMin = document.getElementById("show-all");
  if (phones.length > 12 && !isShowAll) {
    showMin.classList.remove("hidden");
  } else {
    showMin.classList.add("hidden");
  }

  // console.log('is show all',isShowAll);

  if(!isShowAll){
    phones = phones.slice(0, 12);
  }


  phones.forEach((phone) => {
    // 4 Step to show data
    // 1st create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-base-100 shadow-xl";
    // step 3 add classlist and innerhtml to this
    phoneCard.innerHTML = `
                    <div class="card bg-base-100 shadow-xl">
                            <figure><img src="${phone.image}" alt="Shoes" /></figure>
                        <div class="card-body">
                            <h2 class="card-title">${phone.phone_name}</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-center">
                        <button class="btn bg-[#437a7a] text-white" onclick="showDetails('${phone.slug}'); show_details_modal.showModal()" bg-[#437a7a] text-white">Show Details</button>
                        </div>
                        </div>
                    </div>
        `;
    // step 4
    phoneContainer.appendChild(phoneCard);
  });

  // Hide Loading Spinner
  loadingSpinnerToggle(false);
};

// More Details 
const showDetails = async (id) =>{
    // console.log('hello world',id);
    // load  single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    phone= data.data; 

    showPhoneDetails(phone);
}


// modal
 const showPhoneDetails = (phone) => {
      // show the modal 
      // console.log(phone);
      show_details_modal.showModal();

      const phoneAllDetails =  document.getElementById('phone-details');
      phoneAllDetails.innerHTML =`
                    <div class="flex justify-center items-center">
                        <img src="${phone.image}" alt="">
                    </div>
                    <div class="mt-5 flex flex-col gap-4 ">
                        <h1 class="text-3xl font-bold" >${phone.name}</h1>
                        <h1>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h1>
                        <h1 class="font-bold text-xl">Storage :<span class="text-xl font-normal">${phone.mainFeatures.storage}</span></h1>
                        <h1 class="font-bold text-xl">Display Size :<span class="text-xl font-normal">${phone.mainFeatures.displaySize}</span></h1>
                        <h1 class="font-bold text-xl">Chipset :<span class="text-xl font-normal">${phone.mainFeatures.chipSet}</span></h1>
                        <h1 class="font-bold text-xl">Memory :<span class="text-xl font-normal">${phone.mainFeatures.memory}</span></h1>
                        <h1 class="font-bold text-xl">Slug :<span class="text-xl font-normal">${phone.slug}</span></h1>
                        <h1 class="font-bold text-xl">Release Date :<span class="text-xl font-normal">${phone.releaseDate}</span></h1>
                        <h1 class="font-bold text-xl">Brand:<span class="text-xl font-normal">${phone.brand}</span></h1>
                        <h1 class="font-bold text-xl">Gps:<span class="text-xl font-normal">${phone.others.GPS}</span></h1>
                    </div>
      `


 }





// Handle search button
function handleSearch(isShowAll) {
  loadingSpinnerToggle(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  loadData(searchText,isShowAll);
}

const loadingSpinnerToggle = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};



// Show all Button

const showAll = () => {
    handleSearch(true);
}

// loadData()
