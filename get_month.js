/**
 * Created by davidflast on 3/18/17.
 */

function create_chart(am, pm) {
    var ctx = document.getElementById("am_pm");

    var myPieChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Events in AM", "Events in PM"],
            datasets: [
                {
                    label: "% of events in AM and PM",
                    data: [am, pm],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                    ]
                }
            ]
        }
    });

}

function create_days_chart(days) {
    var ctx = document.getElementById("days_chart");

    var data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        datasets: [
            {
                label: "Events Per Day",
                backgroundColor: "#7647a2",
                data: days
            }
        ]
    };
    var myLineChart = new Chart(ctx, {
        type: "bar",
        data: data
    });


}

function get_month(month_, year_, handleData) {
    $.ajax({
        url: "get_month.php",
        data: {
            month: month_,
            year: year_
        },
        success: function (result) {
            //var events = [[],[]];
            var am = 0;
            var pm = 0;
            var noon = "12:00:00";
            for (i = 0; i < result.times.length; i += 1) {
                if (result.times[i] < noon) {
                    am++;
                } else {
                    pm++;
                }
            }
            create_chart(am, pm);
            var zeros = new Array(31);
            for ( i = 0; i < zeros.length; i += 1) {
                zeros[i] = 0;
            }
            for ( i = 0; i < result.days.length; i += 1) {
                var cur_day = parseInt(result.days[i]);
                ++zeros[cur_day - 1];
            }
            create_days_chart(zeros);


            for (var i = 0; i < result.titles.length; i += 1) {
                //$("#get_month_test").append("<p>" + result.titles[i]+ "</p>");
                //$("#get_month_test").append("<p>" + result.year[i]+ "</p>");
                //$("#get_month_test").append("<p>" + result.month[i]+ "</p>");
                //$("#get_month_test").append("<p>" + result.days[i]+ "</p>");
                //$("#get_month_test").append("<p>" + result.times[i]+ "</p>");
                //events[i][0] = result.titles[i];
                //events[i][1] = result.days[i];
                //events[i][2] = result.times[i];
            }
            if (result.titles[0] !== undefined) {
                handleData(result);
            }

        },
        method: "POST",
        dataType: "json"
    });
}

