package com.kltech.spring.auth.sevices;

import com.kltech.spring.auth.models.dto.requests.AuthenticationRequest;
import com.kltech.spring.auth.models.dto.requests.RegisterRequest;
import com.kltech.spring.auth.models.dto.responses.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface IAuthenticationService {

  public AuthenticationResponse register(RegisterRequest registerRequest);

  public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);

  void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

  boolean isTokenValid(String token);
}
