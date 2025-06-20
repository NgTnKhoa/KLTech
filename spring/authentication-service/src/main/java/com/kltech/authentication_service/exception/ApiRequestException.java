package com.kltech.authentication_service.exception;


public class ApiRequestException extends RuntimeException {

  public ApiRequestException(ErrorCode errorCode) {
    super(errorCode.getMessage());
  }

  public ApiRequestException(ErrorCode errorCode, Throwable throwable) {
    super(errorCode.getMessage(), throwable);
  }
}
