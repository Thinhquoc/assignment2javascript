'use strict';
const navClick = document.querySelector('nav')
const submitBtn = document.getElementById("submit-btn")
const idInput = document.getElementById("input-id")
const nameInput = document.getElementById("input-name")
const ageInput = document.getElementById("input-age")
const typeInput = document.getElementById("input-type")
const weightInput = document.getElementById("input-weight")
const lengthInput = document.getElementById("input-length")
const colorInput = document.getElementById("input-color-1")
const breedInput = document.getElementById("input-breed")
const vaccinatedInput = document.getElementById("input-vaccinated")
const dewormedInput = document.getElementById("input-dewormed")
const sterilizedInput = document.getElementById("input-sterilized")
const tableBodyEl = document.getElementById('tbody')
const btnHealthy = document.getElementById('healthy-btn')
const btnCalulateBmi = document.getElementById('bmi-btn')
const headTable = document.querySelector('thead')
const petArr = JSON.parse(getFromStorage("petArr","[]")) // lay du lieu thu cung nam trong Localstore
let healthyPetArr = []
let healthyCheck = true;
(petArr.length <= 0 )? headTable.classList.add('hidden') : headTable.classList.remove('hidden')
renderTableData(petArr) // Hien thi cac thu cung dang co
//bat su kien khi nhan nut sumit
submitBtn.addEventListener('click', function (e) {
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: Number(ageInput.value),
        weight: Number(weightInput.value),
        length: Number(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        type: typeInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date(),
        
    }
    const validate = validateData(data)
    if (validate) 
    {
	    petArr.push(data)
        clearInput()
	    renderTableData(petArr)
        //che do hien thi thu cung 
        btnHealthy.textContent ='Show  Healthy Pet'
        healthyCheck = true
        //hien thi dong tieu de
        headTable.classList.remove('hidden')
        saveToStorage("petArr",JSON.stringify(petArr))

    }
    

 })
//bat su kien khi nhan nhut Show Healthy Pet
btnHealthy.addEventListener('click', function(){
    
    showWithCheckHealth()
})
//bat su kien nhan nut Caculate BMI
btnCalulateBmi.addEventListener('click', function(e){
    for(let i=0; i<petArr.length; i++)
    {
        let bmiValue = 0
        if(petArr[i].type === 'Cat')
        {
            //truong hop thu cung la meo
            bmiValue =  (petArr[i].weight * 886)/(petArr[i].length ** 2)
            //tao thuoc tinh bmi moi va gan gia tri
            petArr[i].bmi = bmiValue.toFixed(2)
            //cap nhat lai bang
            renderTableData(petArr)
        }
        else if(petArr[i].type === 'Dog')
        {
            //truong hop thu cung la cho
            bmiValue =  (petArr[i].weight * 703)/(petArr[i].length ** 2)
            //tao thuoc tinh bmi moi va gan gia tri 
            petArr[i].bmi = bmiValue.toFixed(2)
            //cap nhat lai bang
            renderTableData(petArr)
        }
    }
    //che do hien thi toan bo thu cung
    saveToStorage("petArr",JSON.stringify(petArr))
    btnHealthy.textContent ='Show  Healthy Pet'
    healthyCheck = true
})
//ham kiem tra trung ID
function checkId (arr, id)
{
    for(let i=0; i<arr.length; i++)
    {
        if(arr[i].id === id)
        {
            return true
        }
    }
    return false
}
//kiem tra thong tin nhap vao va bao loi
function validateData(data)
{
    //check ID rong
    if(data.id =='')
    {
        alert("Please input id!")
        return false
    }
    //check ID trung
    else if(checkId(petArr, data.id))
    {
        alert ("ID must be unique!")
        return false
    }
    //check ten hop le
    if(data.name =='')
    {
        alert("Please input name!")
        return false
    }
    //check tuoi hop le
    if(data.age < 1 || data.age > 15)
    {
        alert("Age must be between 1 and 15!")
        
        return false
    }
    //check can nang hop le
    if(data.weight < 1 || data.weight > 15)
    {
        alert("Weight must be between 1 and 15!")
        return false
    }
    //check chieu cao hop le
    if(data.length < 1 || data.length > 100)
    {
        alert("Length must be between 1 and 100!")
        return false
    }
    //chua chon type
    if( data.type =='Select Type')
    {
        alert("Please select Type!")
        return false
    }
    //chua chon breed
    // if( data.breed =='Select Breed')
    // {
    //     alert("Please select Breed!")
    //     return false
    // }
    return true
    
}
//ham chen them dong cho table
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
    <td id="bmi-pet-${i}">${(petArr[i].bmi>=1)?petArr[i].bmi:'?'}</td>
    <td>${formatTime(petArr[i].date)}</td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">Delete</button>
    </td>`
    return Temp
}
//ham lay ngay va gio
function formatTime(date)
{
    const temp = new Date(date)
    const time = temp.getDate() +'/'+ (temp.getMonth() + 1) + '/' + temp.getFullYear()
    return time
}
// ham hien thi bang theo petArr
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
// xoa du lieu nhap vao form
const clearInput = () => {
	idInput.value = ''
	typeInput.value = 'Select Type'
    nameInput.value =''
    ageInput.value = ''
    weightInput.value = ''
    lengthInput.value = ''
    colorInput.value = '#000000'
    breedInput.value = 'Select Breed'
    vaccinatedInput.checked= false
    dewormedInput.checked = false
    sterilizedInput.checked = false
}
function showWithCheckHealth()
{   //ham hien thi theo healthy check
    if(healthyCheck)
    {
        btnHealthy.textContent = 'Show All Pet'
        const filtHealth = (petArr) => { return (petArr.vaccinated === true && petArr.dewormed === true && petArr.sterilized === true) }
        healthyPetArr = petArr.filter(filtHealth)
        renderTableData(healthyPetArr)
        healthyCheck = false
    }
    else
    {
        btnHealthy.textContent ='Show  Healthy Pet'
        renderTableData(petArr)
        healthyCheck = true
    }
}
// xoa pet
const deletePet = (petId) => {
	// Confirm before deletePet
	if (confirm('Are you sure?')) {
        function matchID(id)
        {
            return id.id === petId 
        }
        //xoa phan tu co id dc hcon khoi mang
        petArr.splice(petArr.findIndex(matchID), 1)
        saveToStorage("petArr",JSON.stringify(petArr))
        // chon hien thi theo healthy check
        if(!healthyCheck)
        {
            btnHealthy.textContent = 'Show All Pet'
            const filtHealth = (petArr) => { return (petArr.vaccinated === true && petArr.dewormed === true && petArr.sterilized === true)}
            healthyPetArr = petArr.filter(filtHealth)
            renderTableData(healthyPetArr)
        }
        else
        {
            btnHealthy.textContent ='Show  Healthy Pet'
            renderTableData(petArr)
        }
        //neu ko con du lieu thu cung trong mang an dong tieu de
        if(petArr.length<=0)
        {
            headTable.classList.add('hidden')
        }
	}
}
function renderBreed(arr)
{
    const option = document.createElement('option')
    option.innerHTML = arr.breed
    breedInput.appendChild(option)
}
typeInput.addEventListener("change", function(){
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
    });
});
navClick.addEventListener('click', function(){
    navClick.classList.toggle('active')
})
