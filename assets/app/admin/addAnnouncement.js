function addAnnouncement() {
    var ann_date = document.getElementById('event_date').value;
    var ann_time = document.getElementById('event_time').value;
    var ann_name = document.getElementById('event_name').value;
    var ann_description = document.getElementById('event_description').value;
    var ann_address = document.getElementById('event_address').value;
    var ann_id = document.getElementById('event_id').value
    var jwt = getCookie('jwt');

    if (ann_id === "") {
        var data = {
            "ann_date" : ann_date,
            "ann_time" : ann_time,
            "ann_name" : ann_name,
            "ann_description" : ann_description,
            "ann_address" : ann_address,
            "jwt" : jwt
        };

        $.ajax({
            url: "../api/announcement/addAnnouncement.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            beforeSend: function() {
                console.log("Adding announcement..")
            },
            success : function(result){
                alert(result.message)
    
                document.getElementById('event_date').value = "";
                document.getElementById("event_time").value = "";
                document.getElementById('event_name').value = "";
                document.getElementById("event_description").value = "";
                document.getElementById('event_address').value = "";
                loadAnnouncements()
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
        var data = {
            "ann_date" : ann_date,
            "ann_time" : ann_time,
            "ann_name" : ann_name,
            "ann_description" : ann_description,
            "ann_address" : ann_address,
            "ann_id" : ann_id,
            "jwt" : jwt
        };

        $.ajax({
            url: "../api/announcement/updateAnnouncement.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            beforeSend: function() {
                console.log("Adding announcement..")
            },
            success : function(result){
                alert(result.message)
    
                document.getElementById('event_date').value = "";
                document.getElementById("event_time").value = "";
                document.getElementById('event_name').value = "";
                document.getElementById("event_description").value = "";
                document.getElementById('event_address').value = "";
                document.getElementById('event_id').value = "";
                loadAnnouncements()
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