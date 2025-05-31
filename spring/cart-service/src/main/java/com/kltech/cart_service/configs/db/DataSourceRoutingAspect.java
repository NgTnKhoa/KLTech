package com.kltech.cart_service.configs.db;

import java.lang.reflect.Method;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.kltech.cart_service.enums.DataSourceTypes;


@Aspect
@Component
public class DataSourceRoutingAspect {
    @Before("@annotation(org.springframework.transaction.annotation.Transactional)")
    public void routeDataSource(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        Transactional transactional = method.getAnnotation(Transactional.class);
        if(transactional.readOnly()) {
            DataSourceContextHolder.set(DataSourceTypes.SLAVE);
        }

        else {
            DataSourceContextHolder.set(DataSourceTypes.MASTER);
        }
    }

    @After("@annotation(org.springframework.transaction.annotation.Transactional)")
    public void clearDataSource() {
        DataSourceContextHolder.clear();
    }
}
