import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActivePlayer,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={() => handleNameChange(event)}
      ></input>
    );
  }

  return (
    <li className={isActivePlayer ? "active" : undefined}>
      <span id="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => handleEditClick()}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
