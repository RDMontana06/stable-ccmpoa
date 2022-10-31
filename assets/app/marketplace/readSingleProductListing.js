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

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
let value = params.id;

if (value === null) {
    window.location.href = "marketplace.html"
} else {
    loadMarketplaceSinglePage(value)
}

function loadMarketplaceSinglePage(id) {
    var jwt = getCookie('jwt');

    var data = {
        "jwt" : jwt,
        "mp_id" : id
    };

    $.ajax({
        url: "../api/marketplace/readSinglePropertyListing.php",
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(data),
        beforeSend: function() {
            console.log("Fetching Data..")
        },
        success : function(result){
            console.log(result.marketplace[0])
            const resultJSON = result.marketplace[0];

            var date = new Date(resultJSON.mp_date);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
            date = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

            document.getElementById('mp_image').src = "../assets/img/marketplace_images/" + resultJSON.mp_image;
            document.getElementById('mp_name').innerText = resultJSON.mp_name;
            document.getElementById('mp_price').innerText = "$" + resultJSON.mp_price;
            document.getElementById('mp_date').innerText = date;
            document.getElementById('mp_description').innerText = resultJSON.mp_description;
            document.getElementById('mp_location').innerText = resultJSON.mp_location;
            document.getElementById('mp_ownerName').innerText = resultJSON.mp_ownerName;

            getUserEmail(resultJSON.mp_ownerID);
        },
        error: function(result){
            // on error, tell the user login has failed & empty the input boxes
            // $('#response').html("<div class='alert alert-danger'>Login failed. Email or password is incorrect.</div>");
            // login_form.find('input').val('');
            if(result.responseJSON.message === "Access denied.") {
                setCookie("jwt", "", );
                window.location.href = "/";
            } else {
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

        }
    });
}


function getUserEmail(ownerID) {
    var jwt = getCookie('jwt');

    var data = {
        "jwt" : jwt,
        "id" : ownerID
    };

    $.ajax({
        url: "../api/users/getUserEmail.php",
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(data),
        beforeSend: function() {
            console.log("Fetching Data..")
        },
        success : function(result){
            console.log(result.user[0].email)
            document.getElementById('message_btn').href = "mailto:" + result.user[0].email
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
}