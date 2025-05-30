package com.kltech.authentication_service.controllers;

import com.kltech.authentication_service.models.requests.AuthenticationRequest;
import com.kltech.authentication_service.models.requests.RegisterRequest;
import com.kltech.authentication_service.models.responses.AuthenticationResponse;
import com.kltech.authentication_service.services.IAuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final IAuthenticationService IAuthenticationService;

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
    return ResponseEntity.ok(IAuthenticationService.register(registerRequest));
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
    return ResponseEntity.ok(IAuthenticationService.authenticate(authenticationRequest));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
    IAuthenticationService.refreshToken(request, response);
  }

  @PostMapping("/validate-token")
  public ResponseEntity<Boolean> isTokenValid(@RequestParam String token) {
    return ResponseEntity.ok(IAuthenticationService.isTokenValid(token));
  }
}
