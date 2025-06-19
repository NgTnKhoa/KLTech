package com.kltech.authentication_service.services;

import com.kltech.authentication_service.models.requests.AuthenticationRequest;
import com.kltech.authentication_service.models.requests.RegisterRequest;
import com.kltech.authentication_service.models.responses.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface IAuthenticationService {

  AuthenticationResponse register(RegisterRequest registerRequest);

  AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);

  void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

  boolean isTokenValid(String token);
}
