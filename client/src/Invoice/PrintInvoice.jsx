import React, { useEffect, useContext, useCallback, useState } from "react";
import {
  Page,
  Document,
  Image,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import { invoiceData as invoice } from "../data/invoice";
import axios from "axios";
import api from "../config/api";
import headerWithToken from "../config/headerWithToken";
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
  const orderId = match?.params?.id;

  const { userData } = useContext(Context);

  const fetchData = useCallback(() => {
    if (orderId) {
      axios
        .get(api + "common/order/slot-list?orderId=" + orderId, headerWithToken)
        .then((res) => {
          console.log("invoice", res.data);
          const InvoiceData = {
            id: orderId,
            invoice_no: orderId,
            company: userData.name,
            email: userData.emailId,
            phone: userData.phoneNumber,
            address: "",
            date: res.data?.body[0]?.timestamp || "",
            items: res.data.body || [],
          };
          setInvoiceData(InvoiceData);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [orderId, userData]);

  useEffect(() => {
    document.querySelector(".navbar").style.display = "none";
    fetchData();
  }, [fetchData]);

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
        fileName="somename.pdf"
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
