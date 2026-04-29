import React, { useState, useRef } from "react";
import "./CreateNote.css";
import Draggable from "react-draggable";
import CounterButton from "../CounterButton/CounterButton"

function CreateNote() {
  const [InputText, setInputText] = useState("");
  const [notes, setNotes] = useState([]);
  const nodeRefs = useRef({});
  const lastPositions = useRef({});

  const addNote = () => {
    if (InputText.trim() === "") return;
    const id = Date.now();
    const defaultPos = {
      x: Math.random() * 400 + 100,
      y: Math.random() * 200 + 100,
    };

    setNotes([
      ...notes,
      {
        id,
        InputText,
        defaultPos: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 200 + 100,
        },
      },
    ]);
    // create a ref for this new note
    nodeRefs.current[id] = React.createRef();
    lastPositions.current[id] = defaultPos;
    setInputText("");
  };
  
  const handleStop = (e, data, note) =>{
        const currentRect = nodeRefs.current[note.id].current.getBoundingClientRect();

    // Check for overlap with other notes
    const overlapping = notes.some((other) => {
      if (other.id === note.id) return false;
      const otherRect = nodeRefs.current[other.id]?.current?.getBoundingClientRect();
      if (!otherRect) return false;

      const overlap =
        currentRect.left < otherRect.right &&
        currentRect.right > otherRect.left &&
        currentRect.top < otherRect.bottom &&
        currentRect.bottom > otherRect.top;

      return overlap;
    });

    if (overlapping) {
      // Revert to previous position
      const lastPos = lastPositions.current[note.id];
      const el = nodeRefs.current[note.id].current;
      if (el) {
        el.style.transform = `translate(${lastPos.x}px, ${lastPos.y}px)`;
      }
    } else {
      // Update last valid position
      lastPositions.current[note.id] = { x: data.x, y: data.y };
    }

  }

  return (
    <>
      <div className="container">
        <div className="header">
          <input
            type="text"
            placeholder="Please add note"
            value={InputText}
            onChange={(e) => setInputText(e.target.value)}
          ></input>
          <button onClick={addNote}>Add Note</button>
        </div>
         

        <div className="notes-container">
           <div>
          <CounterButton/>
          </div>
          {notes.map((note) => (
            <Draggable
              key={note.id}
              defaultPosition={note.defaultPos}
              nodeRef={nodeRefs.current[note.id]}
              onStop={(e,data)=> handleStop(e,data, note)}
            >
              <div ref={nodeRefs.current[note.id]} className="note">
                <div className="pin"></div>
                <p>{note.InputText}</p>
              </div>
            </Draggable>
          ))}
        </div>
      </div>
    </>
  );
}

export default CreateNote;
