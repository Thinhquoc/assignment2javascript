'use strict';
const breedArr = JSON.parse(getFromStorage("breedArr","[]"))
const submitBtn = document.querySelector('#submit-btn')
const breedInput = document.querySelector('#input-breed')
const typeInput = document.querySelector('#input-type')
const tBodyBreed = document.querySelector('#tbody')
const headTableBreed = document.querySelector('thead')
function infoToCodeBreed(breedArr, i)
{
    const temp =
    `<td scope="col">${i+1}</td>
    <td scope="col">${breedArr[i].breed}</td>
    <td scope="col">${breedArr[i].type}</td>
    <td scope="col"><button type="button" class="btn btn-danger" onclick="deleteBreed('${breedArr[i].breed}','${breedArr[i].type}')">Delete</button></td>`
    return temp
}
function renderBreedTable()
{
    //xoa bang
	tBodyBreed.innerHTML = ''
    //cap nhat gia tri va hien thi lai
    for(let i =0; i < breedArr.length; i++)
    {
        const row = document.createElement('tr')
        row.innerHTML = infoToCodeBreed(breedArr, i)
        tBodyBreed.appendChild(row)
    }
}
function validateDataBreed(data)
{
    if(breedArr.findIndex((breedData)=> breedData.breed === data.breed && breedData.type === data.type) >= 0)
    {
        alert('Breed Match!')
        return false
    }
    if(data.breed.length === 0)
    {
        alert('Please input breed!')
        return false
    }
    if(data.breed[0] === ' ' || data.breed[data.breed.length-1] ===' ')
    {
        alert('Invalid name')
        return false
    }
    if(data.type === 'Select Type')
    {
        alert('Please Select type!')
        return false
    }
    return true
}
function deleteBreed(breedName, breedType)
{
    if (confirm('Are you sure?')) {
        function matchBreed(breed)
        {
            return breed.breed === breedName && breed.type === breedType
        }
        //xoa phan tu co id dc hcon khoi mang
        breedArr.splice(breedArr.findIndex(matchBreed), 1)
        saveToStorage("breedArr",JSON.stringify(breedArr))
        renderBreedTable(breedArr)
        if(breedArr.length<=0)
        {
            headTableBreed.classList.add('hidden')
        }
    }
}
function clearInputBreed()
{
    breedInput.value = ''
    typeInput.value = 'Select Type'
}

if(breedArr.length<=0)
{
    headTableBreed.classList.add('hidden')
}
 renderBreedTable(breedArr)   
submitBtn.addEventListener('click', function(){
    const data = {
        breed : breedInput.value,
        type : typeInput.value
    }
    const validate = validateDataBreed(data)
    if (validate) 
    {
	    breedArr.push(data)
        clearInputBreed()
	    renderBreedTable(breedArr)
        headTableBreed.classList.remove('hidden')
        saveToStorage("breedArr",JSON.stringify(breedArr))
        console.log(breedArr)

    }
})

