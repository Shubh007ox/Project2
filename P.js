function savedata(event) {
    event.preventDefault();
    const Amount = document.getElementById('amount').value
    const Descrip = document.getElementById('Descrip').value
    const Category = document.getElementById('cat').value

    const object = {
        Amount,
        Descrip,
        Category,

    }
    axios.post('https://crudcrud.com/api/5fe2f1a8d9aa4bec9b7d62d3d7a6b39d/Project2',object)
        .then((response) => {
            showObject(response,data)
        })
        .catch((err) => {
            console.log(err)
        })
    //localStorage.setItem(object.Descrip,JSON.stringify(object));
    //localStorage.getItem('Descrip');
    showObject(object);
}
window.addEventListener("DOMContentLoaded",() => {
    axios.get('https://crudcrud.com/api/5fe2f1a8d9aa4bec9b7d62d3d7a6b39d/Project2')
        .then((response) => {
            console.log(response)
            for(let i=0;i<response.data.length;i++){
                showObject(response.data[i])
            }
        })
        .catch((err) => {
            console.log(err)
        })

})
function showObject(user){
    const parentnode = document.getElementById('list');
    const childnode = `<li id=${user._id}> ${user.Amount}--${user.Category}---${user.Descrip}
    <button onclick=deleteInfo('${user._id}')>Delete Info
    <button onclick=EditInfo('${user.Amount}','${user.Descrip}','${user.Category}','${user._id}')>Edit Info </li>`
    parentnode.innerHTML = parentnode.innerHTML + childnode

}
function deleteInfo(userId){
    axios.delete(`https://crudcrud.com/api/5fe2f1a8d9aa4bec9b7d62d3d7a6b39d/Project2/${userId}`)
        .then((response) => {
            removeFromS(userId)
        })
    //console.log(Descrip);
    //localStorage.removeItem(Descrip);
    //removeFromS(Descrip)
}
function removeFromS(userId){
    const parentnode = document.getElementById('list')
    const CtoD = document.getElementById(userId)
    if(CtoD){
        parentnode.removeChild(CtoD);
    }
}
function EditInfo(Amount,Descrip,Category,userId){
    console.log(Descrip)
    document.getElementById('amount').value = Amount
    document.getElementById('Descrip').value = Descrip
    document.getElementById('cat').value = Category
    deleteInfo(userId)

}