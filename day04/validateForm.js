document.forms[0].onsubmit = function(e) {
    var nameCheck = e.target.name.value
    var genderCheck = e.target.gender.value
    var khoaCheck = e.target.khoa.value
    var alertMessage = ""
    if (nameCheck == "") {
        alertMessage += 'Hãy nhập tên. '
    }
    if (genderCheck == "") {
        alertMessage += 'Hãy chọn giới tính. '
    }
    if (khoaCheck == "None") {
        alertMessage += 'Hãy chọn phân khoa. '
    }
    
    if(nameCheck == "" || genderCheck == "" || khoaCheck == "None") {
        document.getElementById('alert').innerText = alertMessage
        return false
    }
    else return true
    
}
