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
            var event_list = document.getElementById('event-list');
            var left_panel = document.getElementById('left_panel');

            event_list.innerHTML = "";
            left_panel.innerHTML = "";

            if (result.announcements.length === 0) {
                event_list.innerHTML = `<h3 style="text-align: center; padding: 50px 0px">No Announcement Available</h3>`
                left_panel.innerHTML = `<h3 style="text-align: center; padding: 50px 0px">No Announcement Available</h3>`
            }


            result.announcements.forEach((item, index) => {
                var eventDate = new Date(item.ann_date);
                var eventTime = item.ann_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                var eventDateLeft = months[eventDate.getMonth()] + ' ' + eventDate.getDate();
                eventDate = months[eventDate.getMonth()] + ' ' + eventDate.getDate() + ', ' + eventDate.getFullYear();
                

                left_panel.innerHTML += `
                    <a href="#event-`+ index +`" data-event-id="event-1" class="scroll-link is-active">
                        <span class="date-block">
                                <i data-feather="calendar"></i>
                                <span class="month" style="width: 100%">`+ eventDateLeft +`</span>
                        </span>
                        <span class="meta-block">
                                <span class="time">at `+ eventTime +`</span>
                        </span>
                    </a>
                `

                event_list.innerHTML += `
                <div id="event-`+ index +`" class="event-item">
                    <div class="event-inner-wrap">
                        <!-- /partials/pages/events/event-options-dropdown.html -->
                        <div class="dropdown is-spaced event-options is-accent is-right dropdown-trigger">
                            <div>
                                <div class="button">
                                    <i data-feather="settings"></i>
                                </div>
                            </div>
                            <div class="dropdown-menu" role="menu">
                                <div class="dropdown-content">
                                    <a href="event-details.html" class="dropdown-item">
                                        <div class="media">
                                            <i data-feather="calendar"></i>
                                            <div class="media-content">
                                                <h3>View Event</h3>
                                                <small>Open event details.</small>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="dropdown-item">
                                        <div class="media">
                                            <i data-feather="smile"></i>
                                            <div class="media-content">
                                                <h3>Owner</h3>
                                                <small>View owner details.</small>
                                            </div>
                                        </div>
                                    </a>
                                    <hr class="dropdown-divider">
                                    <a href="#" class="dropdown-item">
                                        <div class="media">
                                            <i data-feather="delete"></i>
                                            <div class="media-content">
                                                <h3>Leave</h3>
                                                <small>Leave this event.</small>
                                            </div>
                                        </div>
                                    </a>
                                    <hr class="dropdown-divider">
                                    <a href="#" class="dropdown-item">
                                        <div class="media">
                                            <i data-feather="flag"></i>
                                            <div class="media-content">
                                                <h3>Report</h3>
                                                <small>unappropriate content.</small>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <h2 class="event-title">`+ item.ann_name +`</h2>
                        <div class="event-subtitle">
                            <i data-feather="map-pin"></i>
                            <h3>`+ item.ann_address +` | `+ eventDate +`.</h3>
                        </div>
                        <div class="event-content">
                            <div class="event-description content">
                                <p>`+ item.ann_description +`</p>

                            </div>
                        </div>
                        <div class="event-participants">
                            <div class="participants-group">
                                <img src="../assets/img/avatars/jenna.jpg" data-demo-src="../assets/img/avatars/jenna.jpg" data-user-popover="0" alt="">
                                <img src="../assets/img/avatars/dan.jpg" data-demo-src="../assets/img/avatars/dan.jpg" data-user-popover="4" alt="">
                                <img src="../assets/img/avatars/elise.jpg" data-demo-src="../assets/img/avatars/elise.jpg" data-user-popover="5" alt="">
                                <img src="../assets/img/avatars/stella.jpg" data-demo-src="../assets/img/avatars/stella.jpg" data-user-popover="7" alt="">
                            </div>
                            <div class="participants-text">
                                <p>
                                    <a href="#">You</a>,
                                    <a href="#">David</a>
                                </p>
                                <p>and 23 more are participating</p>
                            </div>
                        </div>
                    </div>
                </div>
                `
            })
        },
        error: function(result){
            // on error, tell the user login has failed & empty the input boxes
            // $('#response').html("<div class='alert alert-danger'>Login failed. Email or password is incorrect.</div>");
            // login_form.find('input').val('');
            if(result.responseJSON.message === "Access denied.") {
                setCookie("jwt", "", );
                window.location.href = "/#unauthorized";
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