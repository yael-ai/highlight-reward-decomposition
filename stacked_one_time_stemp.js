chartIt();
async function chartIt() {
    var sec = myVideo.currentTime
    console.log(sec)
    const data = await getData();
    const ctx = document.getElementById('bar_chart').getContext('2d');

    const myChart = new Chart(ctx, {

        type: 'bar',
        data: {
            labels: data.xs_action,
            datasets: [{
                    label: ['Head_1= Right Lane'],
                    data: data.ys_H1a,
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', ],
                    borderColor: ['rgba(255, 99, 132, 1)', ],
                    borderWidth: 1,
                    stack: 'Stack 0',
                },


                {
                    label: ['Head_2 = High Speed'],
                    data: data.ys_H2a,
                    backgroundColor: ['rgba(54, 162, 235, 0.2)', ],
                    borderColor: ['rgba(54, 162, 235, 1)', ],
                    borderWidth: 1,
                    stack: 'Stack 0',
                },

                {
                    label: ['Head_3 = Change Lane'],
                    data: data.ys_H3a,
                    backgroundColor: ['rgba(255, 206, 86, 0.2)', ],
                    borderColor: ['rgba(255, 206, 86, 1)', ],
                    borderWidth: 1,
                    stack: 'Stack 0',
                },

            ]
        },

    });
}

// time_stemp = the time in wich the action changed!
async function getData(time_stemp = 26) {
    // var x = document.getElementById("secound").value;
    //console.log(secound)

    const xs_action = [];
    //const ys_2_secound = [];
    const ys_H1a = [];
    const ys_H2a = [];
    const ys_H3a = [];

    const response = await fetch('all_data_episode_0.csv');
    const data = await response.text();
    const row = data.split('\n').slice(1);
    row.forEach(elt => {
        const row = elt.split(',');
        const time = row[0];

        if (time == time_stemp) {
            // for the next row:
            H1_Q1 = row[1];
            H1_Q2 = row[2];
            H1_Q3 = row[3];
            H1_Q4 = row[4];
            H1_Q5 = row[5];
            H2_Q1 = row[6];
            H2_Q2 = row[7];
            H2_Q3 = row[8];
            H2_Q4 = row[9];
            H2_Q5 = row[10];
            H3_Q1 = row[11];
            H3_Q2 = row[12];
            H3_Q3 = row[14];
            H3_Q4 = row[14];
            H3_Q5 = row[15];

            choosen_action = parseInt(row[22]);
            if (choosen_action == 1) {
                text_choosen_Action = "left lane";
            }
            if (choosen_action == 2) {
                text_choosen_Action = "idel";
            }
            if (choosen_action == 3) {
                text_choosen_Action = "right lane";
            }
            if (choosen_action == 4) {
                text_choosen_Action = "faster";
            }
            if (choosen_action == 5) {
                text_choosen_Action = "slower";
            }
            document.getElementById('action').innerHTML = text_choosen_Action;
            console.log(choosen_action)
            xs_action.push("left lane", "idel", "right lane", "faster", "slower");
            ys_H1a.push(H1_Q1, H1_Q2, H1_Q3, H1_Q4, H1_Q5)
            ys_H2a.push(H2_Q1, H2_Q2, H2_Q3, H2_Q4, H2_Q5)
            ys_H3a.push(H3_Q1, H3_Q2, H3_Q3, H3_Q4, H3_Q5)


        }


    });
    return {
        xs_action,
        ys_H1a,
        ys_H2a,
        ys_H3a
    };
}