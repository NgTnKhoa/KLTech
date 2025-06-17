package com.kltech.authentication_service.services.impls;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kltech.authentication_service.configs.security.JwtService;
import com.kltech.authentication_service.enums.TokenTypes;
import com.kltech.authentication_service.enums.UserRoles;
import com.kltech.authentication_service.entities.Token;
import com.kltech.authentication_service.entities.User;
import com.kltech.authentication_service.models.requests.AuthenticationRequest;
import com.kltech.authentication_service.models.requests.RegisterRequest;
import com.kltech.authentication_service.models.responses.AuthenticationResponse;
import com.kltech.authentication_service.repositories.TokenRepository;
import com.kltech.authentication_service.repositories.UserRepository;
import com.kltech.authentication_service.services.IAuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {

  private final UserRepository userRepository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  @Override
  public AuthenticationResponse register(RegisterRequest registerRequest) {
    if (userRepository.existsByEmail(registerRequest.getEmail())) {
      throw new RuntimeException("Email đã tồn tại");
    } else if (userRepository.existsByUsername(registerRequest.getUsername())) {
      throw new RuntimeException("Username đã tồn tại");
    } else if (userRepository.existsByPhoneNumber(registerRequest.getPhoneNumber())) {
      throw new RuntimeException("Số điện thoại đã tồn tại");
    }

    User user = User.builder()
        .name(registerRequest.getName())
        .email(registerRequest.getEmail())
        .username(registerRequest.getUsername())
        .password(passwordEncoder.encode(registerRequest.getPassword()))
        .phoneNumber(registerRequest.getPhoneNumber())
        .role(UserRoles.valueOf(registerRequest.getRole()))
        .build();

    User savedUser = userRepository.save(user);
    String jwtToken = jwtService.generateToken(user);
    String refreshToken = jwtService.generateRefreshToken(user);

    saveUserToken(savedUser, jwtToken);

    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
        .refreshToken(refreshToken)
        .id(savedUser.getId())
        .username(user.getUsername())
        .role(UserRoles.valueOf(registerRequest.getRole()))
        .build();
  }

  @Override
  public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            authenticationRequest.getUsername(),
            authenticationRequest.getPassword()
        )
    );

    User user = userRepository.findByUsername(authenticationRequest.getUsername())
        .orElseThrow(() -> new RuntimeException("Sai username hoặc mật khẩu"));
    String jwtToken = jwtService.generateToken(user);
    String refreshToken = jwtService.generateRefreshToken(user);

    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);

    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
        .refreshToken(refreshToken)
        .id(user.getId())
        .username(user.getUsername())
        .role(user.getRole())
        .build();
  }

  private void saveUserToken(User savedUser, String jwtToken) {
    Token token = Token.builder()
        .user(savedUser)
        .token(jwtToken)
        .tokenTypes(TokenTypes.BEARER)
        .expired(false)
        .revoked(false)
        .build();

    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    List<Token> validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());

    if (validUserTokens.isEmpty()) {
      return;
    }

    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });

    tokenRepository.saveAll(validUserTokens);
  }

  @Override
  public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String username;

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return;
    }

    refreshToken = authHeader.substring(7);
    username = jwtService.extractUsername(refreshToken);

    if (username != null) {
      User user = userRepository.findByUsername(username)
          .orElseThrow();

      if (jwtService.isTokenValid(refreshToken, user)) {
        String accessToken = jwtService.generateToken(user);

        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);

        AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();

        new ObjectMapper().writeValue(response.getOutputStream(), authenticationResponse);
      }
    }
  }

  @Override
  public boolean isTokenValid(String token) {
    return tokenRepository.existsByToken(token);
  }
}
