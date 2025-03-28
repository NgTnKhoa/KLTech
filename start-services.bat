@echo off
setlocal enabledelayedexpansion

:: Danh sách các dịch vụ
set services[0]=spring/authentication-service
set services[1]=spring/product-service
set services[2]=spring/nginx

:: Lặp qua các dịch vụ và khởi động chúng
for /L %%i in (0,1,2) do (
    set service=!services[%%i]!
    echo Starting !service!...
    cd !service!
    docker compose up -d
    cd ..
)

echo All services started.
pause
