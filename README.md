# SSL Certificate Checker

## Overview
This is a full-stack web application that checks and validates SSL certificates for given domain names. The application helps users verify the security and validity of SSL certificates used by websites, providing detailed certificate information.

---

## Table of Contents
- [Technologies](#technologies)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Assumptions & Design Decisions](#assumptions--design-decisions)
- [Video Demonstration](#video-demonstration)

---

## Technologies

### **Frontend**:
- **Next.js**: A React-based framework that supports server-side rendering (SSR) for better SEO and performance. The single-page app architecture provides a smooth user experience.
  - **Why Next.js?**: Next.js was chosen for its ability to handle server-side rendering and static page generation, which is crucial for handling API responses efficiently and rendering certificate data quickly.

### **Backend**:
- **Node.js (Express)**: A popular, scalable backend framework that integrates well with Next.js for handling API requests.
  - **Why Node.js?**: Node.js is perfect for asynchronous operations, such as fetching SSL certificates from domains and checking their validity in real-time. It has strong community support and libraries that streamline working with SSL-related tasks.
  
### **SSL Validation Libraries**:
- **`tls`** and **`openssl`**: Node.js built-in libraries for SSL/TLS operations, which make it easy to fetch and validate SSL certificates from domains.
  
---

## Features
### Frontend:
- **Domain Name Input**: An input field for users to submit domain names.
- **Certificate Details Display**: Information about the SSL certificate including:
  - Validity status
  - Expiration date
  - Issuer and Subject details
  - CA validity and chain verification
  - CRL/OCSP status (for revocation checks)
  - Self-signed certificate check
- **Error Handling**: Clear error messages for invalid domain input or network issues.

### Backend:
- **API Endpoint**: An Express-based API that:
  - Fetches SSL certificates for input domains.
  - Validates expiry date and chain of trust.
  - Performs CA checks and domain matching.
  - Checks for certificate revocation (CRL/OCSP).
- **Analytics**: Track invalid certificates and revocation occurrences for further analysis.
  
---

## Setup Instructions

### 1. Clone the Repository:
```bash
git clone https://github.com/sivamani2003/lucid.git
cd client
```

### 2. Install Dependencies:
```bash
npm install
```

### 3. Run the Development Server:
- Start the Next.js app and the backend simultaneously:
```bash
npm run dev
```

### 4. Build for Production:
```bash
npm run build
npm run start
```

### 5. Environment Variables:
Create a `.env.local` file to define any necessary environment variables:
```
NODE_ENV=production
SSL_API_URL=http://localhost:5002/api/check-ssl
```

---

## Usage

- **Submit Domain**: Enter a valid domain (e.g., `example.com`) and click on "Submit."
- **View SSL Details**: The app will fetch and display the SSL certificate details, including whether it's valid, who issued it, and if it's expired or revoked.

---

## Assumptions & Design Decisions

- **Single Page Application (SPA)**: The app is designed as an SPA for a better user experience with Next.js's SSR and optimized rendering.
- **Domain Validity**: Assumes the input is a valid domain and resolves using DNS queries.
- **Real-time Checking**: SSL certificates are fetched and validated in real-time from the input domain.

---


## Video Demonstration

Watch the Loom video demonstration [here](https://www.loom.com/share/0b6245c314e14d6c9b069659c00f9cbf).

In the video, you'll see:
- The user flow from entering a domain to receiving SSL certificate information.
- The backend functionality for fetching and validating certificates.
- Error handling when an invalid domain is submitted.

