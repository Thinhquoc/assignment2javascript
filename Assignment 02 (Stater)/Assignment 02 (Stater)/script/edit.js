'use strict';
const petArr = JSON.parse(getFromStorage("petArr","[]")) 
const tableEdit = document.querySelector('tbody')
const formInput = document.querySelector('#container-form')
const idInput = document.querySelector('#input-id')
const submitBtn = document.querySelector('#submit-btn')
const inputName = document.querySelector('#input-name')
const ageInput = document.getElementById("input-age")
const typeInput = document.getElementById("input-type")
const weightInput = document.getElementById("input-weight")
const lengthInput = document.getElementById("input-length")
const colorInput = document.getElementById("input-color-1")
const breedInput = document.getElementById("input-breed")
const vaccinatedInput = document.getElementById("input-vaccinated")
const dewormedInput = document.getElementById("input-dewormed")
const sterilizedInput = document.getElementById("input-sterilized")
function formatTime(date)
{
    const temp = new Date(date)
    const time = temp.getDate() +'/'+ (temp.getMonth() + 1) + '/' + temp.getFullYear()
    return time
}
function stringElRow(petArr, i)
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
    <td><button type="button" class="btn btn-warning" onclick="startEditPet('${petArr[i].id}')">Edit</button>
    </td>`
    return Temp
}
function renderTableDataEdit(petArr)
{
    //xoa bang
	tableEdit.innerHTML = ''
    //cap nhat gia tri va hien thi lai
    for(let i =0; i < petArr.length; i++)
    {
        const row = document.createElement('tr')
        row.innerHTML = stringElRow(petArr, i)
        tableEdit.appendChild(row)
    }
}
function startEditPet(id)
{
    formInput.classList.remove('hide')
    idInput.value = id
    const indexEdit = petArr.findIndex((current) => current.id === id)
    inputName.value = petArr[indexEdit].name
    ageInput.value = petArr[indexEdit].age
    weightInput.value = petArr[indexEdit].weight
    lengthInput.value = petArr[indexEdit].length
    colorInput.value = petArr[indexEdit].color
    typeInput.value = petArr[indexEdit].type
    vaccinatedInput.checked = petArr[indexEdit].vaccinated
    dewormedInput.checked = petArr[indexEdit].dewormed
    sterilizedInput.checked = petArr[indexEdit].sterilized
    showBreedFromType()
    breedInput.value = petArr[indexEdit].breed
    

}
function validateData()
{
    //check ten hop le
    if(inputName.value =='')
    {
        alert("Please input name!")
        return false
    }
    if(inputName.value[0] === ' ' || inputName.value[inputName.value.length-1] ===' ')
    {
        alert("Invalid name!")
        return false
    }
    //check tuoi hop le
    if(ageInput.value < 1 || ageInput.value > 15)
    {
        alert("Age must be between 1 and 15!")
        
        return false
    }
    //check can nang hop le
    if(weightInput.value < 1 || weightInput.value > 15)
    {
        alert("Weight must be between 1 and 15!")
        return false
    }
    //check chieu cao hop le
    if(lengthInput.value < 1 || lengthInput.value > 100)
    {
        alert("Length must be between 1 and 100!")
        return false
    }
    //chua chon type
    if( typeInput.value =='Select Type')
    {
        alert("Please select Type!")
        return false
    }
    //chua chon breed
    if( breedInput.value =='Select Breed')
    {
        alert("Please select Breed!")
        return false
    }
    return true
}
renderTableDataEdit(petArr)
submitBtn.addEventListener('click',function(){
    console.log('nhan')
    const indexEdit = petArr.findIndex((current) => current.id === idInput.value)
    if(validateData(petArr[indexEdit]))
    {
        petArr[indexEdit].name = inputName.value
        petArr[indexEdit].age = Number(ageInput.value)
        petArr[indexEdit].weight = Number(weightInput.value)
        petArr[indexEdit].length = Number(lengthInput.value)
        petArr[indexEdit].color = colorInput.value
        petArr[indexEdit].breed = breedInput.value
        petArr[indexEdit].type = typeInput.value
        petArr[indexEdit].vaccinated = vaccinatedInput.checked
        petArr[indexEdit].dewormed = dewormedInput.checked
        petArr[indexEdit].sterilized = sterilizedInput.checked
        renderTableDataEdit(petArr)
        saveToStorage("petArr",JSON.stringify(petArr))
        formInput.classList.add('hide')
    }
})
function renderBreed(arr)
{
    const option = document.createElement('option')
    option.innerHTML = arr.breed
    breedInput.appendChild(option)
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
typeInput.addEventListener("change", showBreedFromType)
weightInput.addEventListener('change', function(){
    const indexEdit = petArr.findIndex((current) => current.id === idInput.value)
    petArr[indexEdit].bmi = null
})
lengthInput.addEventListener('change', function(){
    const indexEdit = petArr.findIndex((current) => current.id === idInput.value)
    petArr[indexEdit].bmi = null
})
