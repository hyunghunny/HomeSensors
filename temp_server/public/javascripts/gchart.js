        google.load("visualization", "1", {packages:["corechart"]});
        //google.setOnLoadCallback(requestData);
        function requestData() {
            var xhr = new XMLHttpRequest();
            xhr.open('get', '/temperatures');            
            xhr.onreadystatechange = function() {
                console.log('receiving onreadystatechange')
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = xhr.responseText;
                        try {
                            var json = JSON.parse(data); 
                        } catch (ex) {
                            console.log('Exception: ' + ex.name);
                        }                                               
                        drawChart(json["all"]);
                    } else {
                        console.log('Error: '+xhr.status); 
                    }
                }
            }
            xhr.send(null);
            console.log('send GET request'); 
        }
        function drawChart(json) {
            console.log('drawChart is invoked.');            
            var data = google.visualization.arrayToDataTable(json);
            var options = {
                title: 'Room Temperature',
                legend: { position: 'bottom' },
                curveType: 'function'
            };
            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(data, options);                   
        }