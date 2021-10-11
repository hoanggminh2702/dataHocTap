<?php
    $gender = [
        0 => 'Nam',
        1 => 'Nữ'
    ];

    $khoa = [
        'None' => "",
        'MAT' => "Khoa học máy tính",
        'KDL' => "Khoa học vật liệu",
    ];

    $information = [
        'name' => "",
        'gender' => "",
        'khoa' => "",
        'age' => "",
    ];
    $alert = "";
    if (isset($_POST["name"])) {
        if(empty($_POST["name"])) {
            $alert = $alert . "Hãy nhập tên. ";
        } else $information['name'] = $_POST["name"];
    }

    if (isset($_POST["gender"])) {
        $information['gender'] = $_POST["gender"];
    } 
    else {
    }

    if(isset($_POST["khoa"]) ) {
        if ($_POST["khoa"] == 'None') {
            $alert = $alert . "Hãy chọn phân khoa. ";
        }
        else {
            $information['khoa'] = $_POST["khoa"];
        }
    } 

    if (isset($_POST["age"])) {
        if(empty($_POST["age"])) {
            $alert = $alert . "Hãy nhập tuổi";
        } 
        else $information['age'] = getdate()['year'] - $_POST["age"];
    }

?>