function getValue(event){
    event.preventDefault();
    const price = document.querySelector('#price').value;
    const product = document.querySelector('#product').value;

    const obj = {
        price,
        product
    } 

    axios.post("https://crudcrud.com/api/dabfd7c842ec4fb09a32838dad5a0fe8/getData", obj)
    .then((response) => {
        showUserOnScreen(response.data)
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })

    // localStorage.setItem(obj.price,obj.product);
    // showUserOnScreen(obj)  

    window.addEventListener("DOMContentLoaded", () => {
       axios.get("https://crudcrud.com/api/dabfd7c842ec4fb09a32838dad5a0fe8/getData")
        .then((response) => {
            // console.log(response)
    
            for(var i=0;i<response.data.length;i++){
                showUserOnScreen(response.data[i])
            }
        })
        .catch((error) => {
            console.log(error)
        })
    })
}

function showUserOnScreen(obj){
    const parentElem = document.getElementById('listOfItems');
    const totalValue = document.querySelector('h4');
    // const childElem = document.createElement('li');
    // childElem.textContent = obj.price + '-' + obj.product;

    const childElem = `<li id=${obj._id}> ${obj.price} - ${obj.product}
                       <button onclick=deleteUser('${obj._id}')> Delete User </button>
                       </li>`

    parentElem.innerHTML = parentElem.innerHTML + childElem; 
    totalValue.innerText = totalValue.innerText + obj.price;

    price.value = '';
    product.value = ''; 
    deleteUser(obj)

    // const dltBtn = document.createElement('input')
    // dltBtn.type = 'button'
    // dltBtn.value = 'Delete'
    // dltBtn.onclick = () => {
    //     localStorage.removeItem(obj.price)
    //     parentElem.removeChild(childElem)
    // }
    // childElem.appendChild(dltBtn);
    // parentElem.appendChild(childElem);

    // price.value = '';
    // product.value = '';
}

function deleteUser(obj){
    axios.delete(`https://crudcrud.com/api/dabfd7c842ec4fb09a32838dad5a0fe8/getData/${obj}`) 
    .then ((response) => {
        removeUser(obj)
    }) 
    .catch((err) => {
        console.log(err)
    })
}

function removeUser(obj){
    const parentElem = document.getElementById('listOfItems')
    const childNode = document.getElementById(obj);
    if(childNode){
        parentElem.removeChild(childNode)
    }
}



