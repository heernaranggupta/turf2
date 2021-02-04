import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  reportTitle: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
    marginVertical: 25,
  },
  greet: {
    fontSize: 10,
    textAlign: "left",
  },
});

const InvoiceThankYouMsg = () => (
  <>
    <View style={{ marginVertical: 25 }}>
      <Text style={styles.greet}>Team Rebounce,</Text>
      <Text style={styles.greet}>Surat</Text>
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>Thank you</Text>
    </View>
  </>
);

export default InvoiceThankYouMsg;
