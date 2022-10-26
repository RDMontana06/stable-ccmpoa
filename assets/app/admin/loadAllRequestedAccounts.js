var dataTable; 

function loadAllRequestedAccounts () {
    var jwt = getCookie('jwt');

    var data = {
        "jwt" : jwt
    };

    $.ajax({
        url: "../api/users/readAllRequestedAccount.php",
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(data),
        beforeSend: function() {
            console.log("Fetching Data..")
        },
        success : function(result){
            var table = document.getElementById('requested_accounts_tb');
            table.innerHTML = "";
            result.account_requests.forEach((item) => {
                table.innerHTML += `
                    <tr id="req_acc_`+ item.id +`">
                        <td width="30%">`+ item.email +`</td>
                        <td>
                        `+ item.message +`
                        </td>
                        <td>`+ item.date_requested +`</td>
                        <td>
                        <button
                            class="button is-success is-small"
                            style="height: 20% !important"
                            title="Approve"
                            onclick="approve(`+ item.id +`, '`+ item.email +`')">
                            <span class="fa fa-check"></span>
                        </button>
                        <button
                            class="button is-danger is-small"
                            style="height: 20% !important"
                            title="Decline"
                            onclick="decline(`+ item.id +`, '`+ item.email +`')">
                            <span class="fa fa-ban"></span>
                        </button>
                        </td>
                    </tr>
                `
            })

            dataTable = $('#acctReq-tbl').DataTable({
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

loadAllRequestedAccounts();
