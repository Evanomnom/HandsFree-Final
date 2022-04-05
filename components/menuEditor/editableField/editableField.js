// App.js - Input editable UI

import React, { useRef, useState } from "react";
import Editable from "./editable";

function EditableField() {
  // State for the input
  const inputRef = useRef();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  /*
    Enclose the input element as the children to the Editable component to make it as inline editable.
  */
  return (
    <div><Editable
      text={task}
      placeholder="Write a task name"
      type="input"
      childRef={inputRef}
      thing = {<p>hdsfsfsdssi</p>}
    >
      <input
        type="text"
        ref={inputRef}
        name="task"
        placeholder="Write a task name"
        value={task}
        onChange={e => setTask(e.target.value)}
      />
    </Editable>

    <Editable
  text={description}
  placeholder="Description for the task"
  type="textarea"
  childRef={inputRef}

>
  <textarea
    name="description"
    placeholder="Description for the task"
    rows="5"
    value={description}
    ref={inputRef}
    onChange={e => setDescription(e.target.value)}
  />
</Editable></div>
  );
}

export default EditableField;