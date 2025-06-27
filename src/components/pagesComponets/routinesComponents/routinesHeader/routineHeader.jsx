

function Header({ title, nickname, intro }) {
  return (
    <div className="routines-header">
      <h2>{title}</h2>
      <p><strong>{nickname}</strong>의 운동일지</p>
      <p>{intro}</p>
    </div>
  );
}

export default Header; 