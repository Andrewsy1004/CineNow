
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#1a202c",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#4a5568",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    minHeight: 35,
    alignItems: "center",
  },
  tableHeaderRow: {
    backgroundColor: "#f7fafc",
  },
  tableCol: {
    width: "16.6%",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
  },
  tableCell: {
    fontSize: 10,
    color: "#4a5568",
  },
  tableHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2d3748",
  },
  total: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "right",
    color: "#2d3748",
  }
});

export const PdfDocumentEstadisticas = ({ data, totalDinero }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Historial de Compras</Text>
        <Text style={styles.subtitle}>Resumen de tus compras de entradas</Text>
        
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>ID</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Película</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Entradas</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Fecha</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Total</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeader}>Sala</Text>
            </View>
          </View>
          
          {data.map((compra) => (
            <View key={compra.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{compra.id}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{compra.nombre}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{compra.cantidad}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{compra.dia}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>${compra.precio.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{compra.sala}</Text>
              </View>
            </View>
          ))}
        </View>
        
        <Text style={styles.total}>Total de dinero: ${totalDinero}</Text>
      </Page>
    </Document>
  );
};