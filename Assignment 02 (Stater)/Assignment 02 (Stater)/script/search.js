'use strict';
const petArr = JSON.parse(getFromStorage("petArr","[]"))
const typeInput = document.getElementById("input-type")
const idInput = document.getElementById("input-id")
const nameInput = document.getElementById("input-name")
const breedInput = document.getElementById("input-breed")
const vaccinatedInput = document.getElementById("input-vaccinated")
const dewormedInput = document.getElementById("input-dewormed")
const sterilizedInput = document.getElementById("input-sterilized")
const btnFind = document.getElementById('find-btn')
const tableBodyEl = document.getElementById('tbody')
const headTable = document.querySelector('thead')
function renderBreed(arr)
{
    const option = document.createElement('option')
    option.innerHTML = arr.breed
    breedInput.appendChild(option)
}
function findPet(petArr)
{
    let arrTemp =petArr
    if(idInput.value != '')
    {
        arrTemp = arrTemp.filter((current)=> current.id.includes(idInput.value))
    }
    if(nameInput.value != '')
    {
        arrTemp = arrTemp.filter((current)=> current.name.includes(nameInput.value))
    }
    if(typeInput.value != 'Select Type')
    {
        arrTemp = arrTemp.filter((current)=> current.type.includes(typeInput.value))
    }
    if(breedInput.value != 'Select Breed')
    {
        arrTemp = arrTemp.filter((current)=> current.breed.includes(breedInput.value))
    }
    if(vaccinatedInput.checked === true)
    {
        arrTemp = arrTemp.filter((current)=> current.vaccinated === true)
    }
    if(dewormedInput.checked === true)
    {
        arrTemp = arrTemp.filter((current)=> current.dewormed === true)
    }
    if(sterilizedInput.checked === true)
    {
        arrTemp = arrTemp.filter((current)=> current.sterilized === true)
    }
    if(arrTemp.length>0)
    {
        
        headTable.classList.remove('hidden')
        renderTableData(arrTemp)
        tableBodyEl.style.removeProperty('border')
    }
    else
    {
        headTable.classList.add('hidden')
        tableBodyEl.innerHTML='<p style="text-align: center;">No result match</p>'
        tableBodyEl.style.border ='none'
    }
    
}
function showBreedFromType()
{
    let temp =[]
    breedInput.innerHTML = '<option>Select Breed</option>'
    if(typeInput.value === 'Dog')
    {
        temp = JSON.parse(getFromStorage("breedArr","[]")).filter((current)=> current.type === 'Dog')
    }
    else if(typeInput.value === 'Cat')
    {
        temp = JSON.parse(getFromStorage("breedArr","[]")).filter((current)=> current.type === 'Cat')
    }
    temp.forEach(element => {
        renderBreed(element) 
    })
}
function infoToCode (petArr, i)
{
    const Temp =`
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td>${(petArr[i].vaccinated)? '<i class="bi bi-check-circle-fill"></i>':'<i class="bi bi-x-circle-fill"></i>'}</td>
    <td>${(petArr[i].dewormed)? '<i class="bi bi-check-circle-fill"></i>':'<i class="bi bi-x-circle-fill"></i>'}</td>
    <td>${(petArr[i].sterilized)? '<i class="bi bi-check-circle-fill"></i>':'<i class="bi bi-x-circle-fill"></i>'}</td>
    <td>${formatTime(petArr[i].date)}</td>
    </td>`
    return Temp
}
function formatTime(date)
{
    const temp = new Date(date)
    const time = temp.getDate() +'/'+ (temp.getMonth() + 1) + '/' + temp.getFullYear()
    return time
}
function renderTableData(petArr) {
    //xoa bang
	tableBodyEl.innerHTML = ''
    //cap nhat gia tri va hien thi lai
    for(let i =0; i < petArr.length; i++)
    {
        const row = document.createElement('tr')
        row.innerHTML = infoToCode(petArr, i)
        tableBodyEl.appendChild(row)
    }
}
headTable.classList.add('hidden')
typeInput.addEventListener("change", showBreedFromType)
btnFind.addEventListener('click', function(){
    findPet(petArr)
})
