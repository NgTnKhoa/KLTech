package com.kltech.authenticationservice.api.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.kltech.authenticationservice.auth.enums.UserRole;
import com.kltech.authenticationservice.auth.models.Token;
import com.kltech.authenticationservice.auth.utils.validator.ValidPassword;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class)
public class User extends Base implements UserDetails {

  @NotBlank(message = "Name cannot be blank")
  @Column(name = "name")
  private String name;

  @NotBlank(message = "Email cannot be blank")
  @Email(message = "Email should be valid")
  @Column(name = "email", unique = true, nullable = false)
  private String email;

  @NotBlank(message = "Username cannot be blank")
  @Size(min = 5, max = 15, message = "Username must be between 5 and 15 characters long")
  @Column(name = "username", unique = true, nullable = false)
  private String username;

  @NotBlank(message = "Password cannot be blank")
  @ValidPassword
  @Column(name = "password")
  private String password;

  @Pattern(regexp = "^[0-9]{10}$", message = "User mobile phone must have 10 digits")
  @Column(name = "phone_number")
  private String phoneNumber;

  @Column(name = "role")
  @Enumerated(EnumType.STRING)
  private UserRole role;

  @OneToMany(mappedBy = "user")
  private List<Token> tokens;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public boolean isAccountNonExpired() {
    return UserDetails.super.isAccountNonExpired();
  }

  @Override
  public boolean isAccountNonLocked() {
    return UserDetails.super.isAccountNonLocked();
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return UserDetails.super.isCredentialsNonExpired();
  }

  @Override
  public boolean isEnabled() {
    return UserDetails.super.isEnabled();
  }
}
