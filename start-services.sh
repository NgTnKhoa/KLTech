services=("spring/authentication-service" "spring/product-service" "spring/nginx")

for service in "${services[@]}"; do
    cd $service
    docker compose up -d
    cd ..
done