package com.kltech.order_service.configs.db;

import com.kltech.order_service.enums.DataSourceTypes;

public class DataSourceContextHolder {
    private static final ThreadLocal<DataSourceTypes> contextHolder = new ThreadLocal<>();

    public static void set(DataSourceTypes type) {
        contextHolder.set(type);
    }

    public static DataSourceTypes get() {
        return contextHolder.get() == null ? DataSourceTypes.MASTER : contextHolder.get();
    }

    public static void clear() {
        contextHolder.remove();
    }
}
