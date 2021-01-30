import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  description: {
    width: "30%",
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
    paddingRight: 8,
  },
  rate: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "center",
    paddingRight: 8,
  },
  amount: {
    width: "20%",
    textAlign: "center",
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ items = [] }) => {
  const rows = items.map((item, index) => {
    return (
      <View style={styles.row} key={index}>
        <Text style={styles.rate}>{item.bookingId}</Text>
        <Text style={styles.rate}>{item.date}</Text>
        <Text style={styles.qty}>{item.turfId}</Text>
        <Text style={styles.description}>
          {item.startTime + " to " + item.endTime}
        </Text>
        <Text style={styles.amount}>{item.price}</Text>
      </View>
    );
  });
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
