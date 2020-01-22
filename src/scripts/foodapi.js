// This function produces HTML elements using the objects from the fetch
const foodFactory = (foodObject) => {
    return `<section class="foodItem">
                <h2>${foodObject.name}</h2>
                <article>
                    <p>${foodObject.ethnicity} <br> ${foodObject.category}</p>
                    <p>${foodObject.ingredients}</p>
                </article>
            </section>`
};


// This function adds the HTML element to the DOM using the class of foodList

const addFoodToDom = (foodItem) => {
    const listOfItems = document.querySelector(".foodList");
    listOfItems.innerHTML += foodItem
};




// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         parsedFoods.forEach(food => {
//             const foodAsHTML = foodFactory(food);
//             addFoodToDom(foodAsHTML);
//         })
//     })

    fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food)
        //  Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text_en) {
                      food.ingredients = productInfo.product.ingredients_text_en
                    } else if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    }

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })