function loadMemberCodeTable () {
    var jwt = getCookie('jwt');

    var data = {
        "jwt" : jwt
    };

    $.ajax({
        url: "../api/users/readAllActiveMemberCode.php",
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(data),
        beforeSend: function() {
            console.log("Fetching Data..")
        },
        success : function(result){
            console.log(result)
            var table = document.getElementById('member_code_table');
            table.innerHTML = "";
            if (result.member_codes.length === 0) {
                table.innerHTML = `<tr>
                                        <td colspan='3' style='text-align: center'>No Results Found</td>
                                    </tr>`
            }
            result.member_codes.forEach((item) => {
                table.innerHTML += `
                    <tr>
                        <td>`+ item.user_role +`</td>
                        <td>`+ item.member_code +` <span title='Copy Registration Link' style='cursor: pointer' onClick=copyTextToClipboard('`+ item.member_code +`')>📋</span></td>
                        <td>`+ item.date_generated +`</td>
                    </tr>
                `
            })
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

function loadUsedMemberCodeTable () {
    var jwt = getCookie('jwt');

    var data = {
        "jwt" : jwt
    };

    $.ajax({
        url: "../api/users/loadUsedMemberCodeTable.php",
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(data),
        beforeSend: function() {
            console.log("Fetching Data..")
        },
        success : function(result){
            console.log(result)
            var table = document.getElementById('membercode-history');
            table.innerHTML = "";
            if (result.member_codes.length === 0) {
                table.innerHTML = `<tr>
                                        <td colspan='3' style='text-align: center'>No Results Found</td>
                                    </tr>`
            }
            result.member_codes.forEach((item) => {
                table.innerHTML += `
                    <tr>
                        <td>`+ item.user_role +`</td>
                        <td>`+ item.member_code +`</td>
                        <td>`+ item.date_generated +`</td>
                        <td>`+ item.user_name +`</td>
                        <td>`+ item.user_email +`</td>
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

loadUsedMemberCodeTable();
loadMemberCodeTable();

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
  
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
  
    textArea.style.width = '2em';
    textArea.style.height = '2em';
  
    textArea.style.padding = 0;
  
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
  
    textArea.style.background = 'transparent';
  
  
    textArea.value = "https://ccmpoa.org/signup.html?mem_code=" + text;
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      alert("Registration Link Copied!")
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  
    document.body.removeChild(textArea);
  }