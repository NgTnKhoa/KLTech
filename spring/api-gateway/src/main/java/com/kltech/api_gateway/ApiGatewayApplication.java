package com.kltech.api_gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGatewayApplication {

  public static void main(String[] args) {
    SpringApplication.run(ApiGatewayApplication.class, args);
  }

  @Bean
  public RouteLocator myRoutes(RouteLocatorBuilder builder) {
    return builder.routes()
//        .route("auth-service", r -> r.path("/api/v1/auth/**")
//            .uri("http://authentication-service-app:8080"))
//        .route("product-service", r -> r.path("/api/v1/products/**", "/api/v1/categories/**", "/api/v1/files/**", "/api/v1/reviews/**")
//            .uri("http://product-service-app:8081"))
//        .route("order-service", r -> r.path("/api/v1/orders/**", "/api/v1/payments/**")
//            .uri("http://order-service-app:8082"))
//        .build();
        .route("auth-service", r -> r.path("/api/v1/auth/**", "/api/v1/admin/**")
            .uri("http://localhost:8080"))
        .route("product-service", r -> r.path("/api/v1/products/**", "/api/v1/categories/**", "/api/v1/files/**", "/api/v1/reviews/**")
            .uri("http://localhost:8081"))
        .route("order-service", r -> r.path("/api/v1/orders/**", "/api/v1/payments/**")
            .uri("http://localhost:8082"))
        .build();
  }

}
