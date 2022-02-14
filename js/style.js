const addToCard = document.querySelectorAll(".btn-cart")
console.log(addToCard);

addToCard.forEach (addToCardBtn => {
    addToCardBtn.addEventListener("click", addCard)
})



function addCard (event) {
    const boton = event.target
    console.log(boton);

}