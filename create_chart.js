/**
 * Created by davidflast on 3/20/17.
 */

function create_chart(am, pm){
    var ctx = document.getElementById("am_pm");

    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: {
            labels: ["Events in AM","Events in PM"],
            datasets:[
                {
                    label:"% of events in AM and PM",
                    data:[am, pm],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                ]
                }
            ]
        }
    });

}

function create_days_chart(days){
    var ctx = document.getElementById("days_chart");

    var data = {
        labels: ["1","2","3","4","5","6","7","8","9","10", "11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"],
        datasets: [
            {
                label: "Events Per Day",
                backgroundColor:
                    "#7647a2",
                data: days
            }
        ]
    };
    var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: data
    });


}