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


function loadProperty(id) {
    window.location.href = "property.html?id=" + id;
}


function loadMarketplaceListings() {
    var jwt = getCookie('jwt');

    var data = {
        "jwt" : jwt
    };

    $.ajax({
        url: "../api/marketplace/readAllPropertyListing.php",
        type : "POST",
        contentType : 'application/json',
        data : JSON.stringify(data),
        beforeSend: function() {
            console.log("Fetching Data..")
        },
        success : function(result){
            console.log(result)
            var marketplace_listing = document.getElementById('marketplace_listing');

            marketplace_listing.innerHTML = "";

            if (result.marketplace.length === 0) {
                marketplace_listing.innerHTML = `<h3 style="text-align: center; padding: 50px 0px">No Property Listings Available</h3>`
            }


            result.marketplace.forEach((item, index) => {
                var date = new Date(item.mp_date);
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
                date = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();


                marketplace_listing.innerHTML += `
                <div class="column is-one-fifth-quarter is-one-third-widescreen is-half-desktop is-half-tablet is-half-mobile" onclick="loadProperty(`+ item.mp_id +`)">
                    <div class="product-card p-0" data-name="Spring Red Dress" data-price="42,500.00" data-colors="true" data-variants="true" data-path="../assets/img/products/sample-property">

                        <div class="set-options">
                            <img class="go-to-products pointer" src="../assets/img/forward.svg" href="#">
                            <img class="heart pointer" src="../assets/img/heart.svg" href="#">
                        </div>

                        <div class="product-image">
                            <img class="m-0" src="../assets/img/marketplace_images/`+ item.mp_image +`" alt="">
                        </div>

                        <div class="product-info">
                            <div class="columns mb-1 pl-3 pr-3 mt-1 price-classify">
                                <div class="column pb-0">
                                    <h2 class="tag-price">$`+ item.mp_price +`</h2>
                                </div>
                                <div class="column has-text-right pb-0">
                                    <span class="product-classification">Selling</span>
                                </div>
                            </div>
                            <div class="product-title mb-1 pl-3 pr-3">
                                <h2 class="has-text-weight-medium">`+ item.mp_name +`</h2>
                            </div>
                            <div class="product-sub-details columns pl-3 pr-3 mb-1">
                                <div class="column">
                                    <p>from <span class="tag-location">`+ item.mp_location +`</span></p>
                                </div>
                                <div class="column is-one-third has-text-right">
                                    <p class="date-posted">`+ date +`</p>
                                </div>
                            </div>
                        </div>

                        <div class="posted-by-info pl-3 pr-3 pt-2 pb-2">
                            <img class="posted-by-image mr-3" src="https://via.placeholder.com/50x50.png?text=Image">
                            <a class="posted-by" href="#">posted by <span class="posted-name">`+ item.mp_ownerName +`</span></a>
                        </div>
                    </div>
                </div>

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

loadMarketplaceListings();