package com.kltech.spring.api.models.dto.requests;

import com.kltech.spring.auth.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

  private String name;

  private String email;

  private String username;

  private String password;

  private String phoneNumber;

  private UserRole role;
}
