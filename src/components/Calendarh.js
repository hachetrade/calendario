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

//import moment from "moment";

//const localizer = momentLocalizer(moment); // or globalizeLocalizer

const Calendarh = () => {
  const [rutinasList, setRutinasList] = useState([]);
  const [rutina, setRutina] = useState({});
  const [openEvent, setOpenEvent] = useState(false);

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
      editable: true,
    })
  );

  const handleEventClick = (id) => {
    const rutina = rutinasList.filter((e) => e._id === id);
    setRutina(rutina);
    setOpenEvent(true);
  };

  const handleEventClose = () => {
    setOpenEvent(false);
  };

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
        events={events}
        eventClick={(info) => handleEventClick(info.event.id)}
      />
      <PopRutina
        handleEventClose={handleEventClose}
        openEvent={openEvent}
        rutina={rutina}
      />
    </Container>
  );
};

export default Calendarh;
