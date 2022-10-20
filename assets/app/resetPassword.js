// $('#loginbtn .fa-spin').hide();
// clearResponse();

// trigger when login form is submitted
const urlParams = new URLSearchParams(window.location.search);
const validator = urlParams.get('validator');
const selector = urlParams.get('selector');

if (validator === "" && selector === "") {
    window.location.href = 'index.html'
}


$(document).on('submit', '#login_form', function(){

    var password = document.getElementById('password').value;
    var c_password = document.getElementById('c_password').value;

    if (password === c_password) {
        // get form data
        var reset_form = {
            "password" : password,
            "validator" : validator,
            "selector" : selector
        };

        var form_data = JSON.stringify(reset_form);

        // submit form data to api
        $.ajax({
            url: "api/users/reset-change-password.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            beforeSend: function() {
                console.log("Sending..")
            },
            success : function(result){
                window.location.href = "index.html#passwordResetSuccess"
            },
            error: function(result){
                new NotifyJS({
                    message: result.responseJSON.message,
                    duration: 5000
                },
                {
                    color: 'rgb(245,233,23)',
                    textColor: 'red',
                    fontFamily: 'Arial',
                    customCSSBox: `border-bottom: 3px solid red; background-color: white;`
                })

            }
        });
    
        return false;
    } else {
        new NotifyJS({
            message: "Password does not match. Please try again!",
            duration: 5000
        },
        {
            color: 'rgb(245,233,23)',
            textColor: 'red',
            fontFamily: 'Arial',
            customCSSBox: `border-bottom: 3px solid red; background-color: white;`
        })
    }

    

    

});


