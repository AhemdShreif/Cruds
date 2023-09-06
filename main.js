let inputnum = document.querySelector('input[type = "number"]')
let title = document.querySelector('input.title')
let price = document.querySelector('input.price')
let taxes = document.querySelector('input.taxes')
let ads = document.querySelector('input.ads')
let discount = document.querySelector('input.discount')
let total = document.querySelector('small')
let count = document.querySelector('input.count')
let category = document.querySelector('input.category')
let creatbtn = document.querySelector('.creat')
let search = document.querySelector('.search')
let searchTitlebtn = document.querySelector('.searchTitle')
let searchCategory = document.querySelector('.searchCategory')



let mood = 'creat'
let tmp
// getTotal

function getTotal(){

    if (inputnum.value != ''){
        let result = +price.value + +taxes.value + +ads.value - +discount.value
        total.innerHTML = result
        total.style.backgroundColor = 'green'
    }else{
        total.innerHTML = ''
        total.style.backgroundColor = 'red'

    }


}

// Create Product
let arrpro 
if(localStorage.product != null){
    arrpro = JSON.parse(localStorage.product)
}else{
    arrpro = []
}

creatbtn.onclick = function(){

    

    objPro = {

        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()

    }
    if (title.value != '' && price.value != '' && category.value != '' && count.value < 100){




        if (mood === 'creat'){
    
            if (count.value > 1){
        
                for (let i = 0; i < count.value; i++){
            
                    arrpro.push(objPro)
            
                }
        
            }else{
                arrpro.push(objPro)
            }
    
        }else{
            arrpro[tmp] = objPro
            mood = 'creat'
            creatbtn.innerHTML = 'Creat'
            count.style.dispaly = 'block'
        }
        clearData()
    }
    
    console.log(arrpro)

//     // save local storage

    localStorage.setItem('product', JSON.stringify(arrpro))
    
    showResult()

}


// clearData

function clearData(){

    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''

    
}

// Show Result 
showResult()
function showResult(){
    getTotal()


    let content = ''
    for (let i = 0; i < arrpro.length; i++ ){
        content += ` <tr>
                            <td>${i}</td>
                            <td>${arrpro[i].title}</td>
                            <td>${arrpro[i].price}</td>
                            <td>${arrpro[i].taxes}</td>
                            <td>${arrpro[i].ads}</td>
                            <td>${arrpro[i].discount}</td>
                            <td>${arrpro[i].total}</td>
                            <td>${arrpro[i].category}</td>
                            <td><button class="update" onclick = "updateitem(${i})">update</button></td>
                            <td><button class="delet" onclick = "deleteItem(${i})" >delet</button></td>
                        </tr> `
                    }
                    
            document.querySelector('.tbody').innerHTML = content
                    let deletbtn = document.querySelector('.deleteall')
            if(arrpro.length > 0){
                deletbtn.innerHTML = `<button onclick = "deleteAllItems()" >Delete All</button>`
            }else{
                deletbtn.innerHTML = ''
            }
}


// Delete

function deleteItem(i){

    arrpro.splice(i,1)
    localStorage.product = JSON.stringify(arrpro)
    showResult()

}

function deleteAllItems(){

    localStorage.clear()
    arrpro.splice(0)
    showResult() 
}

// count 


// update

function updateitem(i){

    title.value = arrpro[i].title
    price.value = arrpro[i].price
    taxes.value = arrpro[i].taxes
    ads.value = arrpro[i].ads
    discount.value = arrpro[i].discount
    creatbtn.innerHTML = 'Update'
    count.style.dispaly = 'none'
    getTotal()
    mood = 'update' 
    tmp = i 
    scroll({
        top: 0,
        behavior: "smooth"
    })
    
}

let searchMode = 'title'
function getsearchbtn(id){

    if(id == 'searchTitle'){

        search.placeholder = 'Search By title'
        searchMode = 'title'

    }else{
        search.placeholder = 'Search By category'
        searchMode = 'category'
    }
    console.log(id)
// console.log(searchMode)
    search.focus()
    search.value = ''
    showResult()
}


function searchData(value){
    let content = ''
    if (searchMode == 'title'){


        for (let i = 0; i < arrpro.length; i++){

            if (arrpro[i].title.includes(value.toLowerCase())){

                content += ` <tr>
                <td>${i}</td>
                <td>${arrpro[i].title}</td>
                <td>${arrpro[i].price}</td>
                <td>${arrpro[i].taxes}</td>
                <td>${arrpro[i].ads}</td>
                <td>${arrpro[i].discount}</td>
                <td>${arrpro[i].total}</td>
                <td>${arrpro[i].category}</td>
                <td><button class="update" onclick = "updateitem(${i})">update</button></td>
                <td><button class="delet" onclick = "deleteItem(${i})" >delet</button></td>
            </tr> `

                
            }

        }


    }else{
        for (let i = 0; i < arrpro.length; i++){

            if (arrpro[i].category.includes(value.toLowerCase())){

                content += ` <tr>
                <td>${i}</td>
                <td>${arrpro[i].title}</td>
                <td>${arrpro[i].price}</td>
                <td>${arrpro[i].taxes}</td>
                <td>${arrpro[i].ads}</td>
                <td>${arrpro[i].discount}</td>
                <td>${arrpro[i].total}</td>
                <td>${arrpro[i].category}</td>
                <td><button class="update" onclick = "updateitem(${i})">update</button></td>
                <td><button class="delet" onclick = "deleteItem(${i})" >delet</button></td>
            </tr> `

                
            }


        }



    }
    document.querySelector('.tbody').innerHTML = content


}
