const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const displayOne = document.querySelector('#text-1');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    displayOne.textContent = 'Loading...';


    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    
        response.json().then(data =>{
            
            if(data.error) {
                return displayOne.textContent= data.error
            }else{
                return displayOne.innerHTML = `<li>${data.location}</li><br>
                                                <li>${data.forecast}</li>`
            }
        })
    })

})