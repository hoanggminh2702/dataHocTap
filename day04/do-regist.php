<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <?php include 'store-data.php'?>
        <div class="form result-form">
            <div class="infor">
                <label class="lable" for="name">Họ và tên</label>
                <label class="input-value" for="name-value">
                    <?php 
                        echo $information['name'];
                    ?>
                </label>
            </div>
            
            <div class="infor">
                <label class="lable" for="gender">Giới tính</label>
                <label class="input-value" for="gender-value">
                    <?php 
                        echo $information['gender'];
                    ?>

                </label>
            </div>

            <div class="infor">
                <label class="lable" for="khoa">Phân khoa</label>
                <label class="input-value" for="khoa-value">
                    <?php 
                        echo $information['khoa'];
                    ?>
                </label>
            </div>

            <div class="infor">
                <label class="lable" for="age">Năm sinh</label>
                <label class="input-value" for="age-value">
                    <?php 
                        echo $information['age'];
                    ?>
                </label>
            </div>
        </div>
    </div>
</body>
</html>