function App() {
  return (
    <>
      <div className="tooltip">
        <p className="tooltipTxt">Hello My Name IS PXi</p>
      </div>
      <div className="canva">
        <div className="circle">
          <div className="ghost">
            <div className="heart"></div>
            <div className="eyes"></div>
            <div className="mouth"></div>
            <div className="left-hand"></div>
            <div className="right-hand"></div>
          </div>
          <div className="legs">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div className="circle4"></div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="task-input">
          <img src="./icon/bars-icon.svg" alt="icon" />
          <input type="text" placeholder="Enter Your Task for Today!" />
        </div>
        <div className="controls">
          <div className="filters">
            <span className="active" id="all">
              All
            </span>
            <span id="pending">Pending</span>
            <span id="Completed">Completed</span>
          </div>
          <button className="clear-btn active">Clear All</button>
        </div>
        <ul className="task-box"></ul>
      </div>
      <p className="legal">&copy; All CopyRights Are Reserved By Shayan</p>
    </>
  );
}

export default App;
