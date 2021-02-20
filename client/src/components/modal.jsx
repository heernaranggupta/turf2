import { createPortal } from 'react-dom';
import React, { useContext, useState } from "react";
import classnames from "classnames";

const Modal = ({model,notAvaliableSlots,setModel}) =>{
    return(
        createPortal(<div className={classnames("modal", model ? "is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">You have too remove this slots</p>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <table className="table">
                <thead>
                  <tr>
                    <th><abbr title="Goals for">Ground</abbr></th>
                    <th><abbr title="Played">Date</abbr></th>
                    <th><abbr title="Won">Start Time</abbr></th>
                    <th><abbr title="Drawn">End Time</abbr></th>
                    <th><abbr title="Lost">Total</abbr></th>
                  </tr>
                </thead>
                <tbody>
                {notAvaliableSlots &&
                          notAvaliableSlots.map((item, index) => (
                  <tr key={index}>
                    <td>{item.turfId}</td>
                    <td>{item.date}</td>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
                  </tbody>
              </table>
            </div>
          </section>
          <footer className="modal-card-foot">
          <button className="button" onClick={() => {
              setModel(false)
              }}>Cancel</button>
            <button className="button is-danger" onClick={() => {
              setModel(false)
              window.location.reload();
              }}>Delete All</button>
          </footer>
        </div>
      </div>
     ,document.getElementById("modal-root"))
    )

}
export default Modal;