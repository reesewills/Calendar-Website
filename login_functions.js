/**
 * Created by davidflast on 3/16/17.
 */

var token;

function register(){
    event.preventDefault();
    var xmlHttp = new XMLHttpRequest();
    var output = $('#register').serialize();
    xmlHttp.open("POST", "register_user.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.addEventListener("load", function(event){
        var jsonData = JSON.parse(event.target.responseText);
        if(jsonData.success){
            document.getElementById("register_status").textContent = "You were successfully registered";
        }else{
            document.getElementById("register_status").textContent = "you were not registered, try a different username or password";
        }
    }, false);
    xmlHttp.send(output);
}

function login() {
    var xmlHttp = new XMLHttpRequest();
    event.preventDefault();
    var output = $('#login').serialize();
    xmlHttp.open("POST", "signin_user.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.addEventListener("load", function(event){
        var jsonData = JSON.parse(event.target.responseText);
        if(jsonData.success){
            $("#logged_out").hide();
            $("#logged_in").show();
            document.getElementById("display_username").textContent = "Welcome to your very own personalized Calendar " + jsonData.username + "!";
            token = jsonData.token;
        get_month();
        }else{
            document.getElementById("login_failed").textContent = "You were not logged in.  "+ jsonData.message;

        }
    }, false);
    xmlHttp.send(output);
}

function logout() {
    var xmlHttp = new XMLHttpRequest();
    event.preventDefault();
    var output = $('#logout').serialize();
    xmlHttp.open("POST", "logout_user.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.addEventListener("load", function(event){
        var jsonData = JSON.parse(event.target.responseText);
        if(jsonData.success){
            $("#logged_out").show();
            $("#logged_in").hide();
            document.getElementById("login_failed").textContent = "You were logged out";
        }else{
        }
    }, false);
    xmlHttp.send(output);
}


$("#logged_in").hide();
document.getElementById("register_button").addEventListener("click",register,false);
document.getElementById("login_button").addEventListener("click", login, false);
document.getElementById("logout_button").addEventListener("click", logout, false);


