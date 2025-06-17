package com.kltech.authentication_service.repositories;

import com.kltech.authentication_service.entities.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

  Optional<User> findByUsername(String username);

  boolean existsByUsername(String username);

  boolean existsByEmail(String email);

  boolean existsByPhoneNumber(String phoneNumber);
}
