export default function Log({ logData }) {
  return (
    <ol id="log">
      {logData.map((turn, index) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
