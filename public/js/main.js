function onSubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';


    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '') {

        alert('PLEASE ADD A DESCRIPTION !!!');
        return;
    }

    //console.log(prompt, size);

    // Image generator function
    generateImageReq(prompt, size);
}

// Image generator function
async function generateImageReq(prompt, size) {

     try {
        showSpinner();

        const response = await fetch('/openai/generateImage', {

            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                prompt,
                size,
            })
        });
        
        if (!response.ok){

            removeSpinner();
            throw new Error('That image could not be generated');
        }

        const data = await response.json();
        //console.log(data);

        const imageUrl = data.data; 
        document.querySelector('#image').src = imageUrl;
         
        removeSpinner();
     } catch (error) {
        
        document.querySelector('.msg').textContent = error;
     }
}
 
//  Show spinner 
function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

//  Hide spinner 
function removeSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit); 