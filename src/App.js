import React, { useState } from "react";
import { VideoList } from "./components/VideoList";
import { listData } from "./list";
import "./App.css";



export default function App() {
    const [list, setList] = useState(listData);
    return <VideoList list={list} />;
}
