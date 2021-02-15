import React, { useEffect, useContext, useCallback, useState } from "react";
import {
  Page,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Link } from "react-router-dom";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import axios from "axios";
import api from "../config/api";
import { Context } from "../data/context";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const PrintInvoice = ({ match }) => {
  const [invoiceData, setInvoiceData] = useState({});
  const [showError, setShowError] = useState(false);
  const orderId = match?.params?.id;

  const { userData, token } = useContext(Context);

  const fetchData = useCallback(() => {
    if (orderId) {
      setShowError(false);
      axios
        .get(api + "common/order/slot-list?orderId=" + orderId, {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const InvoiceData = {
            id: orderId || "",
            invoice_no: orderId || "",
            company: userData.name || "",
            email: userData.emailId || "",
            phone: userData.phoneNumber || "",
            address: "",
            date: res.data?.body[0]?.timestamp || "",
            items: res.data.body || [],
          };
          setInvoiceData(InvoiceData);
        })
        .catch((err) => {
          console.log(err.message);
          setShowError(true);
        });
    }
  }, [orderId, userData, token]);

  useEffect(() => {
    if (showError === false) {
      document.querySelector(".navbar").style.display = "none";
    } else {
      document.querySelector(".navbar").style.display = "flex";
    }
    fetchData();
    return () => {
      try {
        document.querySelector(".navbar").style.display = "flex";
      } catch (error) {}
    };
  }, [fetchData, showError]);

  if (showError) {
    return (
      <div className="container mt-6">
        <div className="columns">
          <div className="column"></div>
          <div className="column">
            <div className="column card">
              <div className="card-content">
                <p className="title has-text-centered">Invalid Invoice Id</p>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item is-clickable">
                  <Link to="/">Home</Link>
                </p>
                <p className="card-footer-item is-clickable">
                  <Link to="/profile">Profile</Link>
                </p>
              </footer>
            </div>
          </div>
          <div className="column"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4" style={styles.page}>
              {/* <Image style={styles.logo} src="" /> */}
              <InvoiceTitle title="INVOICE" />
              <InvoiceNo invoice={invoiceData} />
              <BillTo invoice={invoiceData} />
              <InvoiceItemsTable invoice={invoiceData} />
              <InvoiceThankYouMsg />
            </Page>
          </Document>
        }
        fileName={"Rebounce_Invoice_" + orderId + ".pdf"}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <div className="is-flex align-content is-justify-content-center m-6">
              <button className="button is-link">Download Invoice</button>
            </div>
          )
        }
      </PDFDownloadLink>

      <PDFViewer height={window.innerHeight} width={window.innerWidth}>
        <Document>
          <Page size="A4" style={styles.page}>
            {/* <Image style={styles.logo} src="" /> */}
            <InvoiceTitle title="INVOICE" />
            <InvoiceNo invoice={invoiceData} />
            <BillTo invoice={invoiceData} />
            <InvoiceItemsTable invoice={invoiceData} />
            <InvoiceThankYouMsg />
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PrintInvoice;
