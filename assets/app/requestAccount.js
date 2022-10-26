// $('#loginbtn .fa-spin').hide();
// clearResponse();

// trigger when login form is submitted
var requestSubmit = document.getElementById('request-submit');

requestSubmit.addEventListener('click', () => {
    var email = document.getElementById('request-email');
    var message = document.getElementById('request-message');

    var form_data = {
        "email" : email.value,
        "message" : message.value
    }
    // submit form data to api
    $.ajax({
        url: "api/users/requestAccount.php",
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(form_data),
        beforeSend: function() {
            console.log("Sending..")
        },
        success : function(result){
            email.value = "";
            message.value = "";
            document.getElementById('request-modal').classList.remove('is-active')

            new NotifyJS(
                {
                    message: 'Your request for an account has been sent! We will review your request within 24 hours.',
                    duration: 10000,
                },
                {
                    color: '#d4edda',
                    textColor: 'black',
                    fontFamily: 'Arial',
                    customCSSBox: `border-bottom: 5px solid green; background-color: #d4edda;`,
                }
            );
        },
        error: function(result){
            // on error, tell the user login has failed & empty the input boxes
            // $('#response').html("<div class='alert alert-danger'>Login failed. Email or password is incorrect.</div>");
            // login_form.find('input').val('');
            // alert(result.responseJSON.message)
            // new NotifyJS({
            //     message: result.responseJSON.message,
            //     duration: 5000
            // },
            // {
            //     color: 'rgb(245,233,23)',
            //     textColor: 'red',
            //     fontFamily: 'Lexend Deca',
            //     customCSSBox: `border-bottom: 3px solid red; background-color: white;`
            // })
            $.notify(result.responseJSON.message, "error");
        }
    });
})



