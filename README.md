# Blockchain-based Hostel Grievance Redressal System

## Project Overview
The Blockchain-based Hostel Grievance Redressal System is a decentralized platform designed to manage and resolve student complaints in hostels efficiently. Unlike traditional centralized systems, this system uses blockchain technology to ensure transparency, immutability, and accountability. Each complaint is recorded as a blockchain transaction, making it tamper-proof and traceable.

The system allows students to submit complaints digitally, track their status, provide feedback after resolution, and ensures data integrity through blockchain.

---

## Features
- Student Module:
  - Submit complaints with text and image attachments.
  - View complaint status.
  - Provide feedback after resolution.
  - Resubmit the complaint if unsatisfied.

- Admin Module(lower and higher admin):
  - View all complaints.
  - Create,edit,delete announcements
  - Update complaint status (Pending → In Progress → Resolved).
  - View feedbacks

- Blockchain Module:
  - Records all complaints immutably.
  - Ensures tamper-proof storage of complaint history.
  - Supports decentralized verification.

- Security:
  - Authentication using JWT.
  - Data integrity via blockchain.

---

## Tech Stack
Frontend: React.js – Used for building the user interface. 

Backend: Node.js with Express.js – Provides REST APIs for handling requests and server logic. 

Database: MongoDB – Stores user and announcement data. 

Authentication: JWT (JSON Web Token) – Ensures secure user login and session management. 

Blockchain: Ethereum / Solidity – Smart contracts record complaints and their updates on the blockchain. 

