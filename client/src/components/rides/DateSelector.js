import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import PropTypes from "prop-types";


import "react-datepicker/dist/react-datepicker.css";


class DateSelector extends Component {

    state = {
        date: "",
        startTime: "",
        endTime: ""
    }

    static propTypes = {
        ride: PropTypes.func.isRequired
    }

    onChange = (value, type) => {

        switch (type) {
            case "startTime":
                this.setState({
                    [type]: value,
                    "endTime": ""
                }, () => this.props.setDates(this.state.date, this.state.startTime, this.state.endTime))
                break;

            default:
                this.setState({
                    [type]: value
                }, () => this.props.setDates(this.state.date, this.state.startTime, this.state.endTime))
                break;
        }
    }

    render() {
        return (
            <div>
                <h2>Seleccione uma data e hora para a sua boleia:</h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        <DatePicker
                            selected={this.state.date}
                            onChange={newDate => this.onChange(newDate, "date")}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Insira uma data"
                            minDate={new Date()}
                        />
                    </div>
                    <div style={{ marginLeft: "7em" }}>
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
                    </div>
                    <div style={{ marginLeft: "7em" }}>
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
            </div>
        );
    }
}

export default DateSelector;