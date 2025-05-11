package com.kltech.product_service.configs.db;

import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.datasource.slave")
public class SlaveDataSourceProperties extends DataSourceProperties {
    
}
