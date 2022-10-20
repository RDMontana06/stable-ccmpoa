function renderComments(id) {

    var data = {
        jwt : getCookie('jwt'),
        comment_postID : id
    }

    $.ajax({
        url: "../api/comments/readAllComments.php",
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(data),
        beforeSend: function() {
            console.log("Fetching Comments")
        },
        success : function(result){
            var resultJSON = result.comments;
            var commentsHTML = "";
            resultJSON.forEach((item) => {
                commentsHTML = addCommentToTemplate(item.comment_content, item.comment_date, item.comment_id, item.comment_totalLikes, item.comment_userID, item.comment_userName) + commentsHTML
            });

            var selector = '#postID_' + id;

            document.querySelector(selector + ' .comment-container').innerHTML = commentsHTML;

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

function addCommentToTemplate(content, date, id, totalLikes, userID, userName) {
    date = new Date(date);
    var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    date = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + time;


    var commentTemplate = `<!-- Comment -->
    <div class="media is-comment" id="commentID_`+ id +`">
        <!-- User image -->
        <div class="media-left">
            <div class="image">
                <img src="https://via.placeholder.com/300" data-demo-src="../assets/img/avatars/bobby.jpg" data-user-popover="8" alt="">
            </div>
        </div>
        <!-- Content -->
        <div class="media-content">
            <a href="#" id="`+ userID +`">`+ userName +`</a>
            <span class="time">` + date + `</span>
            <p>`+ content +`</p>
            <!-- Comment actions -->
            <div class="controls">
                <div class="like-count">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <span>` + totalLikes + `</span>
                </div>
                <div class="reply">
                    <a href="#">Reply</a>
                </div>
            </div>
        </div>
        <!-- Right side dropdown -->
        <div class="media-right">
            <div class="dropdown is-spaced is-right is-neutral dropdown-trigger">
                <div>
                    <div class="button">
                        <i data-feather="more-vertical" class="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
                <div class="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <a class="dropdown-item">
                            <div class="media">
                                <i data-feather="x"></i>
                                <div class="media-content">
                                    <h3>Hide</h3>
                                    <small>Hide this comment.</small>
                                </div>
                            </div>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <div class="media">
                                <i data-feather="flag"></i>
                                <div class="media-content">
                                    <h3>Report</h3>
                                    <small>Report this comment.</small>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /Comment -->`

    return commentTemplate;
}
