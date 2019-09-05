angular.module('myApp', [])
    .controller('app', function ($scope) {

        var scp = $scope;

        scp.cur_year = new Date().getFullYear();

        scp.get_from_to = function (from_date, to_date, note) {
            return to_date ? [from_date, to_date, note] : from_date
        };

        scp.get_duration = function (from_date, to_date, note) {
            [from_date, to_date, note] = scp.get_from_to(from_date, to_date, note);
            var date_display = "";
            var is_carry_over_year = false;
            if (month_diff = (to_date.getMonth() - from_date.getMonth() + 1)) {
                if (month_diff < 0) {
                    month_diff = 12 + month_diff;
                    is_carry_over_year = true;
                }
                date_display += month_diff == 1 ? month_diff + " month " : month_diff + " months "
            }
            if (year_diff = (to_date.getFullYear() - from_date.getFullYear() + (is_carry_over_year ? -1 : 0 )))
                date_display = (year_diff == 1 ? year_diff + " year " : year_diff + " years ") +
                  (date_display ? " & " + date_display : "");
            return date_display.trim() + (note ? note : "");
        };

        scp.get_date_pretty = function (date_inp) {
            var disp = date_inp.toString().split(" ");
            var cur_date = new Date();
            var is_date_same = date_inp.getYear() == cur_date.getYear() &&
                date_inp.getMonth() == cur_date.getMonth() &&
                date_inp.getDay() == cur_date.getDay();
            return is_date_same ? "Present" : disp[1] + " " + disp[3]
        };

        scp.get_interval = function (from_date, to_date) {
            [from_date, to_date] = scp.get_from_to(from_date, to_date);
            return scp.get_date_pretty(from_date) + " - " + scp.get_date_pretty(to_date)
        };

        scp.get_interval_n_duration = function (from_date, to_date, note) {
            [from_date, to_date, note] = scp.get_from_to(from_date, to_date, note);
            return scp.get_interval(from_date, to_date) + ", " + scp.get_duration(from_date, to_date, note)

        };

        scp.get_tag_link = function (tag) {
            return scp.to_link[tag.replace(/ /g, "").toLowerCase()]
        };


        var proportion;

        function drawChart() {
            var data = google.visualization.arrayToDataTable(proportion);

            var options = {
                title: 'Personality Donut',
                pieHole: 0.4,
                chartArea: {'width': '80%', 'height': '80%'},
                colors: ["#E8E4C6", "#B6B190", "#A5C3CA", "#C6DDE2", "#DCE3EB"],
                backgroundColor: { fill:'transparent' },
            };

            var chart = new google.visualization.PieChart(document.getElementById('donut_chart'));
            chart.draw(data, options);
        }

        google.charts.load("current", {packages: ["corechart"]});

    });
