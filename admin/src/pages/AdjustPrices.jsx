import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import api from "../config/api";
import { Context } from "../data/context";

const AdjustPrices = () => {
  const [events, setEvents] = useState([]);

  const { token } = useContext(Context);

  const history = useHistory();

  useEffect(() => {
    const endDate = new Date().setMonth(new Date().getMonth() + 6);
    axios
      .get(
        api +
          `admin/config/get_for_month?startDate=${
            new Date().toISOString().split("T")[0]
          }&endDate=${new Date(endDate).toISOString().split("T")[0]}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.body;
        const eventsList = [];
        data.forEach((item) => {
          const date = item.date;

          item.startEndTimeResponseList.forEach((item2) => {
            eventsList.push({
              title: `${item2.turfId} : ₹${item2.price}`,
              description:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate aliquid dignissimos illum incidunt officia temporibus sequi ab numquam ipsam sapiente!",
              start: new Date(`${date} ${item2.startTime}`).toISOString(),
              end: new Date(`${date} ${item2.endTime}`).toISOString(),
              backgroundColor:
                item2.turfId === "turf01"
                  ? "rgba(30,144,255,0.5)"
                  : item2.turfId === "turf02"
                  ? "rgba(240,128,128,0.7)"
                  : "rgba(138,43,226,0.3)",
            });
          });
        });
        setEvents([...eventsList]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <div>
      <Box my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/price/add")}
        >
          New
        </Button>
      </Box>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        dayMaxEvents={5}
        weekends
        selectOverlap={false}
        events={events}
        displayEventEnd
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: false,
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        validRange={{
          start: new Date(),
          end: new Date().setMonth(new Date().getMonth() + 6),
        }}
        // select={(event) => {
        //   console.log(event);
        //   const price = prompt("Enter Amount ?");
        //   setEvents((old) => [
        //     ...old,
        //     {
        //       title: price || "Event Drag",
        //       start: event.startStr,
        //       end: event.endStr,
        //       allDay: event.allDay,
        //     },
        //   ]);
        // }}
      />
    </div>
  );
};

export default AdjustPrices;
