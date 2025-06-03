package com.kltech.authentication_service.mappers;

import com.kltech.authentication_service.entities.User;
import com.kltech.authentication_service.models.requests.UserRequest;
import com.kltech.authentication_service.models.responses.UserResponse;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserResponse toUserResponse(User user);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void toUserEntity(UserRequest userUpdateRequest, @MappingTarget User user);
}
