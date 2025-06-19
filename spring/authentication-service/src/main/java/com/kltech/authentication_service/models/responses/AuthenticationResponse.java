package com.kltech.authentication_service.models.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kltech.authentication_service.enums.UserRoles;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

  @JsonProperty("accessToken")
  private String accessToken;

  @JsonProperty("refreshToken")
  private String refreshToken;

  private String id;

  private String username;

  private UserRoles role;
}
