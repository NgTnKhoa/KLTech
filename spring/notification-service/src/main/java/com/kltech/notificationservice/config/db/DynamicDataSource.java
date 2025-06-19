package com.kltech.notificationservice.config.db;

import com.kltech.notificationservice.enums.DataSourceType;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class DynamicDataSource extends AbstractRoutingDataSource {
  @Override
  protected String determineCurrentLookupKey() {
    if (DynamicDataSourceHolder.getDataSource() != null) {
      return DynamicDataSourceHolder.getDataSource();
    }
    return DataSourceType.MASTER.getType();

  }
}
