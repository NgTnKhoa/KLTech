package com.kltech.authenticationservice.auth.configs.db;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class DataSourceAspect {

  @Before(value = "@annotation(dataSource)")
  public void dataSourcePoint(JoinPoint joinPoint, DataSource dataSource) {
    DynamicDataSourceHolder.putDataSource(dataSource.value());
  }
}
