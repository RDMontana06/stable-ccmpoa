// $('#loginbtn .fa-spin').hide();
// clearResponse();

// trigger when login form is submitted
$(document).on('submit', '#login_form', function(){
 
    // get form data
    var login_form=$(this);
    var form_data=JSON.stringify(login_form.serializeObject());
    console.log(form_data)
    // submit form data to api
    $.ajax({
        url: "api/users/resetPassword.php",
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        beforeSend: function() {
            console.log("Sending..")
        },
        success : function(result){
            // store jwt to cookie
            // new NotifyJS({
            //     message: "Reset password request sent. Please check your email",
            //     duration: 5000
            // },
            // {
            //     color: 'rgb(245,233,23)',
            //     textColor: 'red',
            //     fontFamily: 'Lexend Deca',
            //     customCSSBox: `border-bottom: 3px solid red; background-color: white;`
            // })

            const loginForm = document.getElementById('login_form');

            loginForm.style.display = "none";

            document.querySelector(".form-title").innerText = "Reset Link Sent"
            document.querySelector(".form-subtitle").innerText = "A reset password link has been sent to your email."
        },
        error: function(result){
            // on error, tell the user login has failed & empty the input boxes
            // $('#response').html("<div class='alert alert-danger'>Login failed. Email or password is incorrect.</div>");
            // login_form.find('input').val('');
            new NotifyJS({
                message: result.responseJSON.message,
                duration: 5000
            },
            {
                color: 'rgb(245,233,23)',
                textColor: 'red',
                fontFamily: 'Lexend Deca',
                customCSSBox: `border-bottom: 3px solid red; background-color: white;`
            })

        }
    });
 
    return false;
});


