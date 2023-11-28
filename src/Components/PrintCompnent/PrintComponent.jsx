import { PDFDownloadLink, Page, Text, View, Document, StyleSheet  } from '@react-pdf/renderer';
import useRole from '../../Hooks/useRole';
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 16,
    textAlign: 'left'
  },
  author: {
    fontSize: 12,
    textAlign: 'left',
    marginTop: 6,
    marginBottom: 6,
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
    fontWeight: 'bold'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
const date = () =>  {
  return <div>
    {new Date()}
  </div>
}

// Create Document Component
const PrintComponent = ({data}) => (
  <Document>
    <Page style={styles.body}>
    <Text style={styles.header} fixed>
        {data?.requesterCompany}
      </Text>
      <Text style={styles.title}>Asset Name: {data.assetName}</Text>
      <Text style={styles.author}>Asset Type: {data.assetType}</Text>
      <Text style={styles.author}>Request Status: {data.status}</Text>
      <Text style={styles.author}>Requested Date: {(new Date(data.requestedDate)).toLocaleDateString()}</Text>
      <Text style={styles.pageNumber}>Print Date: {(new Date()).toLocaleDateString()}</Text>
    </Page>
  </Document>
);


export default PrintComponent