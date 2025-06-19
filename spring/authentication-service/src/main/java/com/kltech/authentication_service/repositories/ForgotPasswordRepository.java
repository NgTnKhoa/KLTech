package com.kltech.authentication_service.repositories;

import com.kltech.authentication_service.entities.ForgotPassword;
import com.kltech.authentication_service.entities.Token;
import com.kltech.authentication_service.entities.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, String> {

  @Query("select fp from ForgotPassword fp where fp.otp = ?1 and fp.user = ?2")
  Optional<ForgotPassword> findByOtpAndUser(Integer otp, User user);
}
