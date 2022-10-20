function runThis() {
    var commentButtons = document.querySelectorAll('.commentBtn');

    commentButtons.forEach((item) => {
        var postID = item.getAttribute('id');

        item.addEventListener('click', () => {
            var commentContent = document.querySelector('#postID_' + postID + ' .comment-textarea').value;
            var jwt = getCookie('jwt');
        
            var data = {
                "comment_content" : commentContent,
                "comment_postID" : postID,
                "jwt" : jwt
            };
        
            $.ajax({
                url: "../api/comments/create.php",
                type : "POST",
                contentType : 'application/json',
                data : JSON.stringify(data),
                beforeSend: function() {
                    console.log("Commenting..")
                },
                success : function(result){
                    // store jwt to cookie
                    // new NotifyJS({
                    //     message: "Posted!",
                    //     duration: 5000
                    // },
                    // {
                    //     color: '#4BB543',
                    //     textColor: 'white',
                    //     fontFamily: 'Lexend Deca',
                    //     customCSSBox: `border-bottom: 3px solid #4BB543; background-color: #4BB543;`
                    // });
                    document.querySelector('#postID_' + postID + ' .comment-textarea').value = "";
                    document.querySelector('#postID_' + postID + ' .comments-count span').innerText = parseInt(document.querySelector('#postID_' + postID + ' .comments-count span').innerText) + 1;
                    document.querySelector('#postID_' + postID + ' .comments-heading h4 small span').innerText = parseInt(document.querySelector('#postID_' + postID + ' .comments-heading h4 small span').innerText) + 1;
                    renderComments(postID)
        
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
    })
}

