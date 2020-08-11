//Client side JS

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne  = document.querySelector('#message-1');
const messageTwo  = document.querySelector('#message-2');

// messageOne.textContent = 'test'; //for adding text in the html p tag

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location =  search.value;
    messageTwo.textContent = '';
    messageOne.textContent = 'Loading...';
    fetch('http://localhost:3000/wheather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
                //return console.log("Error => "+data.error);
            }else{
                messageOne.textContent =  data.location;
                messageTwo.textContent =  data.forecast;           
            }
        })
    })    
})

