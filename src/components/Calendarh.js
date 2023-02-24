import React from "react";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
//import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interaction from "@fullcalendar/interaction";
//import { formatRange } from "@fullcalendar/core";
import { Container } from "@mui/material";
import PopRutina from "./PopRutina";
import NewRutina from "./NewRutina";

//import moment from "moment";

//const localizer = momentLocalizer(moment); // or globalizeLocalizer

const rutineUrl = "http://localhost:3000/Rutinas?id=";

const Calendarh = () => {
  const [rutinasList, setRutinasList] = useState([]);
  const [rutina, setRutina] = useState({});
  const [openEvent, setOpenEvent] = useState(false);
  const [openNewRutina, setOpenNewRutina] = useState(false);
  const [dateNewRutina, setDateNewRutina] = useState(new Date());

  useEffect(() => {
    getMeassures();
  }, []);

  const getMeassures = () => {
    fetch("http://localhost:3000/rutinas/")
      .then((res) => res.json())
      .then((data) => {
        setRutinasList(data);
      })
      .catch((err) => console.log("error", err));
  };
  let events = [];
  rutinasList.map((ob) =>
    events.push({
      id: ob._id,
      title: ob.name,
      start: ob.day,
      allDay: true,
      editable: false,
    })
  );

  const handleEventClick = (id) => {
    const rutina = rutinasList.filter((e) => e._id === id).pop();
    setRutina(rutina);
    setOpenEvent(true);
  };

  const handleEventClose = () => {
    setOpenEvent(false);
    setRutina({});
  };

  const handleDateClick = (date) => {
    setDateNewRutina(date);
    setOpenNewRutina(true);
  };

  const handleNewRutinaClose = () => {
    setOpenNewRutina(false);
  };

  async function putDropEvent(id, date) {
    return await fetch(`${rutineUrl}${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ day: date }),
    })
      .then((res) => (res = res.json()))
      .then(getMeassures())

      .catch((error) => console.log("Error:", error));
  }

  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, interaction, timeGridPlugin, listPlugin]}
        headerToolbar={{
          start: "today",
          center: "title",
          end: "prev,next",
        }}
        height={"85vh"}
        initialView='dayGridMonth'
        editable='false'
        events={events}
        eventClick={(info) => handleEventClick(info.event.id)}
        dateClick={(info) => handleDateClick(info.dateStr)}
        eventDrop={(info) => putDropEvent(info.event.id, info.event.start)}
      />
      <PopRutina
        handleEventClose={handleEventClose}
        openEvent={openEvent}
        rutina={rutina}
      />
      <NewRutina
        handleNewRutinaClose={handleNewRutinaClose}
        openNewRutina={openNewRutina}
        dateNewRutina={dateNewRutina}
      />
    </Container>
  );
};

export default Calendarh;
