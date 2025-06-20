package com.kltech.authentication_service.models.responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

  private String id;

  private String name;

  private String email;

  private String username;

  private String phoneNumber;

  private String role;
}
