// $('#loginbtn .fa-spin').hide();
// clearResponse();

// trigger when login form is submitted
var jwt = getCookie('jwt');
if (jwt != "") {
    window.location.href = "/app"
}

$(document).on('submit', '#login_form', function(){
 
    // get form data
    var login_form=$(this);
    var form_data=JSON.stringify(login_form.serializeObject());
    console.log(form_data)
    // submit form data to api
    $.ajax({
        url: "api/login.php",
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        beforeSend: function() {
            console.log("Loggin in")
        },
        success : function(result){
            // store jwt to cookie
            console.log(result);
            // setCookie("jwt", result.jwt, 1);
            // localStorage.setItem("user_info", JSON.stringify(result.data))
            // validateSignin()
            if (result.message === "New User") {
                var userID = result.id;
                window.location.href = '/account-setup.html?id=' + userID;

            } else if (result.message === "Successful login.") {
                setCookie("jwt", result.jwt, 1);
                localStorage.setItem("user_info", JSON.stringify(result.data))
                validateSignin()
            }
            
        },
        error: function(result){
            // on error, tell the user login has failed & empty the input boxes
            // $('#response').html("<div class='alert alert-danger'>Login failed. Email or password is incorrect.</div>");
            // login_form.find('input').val('');
            console.log()
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


function validateSignin() {
    var jwt = getCookie('jwt');
    $.post("api/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(res) {
        localStorage.setItem("data", JSON.stringify(res.data));

        if (res.data.role === "Admin") {
            window.location.href = "app/index.html"
        } else if (res.data.role === "Homeowner" || res.data.role === "Board Member" || res.data.role === "Affiliate" || res.data.role === "Developer") {
            window.location.href = "app/index.html";
        }
        
    }).fail(function(res){
        $('#response').html("<div class='alert alert-danger'>Something went wrong. Please try again.</div>");
        logoutUser();
    });
}



