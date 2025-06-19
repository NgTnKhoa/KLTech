package com.kltech.authentication_service.controllers;

import com.kltech.authentication_service.entities.ForgotPassword;
import com.kltech.authentication_service.entities.User;
import com.kltech.authentication_service.models.requests.ChangePassword;
import com.kltech.authentication_service.models.requests.UserRequest;
import com.kltech.authentication_service.models.responses.UserResponse;
import com.kltech.authentication_service.repositories.ForgotPasswordRepository;
import com.kltech.authentication_service.repositories.UserRepository;
import com.kltech.authentication_service.services.IUserService;
import com.kltech.authentication_service.services.impls.EmailService;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth/forgot-password")
@RequiredArgsConstructor
public class ForgotPasswordController {

  private final UserRepository userRepository;
  private final EmailService emailService;
  private final ForgotPasswordRepository forgotPasswordRepository;
  private final PasswordEncoder passwordEncoder;

  @PostMapping("/verify/{email}")
  public ResponseEntity<String> verifyEmail(@PathVariable("email") String email) {
    User user = userRepository.findByEmail(email);
    if (user == null) {
      throw new UsernameNotFoundException("Làm ơn cung cấp email hợp lệ");
    } else {
      int otp = otpGenerator();

      ForgotPassword forgotPassword = ForgotPassword.builder()
          .otp(otp)
          .expirationDate(new Date(System.currentTimeMillis() + 70 * 1000))
          .user(user)
          .build();

      emailService.sendEmail(email, "OTP cho yêu cầu quên mật khẩu", "Đây là OTP cho yêu cầu quên mật khẩu của bạn: " + otp);

      forgotPasswordRepository.save(forgotPassword);

      return ResponseEntity.ok("Email cho yêu cầu quên mật khẩu đã được gửi");
    }
  }

  @PostMapping("/verify-otp/{otp}/{email}")
  public ResponseEntity<String> verifyOtp(@PathVariable("otp") Integer otp, @PathVariable("email") String email) {
    User user = userRepository.findByEmail(email);

    if (user == null) {
      throw new UsernameNotFoundException("Làm ơn cung cấp email hợp lệ");
    } else {
      ForgotPassword forgotPassword = forgotPasswordRepository.findByOtpAndUser(otp, user).orElseThrow(() -> new RuntimeException("OTP không hợp lệ cho email: " + email));

      if (forgotPassword.getExpirationDate().before(Date.from(Instant.now()))) {
        forgotPasswordRepository.deleteById(forgotPassword.getId());
        return new ResponseEntity<>("OTP đã hết hạn", HttpStatus.EXPECTATION_FAILED);
      }

      return ResponseEntity.ok("OTP hơp lệ");
    }
  }

  @PostMapping("/change-password/{email}")
  public ResponseEntity<String> changePassword(@PathVariable("email") String email, @RequestBody ChangePassword changePassword) {
    if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
      return new ResponseEntity<>("Làm ơn nhập lại mật khẩu", HttpStatus.EXPECTATION_FAILED);
    }

    String encodedPassword = passwordEncoder.encode(changePassword.password());
    userRepository.updatePassword(email, encodedPassword);

    return ResponseEntity.ok("Mật khẩu đã được đổi thành công");
  }

  private Integer otpGenerator() {
    Random random = new Random();
    return random.nextInt(100_000, 999_999);
  }
}
