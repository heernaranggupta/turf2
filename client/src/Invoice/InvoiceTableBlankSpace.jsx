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
    color: "white",
  },
  description: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  rate: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: "20%",
  },
});

const InvoiceTableBlankSpace = ({ rowsCount = 0 }) => {
  if (rowsCount < 0) {
    rowsCount = 0;
  }
  const blankRows = Array(rowsCount).fill(0);
  const rows = blankRows.map((x, i) => (
    <View style={styles.row} key={`BR${i}`}>
      <Text style={styles.rate}>-</Text>
      <Text style={styles.rate}>-</Text>
      <Text style={styles.qty}>-</Text>
      <Text style={styles.description}>-</Text>
      <Text style={styles.amount}>-</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableBlankSpace;
