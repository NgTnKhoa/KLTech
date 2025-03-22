INSERT INTO users (id, role, name, email, username, password, phone_number, entry_by)
VALUES
    (UUID(), 'ADMIN', 'Nguyễn Văn A', 'nguyenvana@example.com', 'nguyenvana', '$2a$10$0BJvu.L1HBG6bJcUpnlI5eV8IYgx5I2XSmu4wcHqJl.NaWoTkQyp6', '0987654321', NULL),
    (UUID(), 'USER', 'Trần Thị B', 'tranthib@example.com', 'tranthib', '$2a$10$0BJvu.L1HBG6bJcUpnlI5eV8IYgx5I2XSmu4wcHqJl.NaWoTkQyp6', '0912345678', NULL);
