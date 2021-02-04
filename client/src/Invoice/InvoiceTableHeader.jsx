import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
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

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.rate}>Booking Id</Text>
    <Text style={styles.rate}>Date</Text>
    <Text style={styles.qty}>Ground</Text>
    <Text style={styles.description}>Slots</Text>
    <Text style={styles.amount}>Amount</Text>
  </View>
);

export default InvoiceTableHeader;
