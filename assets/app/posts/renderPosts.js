function reloadJs(src) {
    src = $('script[src$="' + src + '"]').attr("src");
    $('script[src$="' + src + '"]').remove();
    $('<script/>').attr('src', src).appendTo('body');
}

function reloadFiles() {
    reloadJs("../assets/js/app.js");
    reloadJs("../assets/js/main.js");

    setTimeout(() => {
        document.querySelector('.pageloader').classList.remove('is-active')
    }, 3000);
}

function openMenu(id) {
    var dropdown = document.querySelector('#postID_' + id + ' .dropdown');

    dropdown.classList.add("is-active")
}


function renderPosts() {

    var data = {
        jwt : getCookie('jwt')
    }

    $.ajax({
        url: "../api/posts/readAllPosts.php",
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(data),
        beforeSend: function() {
            console.log("Fetching Posts")
        },
        success : function(result){
            var resultJSON = result.posts;
            var postsHTML = "";
            
            if (resultJSON.length !== 0) {
                resultJSON.forEach((item) => {
                    postsHTML += addDataToTemplate(item.post_content, item.post_date, item.post_id, item.post_totalComments, item.post_totalLikes, item.post_userID, item.post_userName, item.post_imageName)
                });
            } else {
                postsHTML = `<h2 style="text-align: center">No posts available</h2>`
                document.querySelector('.load-more-button').style.display = "none"
            }
            
            document.getElementById('newsfeed-container').innerHTML = postsHTML;

            document.querySelectorAll('.is-post').forEach((item) => {
                item.querySelector('.showComment').addEventListener('click', () => {
                    var contentWrap = item.querySelector('.content-wrap');
                    var commentWrap = item.querySelector('.comments-wrap');
                
                    if (contentWrap.classList.contains('is-hidden')) {
                        contentWrap.classList.remove('is-hidden');
                        commentWrap.classList.add('is-hidden');
                    } else {
                        contentWrap.classList.add('is-hidden');
                        commentWrap.classList.remove('is-hidden')
                    }

                    if (item.querySelector('.comments-count span').innerText != 0) {
                        renderComments(item.getAttribute("id").split("_")[1]);   
                    }
                    runThis()
                    
                })

                item.querySelector('.close-comments').addEventListener('click', () => {
                    var contentWrap = item.querySelector('.content-wrap');
                    var commentWrap = item.querySelector('.comments-wrap');
                
                    if (contentWrap.classList.contains('is-hidden')) {
                        contentWrap.classList.remove('is-hidden');
                        commentWrap.classList.add('is-hidden');
                    } else {
                        contentWrap.classList.add('is-hidden');
                        commentWrap.classList.remove('is-hidden')
                    }
                })
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

function addDataToTemplate(content, date, id, totalComments, totalLikes, userID, userName, post_imageName) {
    date = new Date(date);
    var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    date = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + time;

    var clientUserInfo = JSON.parse(localStorage.getItem('user_info'))


    var postTemplate = `<div class="card is-post is-simple" id="postID_`+ id +`" data-userID=`+ userID +`>
        <!-- Main wrap -->
        <div class="content-wrap">
            <!-- Header -->
            <div class="card-heading">
                <!-- User image -->
                <div class="user-block">
                    <div class="image">
                        <img src="https://via.placeholder.com/300" data-demo-src="../assets/img/avatars/bobby.jpg" data-user-popover="8" alt="">
                    </div>
                    <div class="user-info">
                        <a href="#" class="userName" id="userID_`+ userID +`">` + userName + `</a>
                        <span class="time">`+ date +`</span>
                    </div>
                </div>
                <!-- /partials/pages/feed/dropdowns/feed-post-dropdown.html -->
                <div class="dropdown is-spaced is-right is-neutral dropdown-trigger">
                    <div>
                        <div class="button" onclick="openMenu(`+ id +`)">
                            <i data-feather="more-vertical" class="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </div>
                    <div class="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            `+ (clientUserInfo.id == userID ? `
                            <a class="dropdown-item" onclick='editPost(`+ id +`)'>
                                <div class="media">
                                    <i data-feather="edit"></i>
                                    <div class="media-content">
                                        <h3>Edit</h3>
                                        <small>Edit your amazing post</small>
                                    </div>
                                </div>
                            </a>
                            <a class="dropdown-item" onclick="deletePost(`+ id +`)">
                                <div class="media">
                                    <i data-feather="trash"></i>
                                    <div class="media-content">
                                        <h3>Delete</h3>
                                        <small>Delete your post</small>
                                    </div>
                                </div>
                            </a>
                            <hr class="dropdown-divider">
                            ` : ``) +`
                            <a href="#" class="dropdown-item">
                                <div class="media">
                                    <i data-feather="flag"></i>
                                    <div class="media-content">
                                        <h3>Flag</h3>
                                        <small>In case of inappropriate content.</small>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Header -->

            <!-- Post body -->
            <div class="card-body">
                <!-- Post body text -->
                <div class="post-text">
                    <p>`+ content +`<p>
                </div>
                `+ (post_imageName != '' && post_imageName != null ?
                    `<div class="post-image">
                        <a data-fancybox="post1" data-lightbox-type="comments" data-thumb="assets/img/demo/unsplash/1.jpg" href="../assets/img/posts/4th.jpg" data-demo-href="assets/img/demo/unsplash/1.jpg">
                            <img src="../assets/img/post_images/`+ post_imageName +`" alt="">
                        </a>
                    </div>` : ``
                ) +`
                <!-- Post actions -->
                <div class="post-actions">
                    <!-- /partials/pages/feed/buttons/feed-post-actions.html -->
                    <div class="like-wrapper">
                        <a href="javascript:void(0);" class="like-button">
                            <i class="mdi mdi-heart not-liked bouncy"></i>
                            <i class="mdi mdi-heart is-liked bouncy"></i>
                            <span class="like-overlay"></span>
                        </a>
                    </div>

                    <div class="fab-wrapper is-comment">
                        <a href="javascript:void(0);" class="small-fab showComment">
                            <i data-feather="message-circle" class="fa-solid fa-comment"></i>
                        </a>
                    </div>
                </div>
            </div>
            <!-- /Post body -->

            <!-- Post footer -->
            <div class="card-footer">
                <!-- Followers -->
                <!-- Post statistics -->
                <div class="social-count">
                    <div class="likes-count">
                        <i data-feather="heart" class="fa-solid fa-heart"></i>
                        <span>`+ totalLikes +`</span>
                    </div>
                    <div class="comments-count">
                        <i data-feather="message-circle" class="fa-solid fa-comment"></i>
                        <span>` + totalComments + `</span>
                    </div>
                </div>
            </div>
            <!-- /Post footer -->
        </div>
        <!-- /Main wrap -->

        <!-- Post #6 comments -->
        <div class="comments-wrap is-hidden">
            <!-- Header -->
            <div class="comments-heading">
                <h4>
                    Comments
                    <small>(<span>`+totalComments+`</span>)</small>
                </h4>
                <div class="close-comments">
                    <i data-feather="x" class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <!-- /Header -->

            <!-- Comments body -->
            <div class="comments-body has-slimscroll comment-container">
                <div class="comments-placeholder">
                    <img src="../assets/img/icons/feed/bubble.svg" alt="">
                    <h3>Nothing in here yet</h3>
                    <p>Be the first to post a comment.</p>
                </div>
            </div>
            <!-- /Comments body -->

            <!-- Comments footer -->
            <div class="card-footer">
                <div class="media post-comment has-emojis">
                    <!-- Textarea -->
                    <div class="media-content">
                        <div class="field">
                            <p class="control">
                                <textarea class="textarea comment-textarea" rows="5" placeholder="Write a comment..."></textarea>
                            </p>
                        </div>
                        <!-- Additional actions -->
                        <div class="actions">
                            <div class="image is-32x32">
                                <img class="is-rounded" src="https://via.placeholder.com/300" data-demo-src="../assets/img/avatars/jenna.png" data-user-popover="0" alt="">
                            </div>
                            <div class="toolbar">
                                <div class="action is-auto">
                                    <i data-feather="at-sign"></i>
                                </div>
                                <div class="action is-emoji">
                                    <i data-feather="smile"></i>
                                </div>
                                <div class="action is-upload">
                                    <i data-feather="camera"></i>
                                    <input type="file">
                                </div>
                                <a class="button is-solid primary-button raised commentBtn" id="`+ id +`">Post Comment</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Comments footer -->
        </div>
        <!-- /Post #6 comments -->
    </div>`;

    return postTemplate;
}


renderPosts()