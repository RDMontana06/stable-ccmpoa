// function to set cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// get or read cookie
function getCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1);
        }
 
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function addMemberCode () {
    if (document.getElementById("mem_code").value != '' && document.getElementById('user_role').value != "Select Role") {
        var e = document.getElementById("user_role");
        var user_role = e.options[e.selectedIndex].text;
        var member_code = document.getElementById("mem_code").value;
        var jwt = getCookie('jwt');

        var data = {
            "user_role" : user_role,
            "member_code" : member_code,
            "jwt" : jwt
        };

        $.ajax({
            url: "../api/users/addMemberCode.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            beforeSend: function() {
                console.log("Adding member code..")
            },
            success : function(result){
                alert(result.message)

                document.getElementById('user_role').value = "Select Role";
                document.getElementById("mem_code").value = "";
                loadMemberCodeTable()
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


    } else {
        alert('Please select a ROLE TYPE and generate a member code before adding!')
    }
}