# KLTech Project
## Description

An ecommerce platform using microservices architecture.

This platform is designed to facilitate online shopping by dividing its functionalities into smaller, independently deployable services. Each microservice is responsible for a specific business capability, such as product catalog, inventory management, user authentication, order processing, payment handling, and customer support. This architecture allows for scalability, flexibility, and easier maintenance, as each service can be developed, deployed, and scaled independently.

Before running Docker Compose, you need to create a network named `kltech-network` using the following command:

```bash
docker network create kltech-network
```

