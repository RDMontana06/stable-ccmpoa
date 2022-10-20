var profileImg = userJSON.profile_img;

var profileImgElement = document.querySelectorAll('.profile_img');

profileImgElement.forEach((item) => {
    item.src = '../assets/img/profile_img/' + profileImg;
})