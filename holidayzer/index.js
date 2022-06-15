import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

server.get("/holidays", (req, res) => {
    res.send(holidays)
});

server.get("/is-today-holiday", (req, res) => {
    const today = new Date();
    let message = "Não, hoje não é feriado";
    for (let i = 0 ; i < holidays.length ; i++) {
        if (today.toLocaleDateString() === holidays[i].date) {
            message = `Sim, hoje é ${holidays[i].name}`; 
        }
    }
    res.send(message);
});

server.get("/holidays/:month", (req, res) => {
    const month = req.params.month;
    const holidayMonth = [];
    for (let i = 0 ; i < holidays.length ; i++) {
        if (holidays[i].date.slice(0, 2).includes("/")) {
            if (holidays[i].date.slice(0, 1) === month) {
                holidayMonth.push(holidays[i]);
            }
        } else {
            if (holidays[i].date.slice(0, 2) === month) {
                holidayMonth.push(holidays[i]);
            }
        }
    }
    res.send(holidayMonth);
})

server.listen(4000);