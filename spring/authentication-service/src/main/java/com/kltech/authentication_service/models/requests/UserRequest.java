package com.kltech.authentication_service.models.requests;

import com.kltech.authentication_service.enums.UserRoles;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

  private String name;

  private String email;

  private String username;

  private String phoneNumber;

  private UserRoles role;
}
