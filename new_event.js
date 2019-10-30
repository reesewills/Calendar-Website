/**
 * Created by davidflast on 3/17/17.
 */
function new_event() {
    var xmlHttp = new XMLHttpRequest();
    event.preventDefault();
    var output = $('#new_event').serialize();
    xmlHttp.open("POST", "new_event.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.addEventListener("load", function(event){
        var jsonData = JSON.parse(event.target.responseText);
        if(jsonData.success){
            document.getElementById("event_created").textContent = "Event was successfully created";
        }else{
            document.getElementById("event_created").textContent = "Event not created";
        }
    }, false);
    xmlHttp.send(output);
}
document.getElementById("new_event_button").addEventListener("click", new_event, false);