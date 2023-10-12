const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-sm-1">
            <i class="bi bi-three-dots-vertical"></i>
          </div>

          {/* Date Panel */}
          <div className="col-sm-10">
            <div className="row">
              <div className="col-sm-1">
                <i class="bi bi-caret-left-fill"></i>
              </div>
              <div className="col-sm-10">
                Date
              </div>
              <div className="col-sm-1">
                <i class="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </div>
          
          <div className="col-sm-1">
            <i className="bi bi-calendar"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header