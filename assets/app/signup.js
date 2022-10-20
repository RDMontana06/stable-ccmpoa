
// trigger when registration form is submitted
$('#signupbtn').click(function(){
    
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var cpassword = document.getElementById('cpassword').value;
    var phone = document.getElementById('phone').value;
    var uploadPreview = document.getElementById('upload-preview');
    var member_code = document.getElementById('code').value;
    var profileImgFile;
    var profileName = 'default.png';

    if (uploadPreview.src != 'https://via.placeholder.com/150x150') {
        profileImgFile = dataURLtoFile(uploadPreview.src, makeid(10) + '.jpg')
        profileName = profileImgFile.name;
    }

    // get form data
    var form_data = {
        firstname : firstname,
        lastname : lastname,
        email : email,
        password : password,
        cpassword : cpassword,
        phone : phone,
        profile_img : profileName,
        member_code : member_code
    }

    if(false){
        $('#inputPassword2').focus();
        new NotifyJS({
            message: "Password doesn't match. Please try again!",
            duration: 5000
        },
        {
            color: 'rgb(245,233,23)',
            textColor: 'red',
            fontFamily: 'Lexend Deca',
            customCSSBox: `border-bottom: 3px solid red; background-color: white;`
        })
        return false;
    } else {
        // submit form data to api
        $.ajax({
            url: "api/register.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(result) {
                //upload the file
                var file_data = profileImgFile;   
                var form_data = new FormData();                  
                form_data.append('file', file_data);
                console.log(form_data);                             
                if (profileName != 'default.png') {
                    $.ajax({
                        url: 'api/upload.php', // <-- point to server-side PHP script 
                        dataType: 'text',  // <-- what to expect back from the PHP script, if anything
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form_data,                         
                        type: 'post',
                        beforeSend: function() {
                            console.log("Loggin in")
                        },
                        success: function(php_script_response){
                            console.log(php_script_response); // <-- display response from the PHP script, if any
                            window.location.href = 'index.html#success';
                        }
                    });
                } else {
                    window.location.href = 'index.html#success';
                }

                // if response is a success, tell the user it was a successful sign up & empty the input boxes
                
            },

            error: function(result){
                // on error, tell the user sign up failed
                alert(result.responseJSON.message)
            }
        });
    }
    return false;
});


function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}


