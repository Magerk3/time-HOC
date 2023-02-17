import { useEffect, useState } from "react";

export const withNewDateTime = (WrappedComponent) => {
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