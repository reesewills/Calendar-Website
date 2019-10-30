 var currentMonth = new Month(2017, 2);
        // Change the month when the "next" button is pressed

        document.getElementById("next_month_btn").addEventListener("click", function(event){
            event.preventDefault();
            currentMonth = currentMonth.nextMonth(); 
            renderCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
        }, false);
        
        document.getElementById("prev_month_btn").addEventListener("click", function(event){
            event.preventDefault();
            currentMonth = currentMonth.prevMonth(); 
            renderCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
        }, false);
        
        function resetMonth(){
         currentMonth = new Month(2017, 2);
        }
    
        function renderCalendar(){
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            document.getElementById('currentMonth').innerHTML = "The current month is " + months[currentMonth.month]+ " " + currentMonth.year;
            var weeks = currentMonth.getWeeks();
            var table = document.createElement("table");
            table.setAttribute("id", "thisMonth");
            document.getElementById('dates').innerHTML = "";
            document.getElementById('dates').appendChild(table);
            var currWeek = document.createElement("tr");
            var dayCounter = 1;
            currWeek.setAttribute("id", "thisWeek");
            document.getElementById("thisMonth").appendChild(currWeek);
            var counter = 0;
            //var buttonCounter = 0;
            var weekDays = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];
            for(var i = 0; i < weekDays.length; ++i){
                var today = document.createTextNode(weekDays[i]);
                var currDay = document.createElement("td");
                currDay.appendChild(today);
                document.getElementById('thisWeek').appendChild(currDay);
            }
            for(var w in weeks){
                ++counter;
                currWeek = document.createElement("tr");
                currWeek.setAttribute("id", "thisWeek" + counter);
                document.getElementById("thisMonth").appendChild(currWeek);
                days = weeks[w].getDates();
                for(var d in days){
                    var currDay1 = document.createElement("td");
                    var today1 = document.createTextNode(days[d].getDate());
                    if(counter == 1){
                        if(days[d].getDate() > 8){
                            today1 = document.createTextNode("");
                        }
                        else{
                             currDay1.setAttribute("id", "day" + dayCounter);
                            ++dayCounter;
                        }
                    }
                    else if(counter > 3){
                        if(days[d].getDate() < 8){
                            today1 = document.createTextNode('');
                        }
                        else{
                            currDay1.setAttribute("id", "day" + dayCounter);
                            ++dayCounter;
                        }
                    }
                    else{
                        currDay1.setAttribute("id", "day" + dayCounter);
                        ++dayCounter;
                    }
                    currDay1.appendChild(today1);
                    document.getElementById('thisWeek' + counter).appendChild(currDay1);
                    console.log(days[d].toISOString());
                }
            }
            get_month(currentMonth.month + 1, currentMonth.year, function(result){
                event.preventDefault();
                if(result.titles[0] !== undefined){
                    for(var d = 1; d <= dayCounter; ++d){
                        var dayCheck = document.getElementById('day' + d);
                        for(var i = 0; i < result.titles.length; ++i){   
                            if(d == result.days[i]){
                                dayCheck.appendChild(document.createTextNode("\n Event " + result.titles[i] + " at " + result.times[i] +" LOOK HERE: " +result.event_ids[i]+ "\n"));
                                var form = document.createElement("form");
                                //form.setAttribute("method", "POST");
                                var formid = "form" + result.event_ids[i];
                                form.setAttribute("id", formid) ;
                                var button = document.createElement("input");
                                button.setAttribute("value", "Delete Event");
                                button.setAttribute("id", "button" + result.event_ids[i]);
                                button.setAttribute("type", "submit");
                                //button.addEventListener("click", deleteEvent, false);
                                var button1 = document.createElement("input");
                                button1.setAttribute("name", "event_id");
                                button1.setAttribute("type", "hidden");
                                button1.setAttribute("value", result.event_ids[i]);
                                var button2 = document.createElement("input");
                                button2.setAttribute("name", "token");
                                button2.setAttribute("type", "hidden");
                                button2.setAttribute("value", token);
                                //alert(result.event_ids[i]);
                                //button.setAttribute("onSubmit", deleteEvent(result.event_ids[i]));
                                form.appendChild(button1);
                                form.appendChild(button2);
                                form.appendChild(button);
                                dayCheck.appendChild(form);
                                $("#" + formid).submit( function( event ) {
                                    event.preventDefault();
                                    $.post('delete_event.php', $( "#" + formid ).serialize());
                                    renderCalendar();
                                });
                                var form1 = document.createElement("form");
                                var formid1 = "form1" + result.event_ids[i];
                                form1.setAttribute("id", formid1) ;
                                var button8 = document.createElement("input");
                                button8.setAttribute("value", "Edit Event");
                                button8.setAttribute("id", "button2" + result.event_ids[i]);
                                button8.setAttribute("type", "submit");
                                var button3 = document.createElement("input");
                                button3.setAttribute("name", "event_id");
                                button3.setAttribute("type", "hidden");
                                button3.setAttribute("value", result.event_ids[i]);
                                var label1 = document.createElement("label");
                                label1.appendChild(document.createTextNode("Title"));
                                var button4 = document.createElement("input");
                                button4.setAttribute("name", "title");
                                button4.setAttribute("type", "text");
                                label1.appendChild(button4);
                                var label2 = document.createElement("label");
                                label2.appendChild(document.createTextNode("Date"));
                                var button5 = document.createElement("input");
                                button5.setAttribute("name", "date");
                                button5.setAttribute("type", "date");
                                label2.appendChild(button5);
                                var label3 = document.createElement("label");
                                label3.appendChild(document.createTextNode("Time"));
                                var button6 = document.createElement("input");
                                button6.setAttribute("name", "time");
                                button6.setAttribute("type", "time");
                                var button7 = document.createElement("input");
                                button7.setAttribute("name", "token");
                                button7.setAttribute("type", "hidden");
                                button7.setAttribute("value", token);
                                label3.appendChild(button6);
                                form1.appendChild(label1);
                                form1.appendChild(label2);
                                form1.appendChild(label3);
                                form1.appendChild(button8);
                                form1.appendChild(button3);
                                form1.appendChild(button7);
                                dayCheck.appendChild(form1);
                                $("#" + formid1).submit( function( event ) {
                                    event.preventDefault();
                                    $.post('edit_event.php', $( "#" + formid1).serialize());
                                    renderCalendar();
                                });
                            }
                        }
                    }
                }
            });
        }
        document.getElementById('new_event_button').addEventListener("click", renderCalendar, false);
        document.getElementById('logout_button').addEventListener("click",resetMonth,false);
        document.getElementById('login_button').addEventListener("click", renderCalendar, false);