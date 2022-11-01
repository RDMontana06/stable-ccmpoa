var userTable; 

function loadAllUserList () {
    var jwt = getCookie('jwt');

    var data = {
        "jwt" : jwt
    };

    $.ajax({
        url: "../api/users/readAllUsers.php",
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(data),
        beforeSend: function() {
            console.log("Fetching Data..")
        },
        success : function(result){
            var table = document.getElementById('user-list-items');
            table.innerHTML = "";
            result.users.forEach((item) => {
                table.innerHTML += `
                    <tr id="user_`+ item.id +`">
                        <td width="30%">`+ item.email +`</td>
                        <td>
                        `+ item.firstname +` `+ item.lastname +`
                        </td>
                        <td>`+ item.phone +`</td>
                        <td>`+ item.role +`</td>
                    </tr>
                `
            })

            userTable = $('#user-list').DataTable({
                order: [[3, 'desc']],
            });

            
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

loadAllUserList();
