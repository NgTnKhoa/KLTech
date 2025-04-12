package com.kltech.authenticationservice.auth.configs.db;

import com.kltech.authenticationservice.auth.enums.DataSourceType;
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Documented
@Inherited
public @interface DataSource {

  DataSourceType value() default DataSourceType.MASTER;
}
