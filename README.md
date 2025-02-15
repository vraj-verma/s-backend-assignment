# Microservices Setup

## Receiver Application  
The Receiver application is up and running on **port 8001**. To get started:  

1. Install the dependencies:  
    ```bash
    npm i
    ```  
2. Start the development server:  
    ```bash
    npm run start:dev
    ```  

---

## Listener Application  
The Listener application is active on **port 7001**. Follow these steps to run it:  

1. Install all required packages:  
    ```bash
    npm i
    ```  
2. Launch the development server:  
    ```bash
    npm run start:dev
    ```  

---

## Tech Stack  
This project is built using the following technologies:  
- **Node.js** – For building the server-side logic.  
- **NestJS** – As the primary framework for creating modular, maintainable applications.  
- **MongoDB** – Used as the database for storing application data.  
- **RabbitMQ** – For handling asynchronous communication between services.  
- **Redis** – To implement queue for asynchronously delegating tasks and improving performance.   


### Postman 
Here is the postmna collection link:
- **Link** - [Postman Collection](https://www.postman.com/arts-engineers/workspace/assignment/collection/23156241-d2b12c3b-aead-4089-ae11-6f32a0ce1bd4?action=share&creator=23156241)  


