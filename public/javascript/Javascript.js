addNew = () => {
    window.location.href = window.location.href.substr(0 ,window.location.href.length - 9) + "rectanglePage"
}

goBack = () => {
    let newUrl = window.location.href.substr(0 ,window.location.href.length - 13) + "firstPage"
    window.location.href = newUrl
}


goBackFromEdit = () => {
    window.location.assign(window.location.href.substr(0 ,window.location.href.length - 49) + "firstPage")
}

addNewRec = () => {
    let isValidate = true

    let name = document.getElementById("inputEdit").value

    let color = document.getElementById("color").value
    let width =  parseInt(document.getElementById("width").value)
    let height =  parseInt(document.getElementById("height").value)
    let bordercolor = document.getElementById("bordercolor").value

    if(name.length === 0 || name.length > 50){
        alert("Name should not be empty or have more than 50 symbols")
        isValidate = false
    }
    if(color.length === 0 || color.length > 50){
        alert("Color should not be empty")
        isValidate = false
    }
    if(bordercolor.length === 0 || bordercolor.length > 50){
        alert("BorderColor should not be empty")
        isValidate = false
    }
    if(width < 0 || width > 50){
        alert("Width must be an integer from 1 to 50")
        isValidate = false
    }
    if(height < 0 || height > 50){
        alert("Height must be an integer from 1 to 50")
        isValidate = false
    }
    if (isValidate){
        window.location.href = window.location.href.substr(0 ,window.location.href.length - 13) + "addNewRectangle/" + name + "/" + color + "/" + width + "/" + height + "/" + bordercolor
    }

}

validation = () => {
    let name = document.getElementById("inputEdit").value

    let color = document.getElementById("color").value
    let width =  parseInt(document.getElementById("width").value)
    let height =  parseInt(document.getElementById("height").value)
    let bordercolor = document.getElementById("bordercolor").value

    if(name.length === 0 || name.length > 50){
        alert("Name should not be empty or have more than 50 symbols")
        return false
    }
    if(color.length === 0 || color.length > 50 || color === "choose option"){
        alert("Color should not be empty")
        return false
    }
    if(bordercolor.length === 0 || bordercolor.length > 50 || bordercolor === "choose option"){
        alert("BorderColor should not be empty")
        return false
    }
    if(width < 1 || width > 300 || isNaN(width)){
        alert("Width must be an integer from 1 to 300")
        return false
    }
    if(height < 1 || height > 300 || isNaN(height)){
        alert("Height must be an integer from 1 to 300")
        return false
    }
        return true
}

