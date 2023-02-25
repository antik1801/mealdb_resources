// Step 1: API load data with async and await function 
const loadData = async (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayData(data.meals);
    } catch (error) {
        console.log(error);
    }
}

const displayData = meals => {
    const parent = document.getElementById('food-items');
    parent.innerHTML = ``;
   for (const meal of meals) {
    // console.log(meal)
    const div = document.createElement('food-items');
    div.classList.add("col");
    div.innerHTML=`
    <div class="card h-100">
    <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="...">
    <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <button type="button" class="btn btn-warning" data-bs-toggle="modal" onclick="loadDataModuls(${meal.idMeal})" data-bs-target="#exampleModal">
    Launch demo modal
    </button>
    `
    parent.appendChild(div);
   }
   
}

const loadDataModuls =async (mealId) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    const response = await fetch(url);
    const data = await response.json();
    displayModals(data.meals[0]);
}

const displayModals = meal =>{
    document.getElementById('exampleModalLabel').innerHTML = `${meal.strMeal}`
    const div = document.getElementById('meal-body');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="img-fluid">
    <p class="my-4"><span class="fw-bold me-3">Category: </span><span>${meal.strCategory}</span></p>
    <p class="my-4"><span class="fw-bold me-3">Area: </span><span>${meal.strArea}</span></p>
    <p class="my-4"><span class="fw-bold me-3">Instructions: </span><span>${meal.strInstructions}</span></p>
    <p class="my-4"><span class="fw-bold me-3">Youtube: </span><span>${meal.strYoutube}</span></p>
    `
    console.log(meal)
}

document.getElementById('search-input').addEventListener('keyup',(e)=>{
    // console.log(e.target.value);
    loadData(e.target.value)
})


loadData('fish');