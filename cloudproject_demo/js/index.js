$(".nav-item").ready
$(document).on("DOMContentLoaded", DOMLoaded);(Ready);
$(document).on("submit", "#frm-login", Login);
$(document).on("submit", "#frm-register", Register);
$(document).on("click", "#viewDetail", ViewDetails);

function DOMLoaded() {
    $("#navbar").load("../html/menu.html");
}

function Ready() {
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);

    $(".nav-item a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == '') {
            $(this).addClass("active");
        }
    });
}

function Login(e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "../php/login.php",
        data: $("#frm-login").serialize(),
        success: function (result) {
            result = $.parseJSON(result);

            if (result.success) { 
                $("#frm-login")
                alert("Fullname: " + result.fullname + "\n" +
                    "Phone: " + result.phone + "\n" +
                    "Birthday: " + result.birthday + "\n" +
                    "Age: " + result.age);

                $("#frm-login").trigger("reset");
                location.href = "product.html";
            }
            else {
                alert("Login unsuccessfully!");
            }
        }
    });
}


function Logout(e) {
    e.preventDefault();

    sessionStorage.setItem("username", $('#frm-login #username'));
    $('nav #nav-logout').hide();
    $('nav #nav-login').show();
}



function Register(e) {
    e.preventDefault();

    if ($("#password").val() === $("#confirm-password").val()) {
        $.ajax({
            type: "POST",
            url: "../php/register.php",
            data: $("#frm-register").serialize(),
            success: function (result) {
                result = $.parseJSON(result);

                if (result.success) {
                    alert("Registered successfully!");
                    $("#frm-register").trigger("reset");
                    location.href = "login.html";
                }
                else {
                    alert("Registered unsuccessfully!");
                }
            }
        });
    }
    else {
        $("#error").text("* Password mismatched.\n");
    }
} 




$("product-all").ready(ShowAllProduct);  
function ShowAllProduct() {
    $("product-all").empty(); 
    var product = [
        {name: "LAMBORGHINI ELEMENTO", price:"200.000", img: "https://media.mattel.com/root/HWCarsCatalog/Web/Thumbnail/GHG17_W_20_003.png"},
        {name: "98 HONDA PRELUDE", price:"200.000", img: "https://media.mattel.com/root/HWCarsCatalog/Web/Thumbnail/GHB55_W_20_003.png"},
        {name: "2018 HONDA CIVIC TYPE R", price:"200.000", img: "https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/GHF50_W_20_003.png"},
        {name: "BONE SHAKER®", price:"200.000", img: "https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/GHC15_W_20_003.png"}, 
        {name: "HUMVEE®", price:"200.000", img: "https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/GHC17_W_20_003.png"},
        {name: "RODGER DODGER®", price:"200.000", img: "https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/GHG60_w_20_003.png"},
        {name: "LAMBORGHINI ELEMENTO", price:"200.000", img: "https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/GHC35_W_20_003.png"},
        {name: "LAMBORGHINI ROADSTER", price:"200.000", img: "https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/GHC73_C_20_003.png"}


    ]; 
    for(item of product ){
        var text = `
             <div class="col">
                 <div class="card" style="width: 18rem; margin: 10px">
                     <img src="${item.img}" class="card-img-top" alt="${item.name}">
                     <div class="card-body">
                       <h5 class="card-title">${item.name}</h5>
                       <p class="card-text">${item.price}</p>
                       <a href="#" class="btn btn-primary" id="viewDetail">View Detail</a>
                       
                     </div>
                 </div>
             </div>

        `;
           
    $("#product-all").append(text);
    
    }
 }



function ViewDetails() {
    var product_id = $(this).data('product-id');

    $.ajax({
        type: 'POST',
        url: '../php/detail.php',
        data: { id: product_id },
        success: function (result) {
            result = $.parseJSON(result);

            $('#product-list').empty();
            $('#product-detail').load('detail.html', function (response, status, xhr) {
                if (status == 'success') {
                    document.title = result[0].name;
                    $('#breadcrumb-product-detail').append(`<li class="breadcrumb-item active" aria-current="page">${result[0].name}</li>`);

                    var subcategory = '';
                    var price = parseFloat(result[0].price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

                    for (item of result) { subcategory += item.subcategory_name + ', '; }
                    subcategory = subcategory.substring(0, subcategory.length - 2);

                    $('#product-detail #img').attr('src', result[0].image);
                    $('#product-detail #name').text(result[0].name);
                    $('#product-detail #description').text(result[0].description);
                    $('#product-detail #country').text(result[0].country);
                    $('#product-detail #price').text(price);
                    $('#product-detail #subcategory').text(subcategory);
                }
            });
        }
    });
}
