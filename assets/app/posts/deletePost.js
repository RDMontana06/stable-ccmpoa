function deletePost(id) {
    let confirmDelete = confirm("Are you sure you want to delete your post?")

    if (confirmDelete) {
        var jwt = getCookie('jwt');

        var data = {
            "post_id" : id,
            "jwt" : jwt
        };

        $.ajax({
            url: "../api/posts/deletePost.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            beforeSend: function() {
                console.log("Deleting..")
            },
            success : function(result){
                
                alert(result.message)
                reloadFiles();
                renderPosts()

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