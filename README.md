# Blood Bank Management System — Full Stack Project  
**Graduation Project — Full Production System**  
Backend (Web API) • Mobile Backend (API) • React Frontend

## Overview
This project is a complete **Blood Bank Management System** consisting of:
- **Web Backend** (`/server`)
- **React Frontend** (`/client`)
- **Mobile Backend** (`/MobAPI`)
All services communicate with a shared **MySQL database** named **Bloodbanksystem**.

## Architecture
(Architecture diagram omitted in plain text)

## Repository Structure
/server  
/client  
/MobAPI  

## Environment Variables
### Web Backend (`/server/.env`)
PORT=3000  
DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=123456  
DB_NAME=Bloodbanksystem  
JWT_SECRET=SuperSecretJWTKey  

### Mobile Backend (`/MobAPI/.env`)
PORT=3003  
DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=123456  
DB_NAME=Bloodbanksystem  
JWT_SECRET=MobileAPITokenSecret  
EMAIL_HOST=smtp.gmail.com  
EMAIL_PORT=587  
EMAIL_USER=example@gmail.com  
EMAIL_PASS=YourEmailPassword  

## Installation
Clone repo then setup each module.

## Running Services
server → npm start  
MobAPI → nodemon app.js  
client → npm start  

## Database
MySQL database named Bloodbanksystem.

## License
ISC
