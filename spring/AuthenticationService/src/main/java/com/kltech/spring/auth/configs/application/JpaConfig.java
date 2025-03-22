package com.kltech.spring.auth.configs.application;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.kltech.spring")
public class JpaConfig {
}
