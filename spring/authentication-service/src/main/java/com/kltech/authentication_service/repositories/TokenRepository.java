package com.kltech.authentication_service.repositories;

import com.kltech.authentication_service.entities.Token;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<Token, String> {

  @Query("""
      select t from Token t inner join User u on t.user.id = u.id
      where u.id = :userId and (t.expired = false or t.revoked = false)
      """)
  List<Token> findAllValidTokensByUser(String userId);

  Optional<Token> findByToken(String token);

  boolean existsByToken(String token);
}
