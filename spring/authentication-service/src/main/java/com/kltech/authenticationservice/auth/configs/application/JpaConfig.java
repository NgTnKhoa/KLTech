package com.kltech.authenticationservice.auth.configs.application;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.kltech.authenticationservice")
public class JpaConfig {
}
