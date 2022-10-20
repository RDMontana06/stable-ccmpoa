// Get the modal
var modall = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closex")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modall.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modall) {
    modall.style.display = "none";
  }
}

function editPost(id) {
    var content = document.querySelector('#postID_' + id + ' p').innerText;
    modall.style.display = "block";
    document.getElementById('edit_post_content').click();
    var editPostContent = document.getElementById('edit_post_content');

    editPostContent.value = content;
    
    document.getElementById('edit_post_btn').addEventListener('click', () => {
      updatePost(id, editPostContent.value);
    })
}



function updatePost(id, editedContent) {
  var jwt = getCookie('jwt');

  var data = {
      "post_id" : id,
      "jwt" : jwt,
      "post_content" : editedContent
  };

  $.ajax({
      url: "../api/posts/updatePost.php",
      type : "POST",
      contentType : 'application/json',
      data : JSON.stringify(data),
      beforeSend: function() {
        document.getElementById('edit_post_btn').innerText = "Updating"
      },
      success : function(result){
        modall.style.display = "none";
        renderPosts();
        reloadFiles();
        document.getElementById('edit_post_btn').innerText = "Update"

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
          document.getElementById('edit_post_btn').innerText = "Update"
      }
  });
}