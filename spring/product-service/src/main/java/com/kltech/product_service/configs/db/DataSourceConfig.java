package com.kltech.product_service.configs.db;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.kltech.product_service.enums.DataSourceTypes;

@EnableTransactionManagement
@Configuration
public class DataSourceConfig {
    @Bean
    public DataSource masterDataSource(MasterDataSourceProperties masterProps) {
        return masterProps.initializeDataSourceBuilder().build();
    }

    @Bean
    public DataSource slaveDataSource(SlaveDataSourceProperties slaveProps) {
        return slaveProps.initializeDataSourceBuilder().build();
    }

    @Primary
    @Bean
    public DataSource routingDataSource(
        @Qualifier("masterDataSource") DataSource masterDataSource, 
        @Qualifier("slaveDataSource") DataSource slaveDataSource
    ) {
        Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put(DataSourceTypes.MASTER, masterDataSource);
        targetDataSources.put(DataSourceTypes.SLAVE, slaveDataSource);
        RoutingDataSource dataSource = new RoutingDataSource();
        dataSource.setDefaultTargetDataSource(masterDataSource);
        dataSource.setTargetDataSources(targetDataSources);
        return dataSource;
    }
}
