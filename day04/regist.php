<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        <?php include 'style.css'; ?>
    </style>
    <title>Document</title>
</head>
<body>
    <section>
        <?php include 'store-data.php'?>
        <div class="container">
            <form   class="form" action="do-regist.php" method="post">
                <p id="alert" style="margin: 0 auto"></p>
                
                <div class="infor">
                    <label class="lable" for="name">Họ và tên</label>
                    <input id="full-name" class="name input" type="text" name="name">
                </div>

                <div class="infor">
                    <label class="lable" for="gender">Giới tính</label>
                    <div class="gender-chosen">
                        <?php 
                            foreach ($gender as $id => $gen) {
                                echo "<div class='gender'>";
                                echo "<label for=$gen>$gen</label>";
                                echo "<input type='radio' name='gender' value=$gen>";
                                echo "</div>";
                            }
                        ?>
                    </div>
                </div>

                <div class="infor">
                    <label class="lable" for="khoa">Phân khoa</label>
                    <select onchange="" id="khoa-check" class="input" name="khoa">
                        <?php 
                            foreach ($khoa as $prefix => $full) {
                                echo "<option value=$prefix>$full</option>";
                            }
                        ?>
                    </select>
                </div>

                <div class="infor">
                   <label class="lable" for="age">Năm sinh</label>
                   <input class="input" type="text" name="age">
                </div>
                <button class="btn-submit">Đăng ký</button>
                <script src="validateForm.js"></script>
            </form>
        </div>
    </section>
</body>
</html>