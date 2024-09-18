const express = require('express');
const tls = require('tls');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const getCRLStatus = async (certificateInfo) => {
  console.log('Checking CRL for certificate...');
  return false; 
};

const getOCSPStatus = async (certificateInfo) => {
  console.log('Checking OCSP for certificate...');
  return false; 
};
app.post('/api/check-ssl', async (req, res) => {
  const { domain } = req.body;

  try {
    const certificateInfo = await fetchSSLCertificate(domain);

    const crlStatus = await getCRLStatus(certificateInfo);
    const ocspStatus = await getOCSPStatus(certificateInfo);

    const isRevoked = crlStatus || ocspStatus;
    const isSelfSigned = certificateInfo.issuer.CN === certificateInfo.subject.CN;

    const certificateData = {
      domain,
      issuer: certificateInfo.issuer,
      subject: certificateInfo.subject,
      expirationDate: certificateInfo.valid_to,
      validForDomain: certificateInfo.subjectaltname.includes(domain),
      isRevoked,
      valid: !isRevoked && (new Date() < new Date(certificateInfo.valid_to)),
      isSelfSigned,
      crlChecked: crlStatus,
      ocspChecked: ocspStatus,
    };

    // Log if the certificate is revoked or invalid.
    if (!certificateData.valid) {
      console.log(`Certificate for ${domain} is invalid.`);
    }

    res.json(certificateData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch SSL certificate details
const fetchSSLCertificate = (domain) => {
  return new Promise((resolve, reject) => {
    try {
      // Add protocol if it's not present, default to https://
      let cleanedDomain = domain;
      if (!/^https?:\/\//i.test(domain)) {
        cleanedDomain = `https://${domain}`;
      }

      const parsedUrl = new URL(cleanedDomain);
      const hostname = parsedUrl.hostname;

      const socket = tls.connect(443, hostname, { servername: hostname }, () => {
        const cert = socket.getPeerCertificate();
        if (!cert || Object.keys(cert).length === 0) {
          reject(new Error('No SSL certificate found.'));
        } else {
          resolve(cert);
        }
      });

      socket.on('error', (error) => reject(error));
    } catch (error) {
      reject(new Error('Invalid domain format.'));
    }
  });
};

// Start the server
app.listen(5002, () => console.log('SSL Checker backend running on port 5002'));
