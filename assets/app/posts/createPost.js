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

var publishBtn = document.getElementById('publish-button');

publishBtn.addEventListener('click', () => {
    var postContent = document.getElementById('publish').value;
    var uploadPreview = document.querySelector('#feed-upload img');
    var postAttachedImg;
    var postAttachedImgName = '';

    var jwt = getCookie('jwt');

    if (uploadPreview != null) {
        postAttachedImg = dataURLtoFile(uploadPreview.src, makeid(20) + '.jpg')
        postAttachedImgName = postAttachedImg.name;
    }

    var data = {
        "post_content" : postContent,
        "post_imageName" : postAttachedImgName,
        "jwt" : jwt
    };

    console.log(data)
    console.log(postAttachedImg);

    $.ajax({
        url: "../api/posts/create.php",
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(data),
        beforeSend: function() {
            console.log("Posting..")
        },
        success : function(result){

            //upload the file
            var file_data = postAttachedImg;   
            var form_data = new FormData();                  
            form_data.append('file', file_data);

            if (postAttachedImgName != '') {
                $.ajax({
                    url: '../api/posts/upload.php', // <-- point to server-side PHP script 
                    dataType: 'text',  // <-- what to expect back from the PHP script, if anything
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,                         
                    type: 'post',
                    beforeSend: function() {
                        console.log("Posting image...")
                    },
                    success: function(php_script_response){
                        console.log(php_script_response); // <-- display response from the PHP script, if any
                        document.querySelector('.close-publish').click()
                        document.querySelector('.remove-file').click()
                        document.getElementById('publish').value = "";
                        reloadFiles();
                        renderPosts();
                    }
                });
            } else {
                document.querySelector('.close-publish').click()
                document.getElementById('publish').value = "";
                reloadFiles();
                renderPosts();
            }

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
})


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

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}