function decline(id, email) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, decline it!',
    }).then((result) => {
      if (result.isConfirmed) {
        var jwt = getCookie('jwt');

        var data = {
            "jwt" : jwt,
            "email" : email,
            "req_id" : id
        };
        $.ajax({
            url: "../api/users/declineRequestedAccount.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            beforeSend: function() {
                console.log("Fetching Data..")
            },
            success : function(result){
              dataTable.destroy();
              loadAllRequestedAccounts();
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

        Swal.fire({
          icon : 'success',
          html : 'Account request declined!'
        })
      }
    });
  }

  function approve(id, email) {
    Swal.fire({
      title: "Select User's Role",
      input: 'select',
      inputOptions: {
        'Board Member': 'Board Member',
        'Homeowner': 'Homeowner'
      },
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Approve',
      confirmButtonColor: '#3085d6',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        var jwt = getCookie('jwt');

        var data = {
            "jwt" : jwt,
            "email" : email,
            "req_id" : id,
            "user_role" : result.value
        };
        $.ajax({
            url: "../api/users/approveRequestedAccount.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            beforeSend: function() {
                console.log("Fetching Data..")
            },
            success : function(result){
              dataTable.destroy();
              loadAllRequestedAccounts();
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

        Swal.fire({
          icon : 'success',
          html : 'Account request approved!'
        })
      }
    })
  }