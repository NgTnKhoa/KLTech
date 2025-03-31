# KLTech Project
## Description

An ecommerce platform using microservices architecture.

This platform is designed to facilitate online shopping by dividing its functionalities into smaller, independently deployable services. Each microservice is responsible for a specific business capability, such as product catalog, inventory management, user authentication, order processing, payment handling, and customer support. This architecture allows for scalability, flexibility, and easier maintenance, as each service can be developed, deployed, and scaled independently.

Before running Docker Compose, you need to create a network named `kltech-network` using the following command:

```bash
docker network create kltech-network
```

# Đặc biệt lưu ý:
# MySQL Replication Setup in Docker

## **1. Chạy Master Database**

Trước tiên, chạy **master_db** bằng Docker Compose:
```sh
cd /path/to/project/root
docker-compose up -d --build
```

## **2. Lấy Binary Log Position**

Sau khi **master_db** đã chạy, truy cập vào container:
```sh
docker exec -it master_db mysql -uroot -p
```

Chạy lệnh sau để lấy thông tin replication:
```sql
SHOW MASTER STATUS;
```
**Kết quả sẽ hiển thị:**
```
+------------------+----------+
| File            | Position |
+------------------+----------+
| mysql-bin.000003 | 684      |
+------------------+----------+
```
Ghi lại giá trị **File** (`mysql-bin.000003`) và **Position** (`684`).

## **3. Cấu hình Slave Database**

Trong `docker-compose.yml` của từng service (**ví dụ: authentication-service**), cấu hình Slave với thông tin lấy từ Master.

Ví dụ:
```yaml
command: --server-id=2
```

## **4. Cấu hình server_id**

- Mỗi server (**Master, Slave**) phải có `server-id` **khác nhau**.
- Thêm vào file cấu hình MySQL (`my.cnf`):

### **Trên Master (`master_db`):**
```ini
[mysqld]
server-id=1
log-bin=mysql-bin
binlog_format=row
bind-address=0.0.0.0
```

### **Trên mỗi Slave:**
```ini
[mysqld]
server-id=2  # Đổi giá trị này với mỗi Slave
relay_log=relay-bin
```

Sau khi chỉnh sửa, **exec vào container** và thay đổi quyền file:
```sh
docker exec -it authentication-service-db chmod 644 /etc/mysql/my.cnf
```

## **5. Khởi động lại Slave và kết nối đến Master**

Trên Slave:
```sh
docker-compose up -d authentication-service-db
```

Sau đó, vào MySQL trên Slave:
```sh
docker exec -it authentication-service-db mysql -uroot -p
```

Thiết lập replication:
```sql
CHANGE REPLICATION SOURCE TO
    SOURCE_HOST='master_db',
    SOURCE_USER='replica',
    SOURCE_PASSWORD='1234567890@123',
    SOURCE_LOG_FILE='mysql-bin.000003',  -- Thay bằng giá trị từ bước 2
    SOURCE_LOG_POS=684;                  -- Thay bằng giá trị từ bước 2

START REPLICA;
```

## **6. Kiểm tra Trạng thái Replication**

Trên Slave, chạy:
```sql
SHOW SLAVE STATUS\G;
```
Nếu thấy:
- `Slave_IO_Running: Yes`
- `Slave_SQL_Running: Yes`

Thì replication **đã hoạt động thành công!** 🎉



