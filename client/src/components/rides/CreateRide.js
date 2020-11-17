import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";


class CreateRide extends Component {

    state = {
        date: "",
        startTime: "",
        endTime: ""
    }

    onChange = (value, type) => {

        switch (type) {
            case "startTime":
                this.setState({
                    [type]: value,
                    "endTime": ""
                })
                break;

            default:
                this.setState({
                    [type]: value
                })
                break;
        }
    }

    render() {
        return (
            <div>
                Monkey business<br />
                startTime: {
                    moment(this.state.date).set({
                        hour: moment(this.state.startTime).get("hour"),
                        minute: moment(this.state.startTime).get("minute"),
                        second: moment(this.state.startTime).get("second"),
                    }).toString()
                }<br />
                endTime: {
                    moment(this.state.date).set({
                        hour: moment(this.state.endTime).get("hour"),
                        minute: moment(this.state.endTime).get("minute"),
                        second: moment(this.state.endTime).get("second"),
                    }).toString()
                }

                <div>
                    <DatePicker
                        selected={this.state.date}
                        onChange={newDate => this.onChange(newDate, "date")}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Insira uma data"
                        minDate={new Date()}
                    />
                    <DatePicker
                        selected={this.state.startTime}
                        onChange={newStartTime => this.onChange(newStartTime, "startTime")}
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        showTimeSelect
                        showTimeSelectOnly
                        timeCaption="Hora"
                        placeholderText="Insira uma hora inicial"
                    />
                    <DatePicker
                        selected={this.state.endTime}
                        onChange={newEndTime => this.onChange(newEndTime, "endTime")}
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        showTimeSelect
                        showTimeSelectOnly
                        timeCaption="Hora"
                        placeholderText="Insira uma hora final"
                        minTime={this.state.startTime ? moment(this.state.startTime).add(15, "minutes").toDate() : moment().add(15, "minutes").toDate()}
                        maxTime={this.state.startTime ? moment(this.state.startTime).endOf("day").toDate() : moment().endOf("day").toDate()}
                        disabled={!this.state.startTime}
                    />
                </div>
            </div>
        );
    }
}

export default CreateRide;