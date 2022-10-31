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

function loadAnnouncements() {
    var jwt = getCookie('jwt');

    var data = {
        "jwt" : jwt
    };

    $.ajax({
        url: "../api/announcement/readAllAnnouncement.php",
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(data),
        beforeSend: function() {
            console.log("Fetching Data..")
        },
        success : function(result){
            console.log(result)
            var event_list = document.getElementById('announcement_wrapper');

            event_list.innerHTML = "";

            if (result.announcements.length === 0) {
                event_list.innerHTML = `<h3 style="text-align: center; padding: 50px 0px">No Announcements Available</h3>`
            }


            result.announcements.forEach((item, index) => {
                var eventDate = new Date(item.ann_date);
                var eventTime = item.ann_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                var eventDateLeft = months[eventDate.getMonth()] + ' ' + eventDate.getDate();
                eventDate = months[eventDate.getMonth()] + ' ' + eventDate.getDate() + ', ' + eventDate.getFullYear();
                

                event_list.innerHTML += `
                    <tr>
                        <td>`+ item.ann_id+`</td>
                        <td>`+ item.ann_name +`</td>
                        <td>`+ eventDate +`</td>
                        <td>`+ eventTime +`</td>
                        <td>`+ item.ann_description +`</td>
                        <td>`+ item.ann_address +`</td>
                        <td>
                            <button class="button is-solid accent-button form-button" style='background-color: red !important; width: 100%; margin-bottom: 15px' onclick="deleteEvent(`+item.ann_id+`)">Delete</button>
                            <button class="button is-solid accent-button" style='width: 100%;' onclick="editEvent('`+item.ann_id+`', '`+item.ann_name+`', '`+item.ann_date+`', '`+item.ann_time+`', '`+item.ann_description+`', '`+item.ann_address+`')">Edit</button>
                        </td>
                    </tr>
                `
            })
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

loadAnnouncements();


function editEvent(id, name, date, time, description, address) {
    document.getElementById("event_id").value = id;
    document.getElementById("event_date").value = date;
    document.getElementById("event_name").value = name;
    document.getElementById("event_time").value = time;
    document.getElementById("event_description").value = description;
    document.getElementById("event_address").value = address;
}

function deleteEvent(id) {
    if (confirm("Are you sure you want to delete this event/announcement?") === true) {
        var jwt = getCookie('jwt');

        var data = {
            "jwt" : jwt,
            "ann_id" : id
        };

        $.ajax({
            url: "../api/announcement/deleteEvent.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            beforeSend: function() {
                console.log("Fetching Data..")
            },
            success : function(result){
                loadAnnouncements();
                alert("Event Deleted!")
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
}