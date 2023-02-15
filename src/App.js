import React, { useEffect, useState } from "react";
import "./App.css";

const withNewDateTime = (WrappedComponent) => {
    return (props) => {
        const [differenceInDays, setDifferenceInDays] = useState();
        const [differenceInHours, setDifferenceInHours] = useState();
        const [differenceInMinutes, setDifferenceInMinutes] = useState();

        useEffect(() => {
            function setDifference() {
                const now = new Date();
                const videoDate = new Date(props.date);
                const difference = now.getTime() - videoDate.getTime();
                const inDays = difference / (36 * 10 ** 5) / 24;
                const inHours = inDays * 24;
                const inMinutes = inHours * 60;
                setDifferenceInDays(inDays);
                setDifferenceInHours(inHours);
                setDifferenceInMinutes(inMinutes);
            }
            if (differenceInMinutes === undefined) setDifference();
            else {
                const intervalId = setInterval(() => {
                    setDifference();
                }, 1000 * 20);
                return () => clearInterval(intervalId);
            }
        });

        return (
            <WrappedComponent
                date={
                    differenceInHours >= 24
                        ? Math.floor(differenceInDays) + " дней назад"
                        : differenceInMinutes >= 60
                        ? Math.floor(differenceInHours) + " часов назад"
                        : Math.floor(differenceInMinutes) + " минут назад"
                }
            />
        );
    };
};
const DateTimePretty = withNewDateTime(DateTime);

function DateTime(props) {
    return <p className="date">{props.date}</p>;
}

function Video(props) {
    return (
        <div className="video">
            <iframe
                src={props.url}
                frameborder="0"
                allow="autoplay; encrypted-media"
                title="#"
                allowfullscreen
            ></iframe>
            <DateTimePretty date={props.date} />
        </div>
    );
}

function VideoList(props) {
    return props.list.map((item) => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
            date: "2023-02-14 13:24:00",
        },
        {
            url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
            date: "2023-02-15 7:10:00",
        },
        {
            url: "https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0",
            date: "2023-02-15 7:50:00",
        },
        {
            url: "https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0",
            date: "2022-01-03 12:10:00",
        },
        {
            url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
            date: "2022-01-01 16:17:00",
        },
        {
            url: "https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0",
            date: "2022-12-02 05:24:00",
        },
    ]);
    return <VideoList list={list} />;
}
