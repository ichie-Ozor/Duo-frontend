// import { DatePicker } from "@/components/reuseables/DatePicker";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { _delete, _get, _post } from "@/lib/Helper";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

export default function Note() {
  const [down, setDown] = useState(null);
  const [note, setNote] = useState([]);
  const [newNote, setNewNote] = useState({
    header: "",
    body: "",
    date: "",
  });

  const getNotes = () => {
    _get(
      "admin/getnote",
      (resp) => {
        console.log(resp.resp[0], "notes fetched successfully");
        if (resp.success) {
          setNote(resp.resp[0]);
        }
      },
      (err) => console.error(err.message)
    );
  };
  useEffect(() => {
    getNotes();
  }, []);

  const noteChangeHandler = (e) => {
    console.log(e.target.value, "entries", e.target);
    const { name, value } = e.target;
    setNewNote((prev) => ({
      ...prev,
      [name]: value,
      date: new Date().toISOString().split("T")[0],
    }));
  };

  const sendNoteHandler = (e) => {
    e.preventDefault();
    setNote((prev) => [...prev, newNote]);
    _post("admin/note", newNote, (resp) => {
      console.log(resp, "success");
    }),
      (err) => {
        console.error(err.message);
      };

    setNewNote({
      header: "",
      body: "",
      date: "",
    });
  };

  const toggleExpand = (value) => {
    setDown((prev) => (prev === value ? null : value));
  };

  const deleteHandler = (item) => {
    console.log(item, "item to be deleted clicked");
    if (!item.id) {
      const deletedNote = note.filter((t) => item.header !== t.header);
      setNote(deletedNote);
    } else {
      _delete(
        `admin/deleteNote/${item.id}`,
        null,
        (resp) => console.log(resp, "item deleted successfully"),
        (err) => console.error(err)
      );
      const deletedNote = note.filter((t) => item.id !== t.id);
      setNote(deletedNote);
    }
  };

  const renderNote = note.map((item, index) => {
    return (
      <div
        key={index}
        className="grid grid-cols-2 justify-center place-items-center border-2 border-gray-200 rounded-lg px-4 mb-1"
      >
        <div className="flex justify-center w-full space-x-5">
          <div className="text-lg font-bold">{item.header}</div>
          <div className="text-sm flex items-center">{item.date}</div>
        </div>
        <div>
          {/* <button>Edit</button> */}
          <button onClick={() => deleteHandler(item)}>Delete</button>
        </div>
        <div className="w-full border-[0.5px] border-gray-300 col-span-2"></div>
        {down === index && (
          <div
            // className={`col-span-2 mt-2 ${down ? "hidden" : "block"}`}
            className="col-span-2 mt-2"
          >
            {item.body}
          </div>
        )}
        <div
          className="flex justify-self-center col-span-2 cursor-pointer"
          onClick={() => toggleExpand(index)}
        >
          {down === index ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="36px"
              viewBox="0 -960 960 960"
              width="36px"
              fill="#5f6368"
            >
              <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="36px"
              viewBox="0 -960 960 960"
              width="36px"
              fill="#5f6368"
            >
              <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
            </svg>
          )}
        </div>
      </div>
    );
  });

  return (
    <Card className="p-2 bg-gray-100">
      <Card>
        <CardContent className="">
          <form className="grid grid-cols-6 mt-4" onSubmit={sendNoteHandler}>
            <Input
              placeholder="Enter Note Heading"
              className="col-span-5 bg-gray-50"
              name="header"
              value={newNote.header}
              onChange={noteChangeHandler}
            />
            <Button className="col-span-1">Enter</Button>
            <Textarea
              placeholder="Enter Text Here"
              className="col-span-6 mt-2 bg-gray-50"
              name="body"
              value={newNote.body}
              onChange={noteChangeHandler}
            />
          </form>
        </CardContent>
      </Card>
      <Card className="mt-2">
        <CardContent className="min-h-[67vh] p-2">{renderNote}</CardContent>
      </Card>
    </Card>
  );
}
