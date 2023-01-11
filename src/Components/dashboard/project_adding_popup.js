import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import firebase from "firebase/compat/app";

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h1> Add Project </h1>
          <div className="subpopinner">
            <TextField
              id="outlined-basic"
              value={this.props.obj.proinfo.name}
              onChange={(e) => {
                this.props.obj.setproinfo({
                  name: e.target.value,
                  description: this.props.obj.proinfo.description,
                  techstack: this.props.obj.proinfo.techstack,
                });
              }}
              label="Name of project"
              variant="filled"
            />
          </div>
          <div className="subpopinner">
            <TextareaAutosize
              maxRows={4}
              value={this.props.obj.proinfo.description}
              onChange={(e) => {
                this.props.obj.setproinfo({
                  name: this.props.obj.proinfo.name,
                  techstack: this.props.obj.proinfo.techstack,
                  description: e.target.value,
                });
              }}
              aria-label="maximum height"
              placeholder="Description"
              defaultValue=""
              style={{ width: 200, height: 150 }}
            />
          </div>
          <div className="subpopinner">
            <TextareaAutosize
              maxRows={4}
              aria-label="maximum height"
              placeholder="Tech-stack (Enter by comma saperated)"
              defaultValue=""
              value={this.props.obj.proinfo.techstack}
              onChange={(e) => {
                this.props.obj.setproinfo({
                  description: this.props.obj.proinfo.description,
                  name: this.props.obj.proinfo.name,
                  techstack: e.target.value,
                });
              }}
              style={{ width: 200, height: 150 }}
            />
          </div>
          <div className="but">
            <button
              className="submitformforadd"
              onClick={() => {
                this.props.obj.handlesubmit();
                this.props.closePopup();
              }}
            >
              Submit
            </button>
            <button
              className="submitformforadd"
              onClick={this.props.closePopup}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false,
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  render() {
    return (
      <div className="app">
        <button onClick={this.togglePopup.bind(this)}>
          {" "}
          <AddCircleOutlineIcon />
        </button>

        {this.state.showPopup ? (
          <Popup
            text="Close Me"
            closePopup={this.togglePopup.bind(this)}
            obj={this.props}
          />
        ) : null}
      </div>
    );
  }
}
